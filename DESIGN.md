---
version: alpha
colors:
  ink: "#181a18"
  surface: "#222520"
  paper: "#eef0e6"
  muted: "#a5aaa0"
  primary: "#d9f572"
  ember: "#e88752"
typography:
  display:
    fontFamily: "Archivo, Arial, sans-serif"
  mono:
    fontFamily: "DM Mono, monospace"
rounded:
  control: "4px"
spacing:
  unit: "8px"
---

## Overview

AFTERIMAGE is an experimental imagination engine for filmmakers and visual artists. Hybrid brand experience and interactive local prototype, English locale. The signature is a suspended triptych of cinematic frames intersecting enormous typography. User brief authorizes creative direction and simulated functionality. No existing repository, brand, backend, or sibling workflows.

## Colors

Runtime source: src/styles.css :root. Named variables map directly to the frontmatter color names, with primary mapped to --acid. Graphite and warm white provide structure; acid marks actions and selection. Ember belongs to imagery. Secondary text remains legible. Only dark theme is designed.

## Typography

Self-hosted Archivo at 400, 500, 600, 700, 800 and DM Mono at 400, 500. Large compressed tracking in display; small spaced mono annotations. Font fallbacks are local system fonts. No remote font dependencies.

## Layout

Full-width 64px navigation, 48px desktop gutters, asymmetric stage, integrated command console, editorial contact sheet, horizontal film tracks, large concluding portal. Mobile at 700px stacks content and eliminates decorative overlaps. Intermediate layout at 1050px. Native scrolling, visible scrollbars, no hijacking.

## Elevation & Depth

Perspective film stack and real photographic material; restrained localized shadows. No glass card system. Ambient transform animation is slow, controls respond in 180ms. Reduced motion stops ambient animation and smooth scrolling.

## Shapes

Square media, hairline dividers, 4px command surface corners, circular media preview controls. Brackets and track marks reflect film machinery.

## Components

Navigation owns section links. PromptComposer owns validation and RenderControl native selects (platform-owned option popups explicitly accepted). GenerationChamber owns simulated progress, cancel, and result. FilmGallery owns filter and preview dialog. FilmPreview uses native modal dialog with focus restoration. TimelineLab owns play/pause and accessible range seek. Global CSS owns scrollbar styling. Shared status region announces progress and completion. No billing, remote writes, authentication, or destructive actions.

### Canonical UI Map

| Capability     | Canonical owner                                     | Source of truth          | Allowed variants       | Verification                                     |
| -------------- | --------------------------------------------------- | ------------------------ | ---------------------- | ------------------------------------------------ |
| Select/Listbox | RenderControl in src/components/PromptComposer.tsx  | DESIGN.md                | native                 | Browser keyboard and option selection            |
| Form           | PromptComposer in src/components/PromptComposer.tsx | User brief and DESIGN.md | local simulated render | tests/studio.spec.ts validation and cancellation |
| Scrollbar      | src/styles.css global baseline                      | DESIGN.md runtime tokens | geometry only          | Browser computed styles and narrow viewport      |

## Do's and Don'ts

Do preserve the tension between huge typography and layered film imagery. Keep metadata quiet. Use actual generated assets. Never make generation resemble a spinner or the archive an equal card grid. Describe mock results honestly. Keyboard access and reduced motion are mandatory.
