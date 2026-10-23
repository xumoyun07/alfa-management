let puppeteer;
try {
  puppeteer = require('puppeteer-core');
} catch(e) {
  puppeteer = require('C:/Users/Xumoyun/.gemini/antigravity/brain/81aed46a-ef5b-42bc-8fd3-6fc665545042/scratch/node_modules/puppeteer-core');
}
const fs = require('fs');
const path = require('path');

const CHROME_PATH = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const TARGET_HTML = 'file:///' + path.resolve('g:/My Drive/Group project - Management/index.html').replace(/\\/g, '/');
const REPORT_DIR = path.resolve('report');

if (!fs.existsSync(REPORT_DIR)) fs.mkdirSync(REPORT_DIR, { recursive: true });

const VIEWPORTS = [
  { w: 1920, h: 1080, name: '1920x1080' },
  { w: 1440, h: 900, name: '1440x900' },
  { w: 1280, h: 720, name: '1280x720' },
  { w: 768, h: 1024, name: '768x1024' },
  { w: 430, h: 932, name: '430x932' },
  { w: 390, h: 844, name: '390x844' },
  { w: 360, h: 740, name: '360x740' }
];

async function runAudit() {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: CHROME_PATH,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const allRecords = [];
  let totalFailures = 0;
  let totalChecks = 0;

  for (const vp of VIEWPORTS) {
    const page = await browser.newPage();
    await page.setViewport({ width: vp.w, height: vp.h, deviceScaleFactor: 1 });
    await page.goto(TARGET_HTML, { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 2500));

    // Wait for fonts
    await page.evaluate(async () => {
      if (document.fonts && document.fonts.ready) await document.fonts.ready;
    });

    // 1. Audit Chart Viewer Controls (Check 5)
    await page.evaluate(() => { if (typeof openLb === 'function') openLb(1); });
    await new Promise(r => setTimeout(r, 600));

    const ctrlAudit = await page.evaluate(() => {
      const results = [];
      const controls = [
        { id: '#lbZoomOut', name: 'Zoom out' },
        { id: '#lbZoomReset', name: 'Reset zoom' },
        { id: '#lbZoomIn', name: 'Zoom in' },
        { id: '#lbClose', name: 'Close' }
      ];

      const rects = [];
      for (const c of controls) {
        const el = document.querySelector(c.id);
        if (!el) {
          results.push({ control: c.name, check: 'presence', pass: false, desc: 'Element not found' });
          continue;
        }
        const r = el.getBoundingClientRect();
        rects.push({ name: c.name, rect: r, el });
        const passSize = r.width >= 43.5 && r.height >= 43.5;
        results.push({
          control: c.name,
          check: 'min_size_44x44',
          pass: passSize,
          measured: `${r.width.toFixed(1)}x${r.height.toFixed(1)}px`,
          aria: el.getAttribute('aria-label')
        });
      }

      // Check overlap between controls
      for (let i = 0; i < rects.length; i++) {
        for (let j = i + 1; j < rects.length; j++) {
          const r1 = rects[i].rect;
          const r2 = rects[j].rect;
          const overlap = !(r1.right <= r2.left + 0.5 || r1.left >= r2.right - 0.5 || r1.bottom <= r2.top + 0.5 || r1.top >= r2.bottom - 0.5);
          results.push({
            control: `${rects[i].name} vs ${rects[j].name}`,
            check: 'control_no_overlap',
            pass: !overlap,
            measured: overlap ? 'OVERLAP' : 'CLEAR'
          });
        }
      }
      return results;
    });

    for (const ca of ctrlAudit) {
      totalChecks++;
      if (!ca.pass) totalFailures++;
      allRecords.push({
        chart: 'Viewer Controls',
        viewport: vp.name,
        theme: 'dark',
        check: ca.check,
        result: ca.pass ? 'PASS' : 'FAIL',
        selector: ca.control,
        measured: ca.measured || ''
      });
    }

    // 2. Audit all 11 Charts in Lightbox
    for (let chartNum = 1; chartNum <= 11; chartNum++) {
      await page.evaluate((num) => {
        if (typeof openLb === 'function') openLb(num);
      }, chartNum);
      await new Promise(r => setTimeout(r, 400));

      const chartAudit = await page.evaluate((num) => {
        const stage = document.querySelector('#lbStage');
        const svg = stage ? stage.querySelector('svg') : null;
        if (!svg) return [{ check: 'svg_present', pass: false, measured: 'No SVG' }];

        const res = [];
        const vb = svg.viewBox.baseVal;
        const svgRect = svg.getBoundingClientRect();
        const scaleX = vb.width / svgRect.width;
        const scaleY = vb.height / svgRect.height;

        const texts = Array.from(svg.querySelectorAll('text'));
        const boxes = texts.map((t, i) => {
          const r = t.getBoundingClientRect();
          return {
            idx: i,
            el: t,
            text: t.textContent.trim(),
            r,
            x: (r.left - svgRect.left) * scaleX,
            y: (r.top - svgRect.top) * scaleY,
            w: r.width * scaleX,
            h: r.height * scaleY
          };
        });

        // Check 1: ViewBox containment
        boxes.forEach(b => {
          if (!b.text) return;
          // 8px tolerance for sub-pixel anti-aliasing / descenders
          const inside = b.x >= -8 && b.y >= -8 && (b.x + b.w) <= (vb.width + 8) && (b.y + b.h) <= (vb.height + 8);
          if (!inside) {
            res.push({
              check: 'text_inside_viewbox',
              pass: false,
              selector: `text[${b.idx}] "${b.text.slice(0, 20)}"`,
              measured: `x=${b.x.toFixed(1)}, y=${b.y.toFixed(1)}, w=${b.w.toFixed(1)}, h=${b.h.toFixed(1)} vs vb ${vb.width}x${vb.height}`
            });
          }
        });

        // Check 2: No two text bounding boxes overlap (tolerance 2px)
        for (let i = 0; i < boxes.length; i++) {
          for (let j = i + 1; j < boxes.length; j++) {
            const b1 = boxes[i].r;
            const b2 = boxes[j].r;
            const ox = Math.max(0, Math.min(b1.right, b2.right) - Math.max(b1.left, b2.left));
            const oy = Math.max(0, Math.min(b1.bottom, b2.bottom) - Math.max(b1.top, b2.top));
            if (ox > 2.0 && oy > 2.0) {
              res.push({
                check: 'text_no_overlap',
                pass: false,
                selector: `"${boxes[i].text.slice(0, 15)}" vs "${boxes[j].text.slice(0, 15)}"`,
                measured: `overlap: ${ox.toFixed(1)}x${oy.toFixed(1)}px`
              });
            }
          }
        }

        // Check 3: No line/path/polygon crosses a text bounding box
        const lines = Array.from(svg.querySelectorAll('line, path[stroke], polygon[stroke]'));
        boxes.forEach(tb => {
          const tr = tb.r;
          if (tr.width <= 0 || tr.height <= 0 || !tb.text) return;
          lines.forEach(line => {
            const lr = line.getBoundingClientRect();
            if (lr.width <= 0 || lr.height <= 0) return;
            const intersectX = Math.max(0, Math.min(tr.right - 2, lr.right) - Math.max(tr.left + 2, lr.left));
            const intersectY = Math.max(0, Math.min(tr.bottom - 2, lr.bottom) - Math.max(tr.top + 2, lr.top));
            if (intersectX > 4 && intersectY > 4) {
              const bg = tb.el.closest('g') ? tb.el.closest('g').querySelector('rect, circle, polygon') : null;
              if (!bg) {
                res.push({
                  check: 'no_line_crossing_text',
                  pass: false,
                  selector: `line crosses "${tb.text.slice(0, 20)}"`,
                  measured: `intersection: ${intersectX.toFixed(1)}x${intersectY.toFixed(1)}px`
                });
              }
            }
          });
        });

        if (res.length === 0) {
          res.push({ check: 'chart_layout_clean', pass: true, measured: `${boxes.length} text elements verified` });
        }
        return res;
      }, chartNum);

      for (const ca of chartAudit) {
        totalChecks++;
        if (!ca.pass) totalFailures++;
        allRecords.push({
          chart: `Chart ${chartNum}`,
          viewport: vp.name,
          theme: 'dark',
          check: ca.check,
          result: ca.pass ? 'PASS' : 'FAIL',
          selector: ca.selector || `Chart ${chartNum}`,
          measured: ca.measured || ''
        });
      }
    }

    // Close lightbox
    await page.evaluate(() => { if (typeof closeLb === 'function') closeLb(); });
    await new Promise(r => setTimeout(r, 400));

    // 3. Audit Slide Visuals (on Desktop viewports)
    if (vp.w > 768) {
      await page.evaluate(() => { if (typeof dGo === 'function') dGo('deck'); });

      for (const slideNum of [1, 2, 3, 6, 7, 9, 12, 15]) {
        await page.evaluate((s) => { if (typeof goToSlide === 'function') goToSlide(s - 1); }, slideNum);
        await new Promise(r => setTimeout(r, 400));

        const slideAudit = await page.evaluate((s) => {
          const res = [];
          const viz = document.querySelector('.p-viz-box');
          if (!viz) return [{ check: 'viz_present', pass: false, measured: 'No .p-viz-box' }];

          // Check 4: HTML diagram text clipping: scrollWidth <= clientWidth and scrollHeight <= clientHeight
          const htmlNodes = viz.querySelectorAll('.ix-stat, .ix-card, .ix-tab');
          htmlNodes.forEach(node => {
            const clippedW = node.scrollWidth > node.clientWidth + 2;
            const clippedH = node.scrollHeight > node.clientHeight + 2;
            if (clippedW || clippedH) {
              res.push({
                check: 'html_no_clipping',
                pass: false,
                selector: `${node.className} in Slide ${s}`,
                measured: `scroll: ${node.scrollWidth}x${node.scrollHeight} vs client: ${node.clientWidth}x${node.clientHeight}`
              });
            }
          });

          // Check SVG if present
          const svg = viz.querySelector('svg');
          if (svg) {
            const vb = svg.viewBox.baseVal;
            const svgRect = svg.getBoundingClientRect();
            const scaleX = vb.width / svgRect.width;
            const scaleY = vb.height / svgRect.height;

            const texts = Array.from(svg.querySelectorAll('text'));
            const boxes = texts.map((t, i) => {
              const r = t.getBoundingClientRect();
              return {
                idx: i,
                text: t.textContent.trim(),
                r,
                x: (r.left - svgRect.left) * scaleX,
                y: (r.top - svgRect.top) * scaleY,
                w: r.width * scaleX,
                h: r.height * scaleY
              };
            });

            // Check viewBox
            boxes.forEach(b => {
              if (b.x < -8 || b.y < -8 || (b.x + b.w) > (vb.width + 8) || (b.y + b.h) > (vb.height + 8)) {
                res.push({
                  check: 'slide_svg_viewbox',
                  pass: false,
                  selector: `Slide ${s}: "${b.text.slice(0, 15)}"`,
                  measured: `x=${b.x.toFixed(1)}, y=${b.y.toFixed(1)}, w=${b.w.toFixed(1)}, h=${b.h.toFixed(1)} vs vb ${vb.width}x${vb.height}`
                });
              }
            });

            // Check overlap
            for (let i = 0; i < boxes.length; i++) {
              for (let j = i + 1; j < boxes.length; j++) {
                const b1 = boxes[i].r;
                const b2 = boxes[j].r;
                const ox = Math.max(0, Math.min(b1.right, b2.right) - Math.max(b1.left, b2.left));
                const oy = Math.max(0, Math.min(b1.bottom, b2.bottom) - Math.max(b1.top, b2.top));
                if (ox > 2.0 && oy > 2.0) {
                  res.push({
                    check: 'slide_svg_text_no_overlap',
                    pass: false,
                    selector: `"${boxes[i].text.slice(0, 15)}" vs "${boxes[j].text.slice(0, 15)}"`,
                    measured: `${ox.toFixed(1)}x${oy.toFixed(1)}px`
                  });
                }
              }
            }
          }

          if (res.length === 0) {
            res.push({ check: 'slide_viz_clean', pass: true, measured: 'No clipping, no text overlap' });
          }
          return res;
        }, slideNum);

        for (const sa of slideAudit) {
          totalChecks++;
          if (!sa.pass) totalFailures++;
          allRecords.push({
            chart: `Slide ${slideNum} Visual`,
            viewport: vp.name,
            theme: 'dark',
            check: sa.check,
            result: sa.pass ? 'PASS' : 'FAIL',
            selector: sa.selector || `Slide ${slideNum}`,
            measured: sa.measured || ''
          });
        }
      }
    }

    await page.close();
  }

  await browser.close();

  // Write report files
  fs.writeFileSync(path.join(REPORT_DIR, 'chart_audit.json'), JSON.stringify({
    timestamp: new Date().toISOString(),
    totalChecks,
    totalFailures,
    records: allRecords
  }, null, 2), 'utf8');

  // Generate markdown table
  let md = '# Automated Chart & Diagram Overflow/Overlap Audit Report\n\n';
  md += `**Execution Timestamp**: ${new Date().toISOString()}\n`;
  md += `**Total Checks Run**: ${totalChecks}\n`;
  md += `**Total Failures**: ${totalFailures}\n`;
  md += `**Audit Status**: ${totalFailures === 0 ? 'PASS (0 Failures)' : 'FAIL'}\n\n`;
  md += '## Audit Results Matrix\n\n';
  md += '| Chart / Module | Viewport | Theme | Check | Result | Selector / Description | Measured Metrics |\n';
  md += '|---|---|---|---|:---:|---|---|\n';

  allRecords.forEach(r => {
    md += `| ${r.chart} | ${r.viewport} | ${r.theme} | ${r.check} | **${r.result}** | ${r.selector.replace(/\|/g, '/')} | ${r.measured} |\n`;
  });

  fs.writeFileSync(path.join(REPORT_DIR, 'CHART_AUDIT.md'), md, 'utf8');

  console.log(`AUDIT COMPLETE: Total checks: ${totalChecks}, Failures: ${totalFailures}`);
  if (totalFailures > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

runAudit().catch(e => {
  console.error(e);
  process.exit(1);
});
