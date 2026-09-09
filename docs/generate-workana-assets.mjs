import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import GIFEncoder from 'gif-encoder-2';

const root = process.cwd();
const source = path.join(root, 'test-results', 'studio-1440.png');
const chamber = path.join(root, 'test-results', 'chamber-1440.png');
const out = path.join(root, 'workana');
await fs.mkdir(out, { recursive: true });

const full = sharp(source);
await full.png({ quality: 92 }).toFile(path.join(out, 'afterimage-full-page.png'));
await sharp(chamber).resize({ width: 1200, height: 750, fit: 'cover' }).png({ quality: 92 }).toFile(path.join(out, 'afterimage-cover.png'));
await sharp(source).extract({ left: 0, top: 850, width: 1440, height: 1150 }).resize({ width: 1200, height: 960, fit: 'cover' }).png({ quality: 92 }).toFile(path.join(out, 'afterimage-gallery.png'));
await sharp(source).extract({ left: 0, top: 1950, width: 1440, height: 1050 }).resize({ width: 1200, height: 875, fit: 'cover' }).png({ quality: 92 }).toFile(path.join(out, 'afterimage-timeline.png'));
await sharp(path.join(root, 'test-results', 'studio-390.png')).resize({ width: 780, height: 7800, fit: 'inside' }).png({ quality: 92 }).toFile(path.join(out, 'afterimage-mobile.png'));

const encoder = new GIFEncoder(900, 560, 'octree', true, 8);
encoder.setRepeat(0);
encoder.setDelay(500);
encoder.setQuality(10);
encoder.start();
for (let i = 0; i < 8; i++) {
  const left = Math.round(i * 18);
  const top = Math.round(i * 4);
  const frame = await sharp(chamber)
    .extract({ left, top, width: 1440 - left, height: 900 - top })
    .resize({ width: 900, height: 560, fit: 'cover', position: i % 2 ? 'attention' : 'centre' })
    .modulate({ brightness: 0.98 + i * 0.006, saturation: 1.02 + i * 0.01 })
    .ensureAlpha()
    .raw()
    .toBuffer();
  encoder.addFrame(frame);
}
encoder.finish();
await fs.writeFile(path.join(out, 'afterimage-cover.gif'), encoder.out.getData());

console.log(`Workana assets written to ${out}`);
