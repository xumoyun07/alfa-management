#!/usr/bin/env node
/**
 * build-lock.js — AES-GCM (256-bit) + PBKDF2-SHA256 (210,000 iterations)
 * Encrypts the Speaker Script JSON payload and role envelopes into index.html.
 *
 * SECURITY NOTICE:
 * Passwords must NEVER be passed as command-line arguments (to prevent exposure
 * in shell history and system process tables). Passwords are entered at a hidden
 * interactive prompt or read from environment variables.
 *
 * Usage:
 *   1. Rebuild vault interactively (prompts for passwords with hidden echo):
 *      node docs/build-lock.js [jsonPath] [htmlPath]
 *
 *      Example (defaults to docs/speaker-script.json and index.html):
 *      node docs/build-lock.js
 *
 *   2. Non-interactive via environment variables:
 *      $env:MASTER_PASSWORD="YourPassword"
 *      $env:ADMIN_PASSWORD="AdminPassword"        # optional
 *      $env:PRESENTER_PASSWORD="PresenterPassword"# optional
 *      node docs/build-lock.js
 *
 *   3. Export unencrypted JSON from HTML (prompts for current password):
 *      node docs/build-lock.js --export [outJsonPath] [htmlPath]
 *
 * IMPORTANT POST-BUILD STEP:
 * After rebuilding index.html, move or delete docs/speaker-script.json from the
 * shared project folder so plaintext speeches are not exposed.
 */

const fs = require("fs");
const path = require("path");
const readline = require("readline");
const crypto = require("crypto");
const { subtle } = crypto.webcrypto;

const ITERATIONS = 210000;
const DEFAULT_JSON = path.resolve(__dirname, "speaker-script.json");
const DEFAULT_HTML = fs.existsSync(path.resolve(__dirname, "index.html"))
  ? path.resolve(__dirname, "index.html")
  : path.resolve(__dirname, "../index.html");

function askPassword(promptText) {
  return new Promise(resolve => {
    if (process.stdin.isTTY) {
      process.stdout.write(promptText);
      let pwd = "";
      process.stdin.setRawMode(true);
      process.stdin.resume();
      process.stdin.setEncoding("utf8");
      const onData = (ch) => {
        if (ch === "\n" || ch === "\r" || ch === "\u0004") {
          process.stdin.setRawMode(false);
          process.stdin.pause();
          process.stdin.removeListener("data", onData);
          process.stdout.write("\n");
          resolve(pwd);
        } else if (ch === "\u0003") { // Ctrl+C
          process.exit(1);
        } else if (ch === "\u007f" || ch === "\b") { // Backspace
          if (pwd.length > 0) {
            pwd = pwd.slice(0, -1);
            process.stdout.write("\b \b");
          }
        } else {
          pwd += ch;
          process.stdout.write("*");
        }
      };
      process.stdin.on("data", onData);
    } else {
      const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
      rl.question(promptText, answer => {
        rl.close();
        resolve(answer.trim());
      });
    }
  });
}

async function deriveKey(password, saltBytes, iterations = ITERATIONS) {
  const enc = new TextEncoder();
  const baseKey = await subtle.importKey(
    "raw",
    enc.encode(password),
    "PBKDF2",
    false,
    ["deriveKey"]
  );
  return subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: saltBytes,
      iterations,
      hash: "SHA-256"
    },
    baseKey,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
}

async function encryptPayload(jsonText, password) {
  const salt = crypto.randomBytes(16);
  const key = await deriveKey(password, salt, ITERATIONS);
  const encoded = new TextEncoder().encode(jsonText);
  while (true) {
    const iv = crypto.randomBytes(12);
    const cipherBuf = await subtle.encrypt({ name: "AES-GCM", iv }, key, encoded);
    const saltB64 = Buffer.from(salt).toString("base64");
    const ivB64 = Buffer.from(iv).toString("base64");
    const ctB64 = Buffer.from(cipherBuf).toString("base64");
    if (!/wpm/i.test(saltB64 + ivB64 + ctB64)) {
      return {
        v: 1,
        alg: "AES-256-GCM",
        kdf: "PBKDF2-SHA256",
        iterations: ITERATIONS,
        salt: saltB64,
        iv: ivB64,
        ct: ctB64
      };
    }
  }
}

async function createEnvelope(secretPayload, password) {
  const salt = crypto.randomBytes(16);
  const iv = crypto.randomBytes(12);
  const key = await deriveKey(password, salt, ITERATIONS);
  const cipherBuf = await subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    new TextEncoder().encode(secretPayload)
  );
  return {
    v: 1,
    alg: "AES-256-GCM",
    kdf: "PBKDF2-SHA256",
    iterations: ITERATIONS,
    salt: Buffer.from(salt).toString("base64"),
    iv: Buffer.from(iv).toString("base64"),
    ct: Buffer.from(cipherBuf).toString("base64")
  };
}

async function decryptPayload(vault, password) {
  const salt = Buffer.from(vault.salt, "base64");
  const iv = Buffer.from(vault.iv, "base64");
  const ct = Buffer.from(vault.ct, "base64");
  const key = await deriveKey(password, salt, vault.iterations || ITERATIONS);
  const plainBuf = await subtle.decrypt({ name: "AES-GCM", iv }, key, ct);
  return new TextDecoder().decode(plainBuf);
}

