import fs from 'node:fs/promises';
import path from 'node:path';
import { chromium } from '@playwright/test';
import sharp from 'sharp';
import GIFEncoder from 'gif-encoder-2';

const root = process.cwd();
const out = path.join(root, 'workana', 'afterimage-cover.gif');
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
await page.goto('http://127.0.0.1:5173/#create', { waitUntil: 'networkidle' });
await page.emulateMedia({ reducedMotion: 'no-preference' });
await page.waitForTimeout(500);

const encoder = new GIFEncoder(900, 560, 'octree', true, 10);
encoder.setRepeat(0);
encoder.setDelay(350);
encoder.setQuality(8);
encoder.start();

for (let frame = 0; frame < 10; frame++) {
  const screenshot = await page.screenshot({ type: 'png', clip: { x: 0, y: 0, width: 1440, height: 900 } });
  const raw = await sharp(screenshot)
    .resize({ width: 900, height: 560, fit: 'cover', position: 'centre' })
    .ensureAlpha()
    .raw()
    .toBuffer();
  encoder.addFrame(raw);
  await page.waitForTimeout(350);
}

encoder.finish();
await fs.writeFile(out, encoder.out.getData());
await browser.close();
console.log(`Captured live browser animation to ${out}`);
