# AFTERIMAGE

An experimental AI film studio frontend: a perspective generation chamber, a cinematic contact sheet, an interactive editing timeline, and a six-stage simulated render process.

## Run

```sh
npm install
npm run dev
```

Open http://localhost:5173. `npm run build` creates the production site in `dist`; `npm run preview` serves that build.

## Verify

```sh
npx playwright install chromium
npm test
npm run build
npm run format:check
```

Browser tests cover prompt validation, cancellation without duplicate generation, results, filters, modal focus restoration, timeline playback/seeking, native settings, responsive widths, reduced motion, runtime errors, and automated accessibility. Screenshots are written into `test-results`.

## Scope

This is a local visual prototype. Rendering is simulated, film previews animate generated stills, references are local selections, and the sound track is a visualization. No API requests, credits, accounts, audio playback, real video generation, or persistence are implemented. Reloading resets the session.

## Structure

`src/components` contains the navigation, generator/composer, media, archive/preview dialog, timeline, and final portal. `src/data.ts` contains typed film metadata. `src/styles.css` owns design tokens and responsive motion. `DESIGN.md` records the visual direction and control ownership.

## Assets

Custom art was generated with the built-in image generation tool. Project-local source images and optimized WebP assets are in `public/assets`. `docs/asset-prompts.md` records their prompts. Fonts are self-hosted through Fontsource packages. `node docs/optimize-assets.mjs` regenerates the delivery assets from the PNG originals.
