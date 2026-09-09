# AFTERIMAGE implementation plan

Goal: implement the supplied cinematic AI video platform brief in the empty workspace.

Architecture: Vite + React + TypeScript, section components, shared typed film data, CSS transform motion. Custom generated bitmap art is stored locally and optimized for delivery. No backend or real video synthesis is implied.

1. Establish design context, dependencies, custom visual assets, and browser workflow tests.
2. Build navigation, triptych chamber, prompt composer, native model/ratio/duration controls, and six-stage cancellable mock rendering.
3. Build asymmetric filterable film archive, accessible preview dialog, playback simulation, and seekable editing timeline.
4. Add responsive compositions, grain, pointer/scroll perspective, reduced motion, focus styling, and finishing portal.
5. Run TypeScript/build, browser workflow and accessibility checks, desktop/mobile screenshots, static design audit. Inspect imagery, spacing, overflow, and interaction states; fix findings.

Verification scenarios: blank prompt shows associated error; generation progresses and cancellation preserves prompt; completion adds one archive result; filters work; dialog closes with Escape and restores focus; timeline plays/pauses/seeks; narrow screen has no horizontal overflow; reduced motion disables ambient transforms.
