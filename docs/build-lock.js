#!/usr/bin/env node
/**
 * build-lock.js — AES-GCM (256-bit) + PBKDF2-SHA256 (210,000 iterations)
 * Encrypts the Speaker Script JSON payload into ALFA_Interactive_Presentation_Portal_v4.html.
 *
 * Usage:
 *   1. Encrypt from plain JSON file:
 *      node build-lock.js "<PASSWORD>" ./speaker-script.json ./ALFA_Interactive_Presentation_Portal_v4.html
 *
 *   2. Change password directly in the HTML file (decrypts existing block with old password, re-encrypts with new):
 *      node build-lock.js --rekey "<OLD_PASSWORD>" "<NEW_PASSWORD>" ./ALFA_Interactive_Presentation_Portal_v4.html
 *
 *   3. Export decrypted JSON from the HTML file (requires current password):
 *      node build-lock.js --export "<CURRENT_PASSWORD>" ./speaker-script.json ./ALFA_Interactive_Presentation_Portal_v4.html
 */

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const { subtle } = crypto.webcrypto;

const ITERATIONS = 210000;
const DEFAULT_HTML = path.join(__dirname, "ALFA_Interactive_Presentation_Portal_v4.html");

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

async function main() {
  const args = process.argv.slice(2);
  const mode = args[0];

  if (mode === "--rekey") {
    const oldPassword = args[1];
    const newPassword = args[2];
    const htmlPath = path.resolve(args[3] || DEFAULT_HTML);
    if (!oldPassword || !newPassword) {
      console.error("Usage: node build-lock.js --rekey \"<OLD_PASSWORD>\" \"<NEW_PASSWORD>\" [htmlFile]");
      process.exit(1);
    }
    const html = fs.readFileSync(htmlPath, "utf8");
    const currentVault = extractVaultFromHtml(html);
    const plainJson = await decryptPayload(currentVault, oldPassword);
    JSON.parse(plainJson); // validate JSON
    const newVault = await encryptPayload(plainJson, newPassword);
    const updatedHtml = injectVaultIntoHtml(html, newVault);
    fs.writeFileSync(htmlPath, updatedHtml, "utf8");
    console.log("Successfully re-encrypted ENCRYPTED_SCRIPT_VAULT in", path.basename(htmlPath));
    return;
  }

  if (mode === "--export") {
    const currentPassword = args[1];
    const outJsonPath = path.resolve(args[2] || "speaker-script.json");
    const htmlPath = path.resolve(args[3] || DEFAULT_HTML);
    if (!currentPassword) {
      console.error("Usage: node build-lock.js --export \"<CURRENT_PASSWORD>\" <out.json> [htmlFile]");
      process.exit(1);
    }
    const html = fs.readFileSync(htmlPath, "utf8");
    const currentVault = extractVaultFromHtml(html);
    const plainJson = await decryptPayload(currentVault, currentPassword);
    fs.writeFileSync(outJsonPath, JSON.stringify(JSON.parse(plainJson), null, 2), "utf8");
    console.log("Exported decrypted script JSON to", outJsonPath);
    return;
  }

  const PASSWORD = process.env.PASSWORD || args[0] || "<I WILL PROVIDE>";
  const jsonPath = path.resolve(args[1] || "speaker-script.json");
  const htmlPath = path.resolve(args[2] || DEFAULT_HTML);

  if (!PASSWORD || PASSWORD === "<I WILL PROVIDE>") {
    console.error("Error: Please provide the password via CLI argument or PASSWORD env variable.");
    console.error("Usage: node build-lock.js \"<PASSWORD>\" <script.json> [htmlFile]");
    process.exit(1);
  }

  const rawJson = fs.readFileSync(jsonPath, "utf8");
  JSON.parse(rawJson); // Ensure valid JSON
  const vault = await encryptPayload(rawJson, PASSWORD);

  // Verify round-trip decryption before writing
  const verifyPlain = await decryptPayload(vault, PASSWORD);
  if (verifyPlain !== rawJson) {
    throw new Error("Round-trip decryption verification failed.");
  }

  if (fs.existsSync(htmlPath)) {
    const html = fs.readFileSync(htmlPath, "utf8");
    if (/const\s+ENCRYPTED_SCRIPT_VAULT\s*=\s*\{[\s\S]*?\};/.test(html)) {
      const updated = injectVaultIntoHtml(html, vault);
      fs.writeFileSync(htmlPath, updated, "utf8");
      console.log("Encrypted and updated ENCRYPTED_SCRIPT_VAULT in", path.basename(htmlPath));
      return;
    }
  }
  console.log(JSON.stringify(vault));
}

main().catch(err => {
  console.error("build-lock error:", err.message || err);
  process.exit(1);
});
