# Stretch

A mobile-first, installable PWA that runs you through a self-paced, self-running
stretching routine: countdown timers, audio cues, and a simple animated
illustration for each stretch. No backend, no build step — plain HTML/CSS/JS.

## Running it

Open `index.html` with any static file server (needed for the service worker
to register), e.g.:

```bash
npx serve .
```

Then open the shown URL on your iPhone (same Wi-Fi) or in desktop Safari/Chrome.
Use Safari's Share → "Add to Home Screen" to install it as a PWA.

## Routine source & caveats

The first routine is a reconstruction of the YouTube video **"8 Minute
Stretching Routine For People Who AREN'T Flexible!"** (Tone and Tighten /
Dr. Jared Beckstrand, `youtube.com/watch?v=FI51zRzgIe4`).

I could not access the video's audio/visual content or its full written
description directly, so the stretch list/order below was reconstructed from
third-party summaries and chapter listings of that video, **not** verified
frame-by-frame against the video itself:

1. Lumbar Rotation
2. Supine Hamstring Stretch (right, then left)
3. Piriformis Stretch (right, then left)
4. Hip Flexor & Kneeling Hamstring (right, then left)
5. Seated Spinal Rotation
6. Child's Pose
7. Upper Back Extension
8. Gentle Neck Stretch (right, then left)

Please watch the actual video and correct `BASE_ROUTINE` in `app.js` if the
names, order, or left/right structure don't match — exact hold times per
stretch in the original video also weren't confirmed (this app defaults to
30s stretch / 10s transition, both adjustable in the UI).

## Structure (kept Capacitor-friendly)

- `index.html` / `style.css` / `app.js` — the whole app, plain JS, no framework.
- `manifest.json` + `sw.js` — PWA installability + offline caching.
- `icons/` — generated app icons.

Nothing here depends on a bundler or framework, so wrapping this later with
Capacitor (`npx cap init`, point `webDir` at this folder) should work without
restructuring.
