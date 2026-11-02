# Stretch

A mobile-first, installable PWA that runs you through a self-paced, self-running
stretching routine: countdown timers, audio cues, and a pencil-sketch
illustration (derived from the real reference video) for each stretch.
No backend, no build step — plain HTML/CSS/JS.

## Running it

Open `index.html` with any static file server (needed for the service worker
to register), e.g.:

```bash
npx serve .
```

Then open the shown URL on your iPhone (same Wi-Fi) or in desktop Safari/Chrome.
Use Safari's Share → "Add to Home Screen" to install it as a PWA.

## Routine source

The first routine follows the YouTube video **"8 Minute Stretching Routine
For People Who AREN'T Flexible!"** (Tone and Tighten / Dr. Jared Beckstrand,
`youtube.com/watch?v=FI51zRzgIe4`). The order below was confirmed directly
from stills captured off the video:

1. Lumbar Rotation — Right
2. Lumbar Rotation — Left
3. Supine Hamstring — Right
4. Supine Hamstring — Left
5. Piriformis — Right
6. Piriformis — Left
7. Tall Kneeling Hip Flexor — Right
8. Kneeling Hamstring — Left
9. Tall Kneeling Hip Flexor — Left
10. Kneeling Hamstring — Right

Exact hold times per stretch in the original video weren't confirmed — this
app defaults to 30s stretch / 10s transition, both adjustable in the UI.
Edit `ROUTINE` in `app.js` to change names, order, or instructions.

## Illustrations

Each stretch is illustrated with the real reference still (`images/stretches/`),
run through a classic photo-to-pencil-sketch CSS filter (grayscale base +
inverted/blurred copy blended with `color-dodge`) and faded at the edges with
a radial mask so the gym background drops away. See `sketchMarkup()` and
`CROP_PRESETS` in `app.js`, and `.sketch-frame` in `style.css`. The crop
presets trim the video UI chrome (captions/progress bar) baked into the
stills — tweak `CROP_PRESETS` or add a per-stretch override if a new still
needs different cropping.

## Structure (kept Capacitor-friendly)

- `index.html` / `style.css` / `app.js` — the whole app, plain JS, no framework.
- `manifest.json` + `sw.js` — PWA installability + offline caching.
- `icons/` — generated app icons.
- `images/stretches/` — reference stills used for the sketch illustrations.

Nothing here depends on a bundler or framework, so wrapping this later with
Capacitor (`npx cap init`, point `webDir` at this folder) should work without
restructuring.