function extractVaultFromHtml(html) {
  const m = html.match(/const\s+ENCRYPTED_SCRIPT_VAULT\s*=\s*(\{[\s\S]*?\});/);
  if (!m) throw new Error("Could not find ENCRYPTED_SCRIPT_VAULT in HTML file.");
  return JSON.parse(m[1]);
}

function injectVaultIntoHtml(html, vaultObj) {
  const replacement = `const ENCRYPTED_SCRIPT_VAULT = ${JSON.stringify(vaultObj)};`;
  if (!/const\s+ENCRYPTED_SCRIPT_VAULT\s*=\s*\{[\s\S]*?\};/.test(html)) {
    throw new Error("Could not find ENCRYPTED_SCRIPT_VAULT placeholder in HTML file.");
  }
  return html.replace(/const\s+ENCRYPTED_SCRIPT_VAULT\s*=\s*\{[\s\S]*?\};/, replacement);
}

function injectEnvelopesIntoHtml(html, envelopesObj) {
  const replacement = `const SCRIPT_ENVELOPES = ${JSON.stringify(envelopesObj, null, 2)};`;
  if (!/const\s+SCRIPT_ENVELOPES\s*=\s*\{[\s\S]*?\};/.test(html)) {
    throw new Error("Could not find SCRIPT_ENVELOPES placeholder in HTML file.");
  }
  return html.replace(/const\s+SCRIPT_ENVELOPES\s*=\s*\{[\s\S]*?\};/, replacement);
}

async function main() {
  const args = process.argv.slice(2);
  const mode = args[0];

  if (mode === "--export") {
    const outJsonPath = path.resolve(args[1] || DEFAULT_JSON);
    const htmlPath = path.resolve(args[2] || DEFAULT_HTML);

    let password = process.env.MASTER_PASSWORD || process.env.PASSWORD;
    if (!password) {
      password = await askPassword("Enter vault password to export JSON: ");
    }
    if (!password) {
      console.error("Error: A password is required to decrypt and export the vault.");
      process.exit(1);
    }

    const html = fs.readFileSync(htmlPath, "utf8");
    const currentVault = extractVaultFromHtml(html);
    const plainJson = await decryptPayload(currentVault, password);
    fs.writeFileSync(outJsonPath, JSON.stringify(JSON.parse(plainJson), null, 2), "utf8");
    console.log("Exported decrypted script JSON to:", outJsonPath);
    return;
  }

  // Paths can be passed as CLI arguments, but NEVER passwords
  const jsonPath = path.resolve(args[0] || DEFAULT_JSON);
  const htmlPath = path.resolve(args[1] || DEFAULT_HTML);

  if (!fs.existsSync(jsonPath)) {
    console.error(`Error: JSON file not found at: ${jsonPath}`);
    process.exit(1);
  }
  if (!fs.existsSync(htmlPath)) {
    console.error(`Error: HTML file not found at: ${htmlPath}`);
    process.exit(1);
  }

  // Retrieve passwords from environment or interactive hidden prompt
  let masterPassword = process.env.MASTER_PASSWORD || process.env.PASSWORD;
  let adminPassword = process.env.ADMIN_PASSWORD;
  let presenterPassword = process.env.PRESENTER_PASSWORD;

  if (!masterPassword) {
    masterPassword = await askPassword("Enter New Master Password (Super Admin): ");
  }

  if (!masterPassword || masterPassword.trim().length < 3) {
    console.error("Error: Master password must be at least 3 characters.");
    process.exit(1);
  }
  masterPassword = masterPassword.trim();

  // If role passwords not in env, ask optionally
  if (!adminPassword && process.stdin.isTTY) {
    const p1 = await askPassword("Enter New Admin Password [env_1] (press Enter to skip): ");
    if (p1 && p1.trim()) adminPassword = p1.trim();
  }

  if (!presenterPassword && process.stdin.isTTY) {
    const p2 = await askPassword("Enter New Presenter Password [env_2] (press Enter to skip): ");
    if (p2 && p2.trim()) presenterPassword = p2.trim();
  }

  const rawJson = fs.readFileSync(jsonPath, "utf8");
  JSON.parse(rawJson); // Validate JSON format

  console.log(`Encrypting ${path.basename(jsonPath)} into ${path.basename(htmlPath)}...`);
  const vault = await encryptPayload(rawJson, masterPassword);

  // Verify round-trip decryption before writing to disk
  const verifyPlain = await decryptPayload(vault, masterPassword);
  if (verifyPlain !== rawJson) {
    throw new Error("Round-trip decryption verification failed.");
  }

  let html = fs.readFileSync(htmlPath, "utf8");
  html = injectVaultIntoHtml(html, vault);

  // Generate role envelopes if provided
  if (adminPassword || presenterPassword) {
    const envAdmin = adminPassword ? await createEnvelope(masterPassword, adminPassword) : null;
    const envPresenter = presenterPassword ? await createEnvelope(masterPassword, presenterPassword) : null;

    const envelopes = {
      env_1: envAdmin,
      env_2: envPresenter
    };
    html = injectEnvelopesIntoHtml(html, envelopes);
    console.log("Generated and injected role envelopes (env_1 and env_2).");
  }

  fs.writeFileSync(htmlPath, html, "utf8");
  console.log("Successfully rebuilt and locked vault in", path.basename(htmlPath));
  console.log("\n==================================================================");
  console.log("IMPORTANT: Move or delete the plaintext script JSON out of the shared folder:");
  console.log(jsonPath);
  console.log("==================================================================");
}

main().catch(err => {
  console.error("build-lock error:", err.message || err);
  process.exit(1);
});
