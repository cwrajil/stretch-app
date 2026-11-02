// ---------------------------------------------------------------------------
// Routine data
//
// Source: YouTube video "8 Minute Stretching Routine For People Who AREN'T
// Flexible!" (Tone and Tighten, Dr. Jared Beckstrand), id FI51zRzgIe4.
// This order was confirmed directly from stills captured off the video by
// the user (see images/stretches/). Exact hold times per stretch in the
// original video are still a best guess — adjust durations in the setup
// screen, or the text below, if they don't match.
// ---------------------------------------------------------------------------

const ROUTINE = [
  {
    id: "lumbar-rotation-right",
    label: "Lumbar Rotation — Right",
    instructions: "Lying on your back, gently pull your right knee across your body toward the floor, keeping your shoulders flat.",
    image: "images/stretches/lumbar-rotation-right.png",
    crop: "lying",
  },
  {
    id: "lumbar-rotation-left",
    label: "Lumbar Rotation — Left",
    instructions: "Lying on your back, gently pull your left knee across your body toward the floor, keeping your shoulders flat.",
    image: "images/stretches/lumbar-rotation-left.png",
    crop: "lying",
  },
  {
    id: "supine-hamstring-right",
    label: "Supine Hamstring — Right",
    instructions: "Lying on your back, raise your right leg toward the ceiling, holding behind the thigh or calf, knee straight.",
    image: "images/stretches/supine-hamstring-right.png",
    crop: "lying",
  },
  {
    id: "supine-hamstring-left",
    label: "Supine Hamstring — Left",
    instructions: "Lying on your back, raise your left leg toward the ceiling, holding behind the thigh or calf, knee straight.",
    image: "images/stretches/supine-hamstring-left.png",
    crop: "lying",
  },
  {
    id: "piriformis-right",
    label: "Piriformis — Right",
    instructions: "Lying on your back, cross your right ankle over your left knee and gently pull both legs toward your chest.",
    image: "images/stretches/piriformis-right.png",
    crop: "lying",
  },
  {
    id: "piriformis-left",
    label: "Piriformis — Left",
    instructions: "Lying on your back, cross your left ankle over your right knee and gently pull both legs toward your chest.",
    image: "images/stretches/piriformis-left.png",
    crop: "lying",
  },
  {
    id: "kneeling-hip-flexor-right",
    label: "Tall Kneeling Hip Flexor — Right",
    instructions: "Tall kneeling lunge, right leg forward. Tuck your tailbone and shift your weight forward to stretch the front of your back hip.",
    image: "images/stretches/kneeling-hip-flexor-right.png",
    crop: "kneeling",
  },
  {
    id: "kneeling-hamstring-left",
    label: "Kneeling Hamstring — Left",
    instructions: "From the kneeling lunge, straighten your left leg out in front with your heel down, and hinge forward at the hips.",
    image: "images/stretches/kneeling-hamstring-left.png",
    crop: "kneeling",
  },
  {
    id: "kneeling-hip-flexor-left",
    label: "Tall Kneeling Hip Flexor — Left",
    instructions: "Tall kneeling lunge, left leg forward. Tuck your tailbone and shift your weight forward to stretch the front of your back hip.",
    image: "images/stretches/kneeling-hip-flexor-left.png",
    crop: "kneeling",
  },
  {
    id: "kneeling-hamstring-right",
    label: "Kneeling Hamstring — Right",
    instructions: "From the kneeling lunge, straighten your right leg out in front with your heel down, and hinge forward at the hips.",
    image: "images/stretches/kneeling-hamstring-right.png",
    crop: "kneeling",
  },
];

// ---------------------------------------------------------------------------
// Pencil-sketch illustration markup
//
// Each stretch is illustrated with the real reference still, run through a
// classic photo-to-pencil-sketch filter (grayscale base + inverted/blurred
// copy blended with color-dodge). `crop` trims the video UI chrome
// (captions/progress bar) baked into the still — "lying" stills have it
// along the bottom, "kneeling" stills have a caption banner across the top
// as well. The frame is a wide rectangle (not a circle) so the whole body
// stays in view rather than being cropped to fit a circular mask.
// ---------------------------------------------------------------------------

const CROP_PRESETS = {
  lying: { top: "0%", right: "0%", bottom: "12%", left: "0%", zoom: "1.0", focal: "50% 42%", aspect: "3 / 2" },
  kneeling: { top: "17%", right: "3%", bottom: "11%", left: "0%", zoom: "1.0", focal: "50% 48%", aspect: "4 / 5" },
};

function sketchMarkup(step) {
  const c = CROP_PRESETS[step.crop] || CROP_PRESETS.lying;
  const style =
    `--crop-top:${c.top};--crop-right:${c.right};--crop-bottom:${c.bottom};--crop-left:${c.left};` +
    `--zoom:${c.zoom};--focal:${c.focal};--aspect:${c.aspect};`;
  return `<div class="sketch-frame" style="${style}">
    <div class="sketch-crop">
      <img class="sketch-base" src="${step.image}" alt="">
      <img class="sketch-lines" src="${step.image}" alt="">
    </div>
  </div>`;
}

// ---------------------------------------------------------------------------
// Audio cues (Web Audio API, no external files)
// ---------------------------------------------------------------------------

let audioCtx = null;
function getAudioCtx() {
  if (!audioCtx) {
    const AC = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AC();
  }
  if (audioCtx.state === "suspended") audioCtx.resume();
  return audioCtx;
}

function beep(ctx, freq, startDelay, duration, peakGain) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "sine";
  osc.frequency.value = freq;
  osc.connect(gain);
  gain.connect(ctx.destination);
  const t0 = ctx.currentTime + startDelay;
  gain.gain.setValueAtTime(0, t0);
  gain.gain.linearRampToValueAtTime(peakGain, t0 + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.001, t0 + duration);
  osc.start(t0);
  osc.stop(t0 + duration + 0.02);
}

function playStartCue() {
  if (!settings.soundOn) return;
  const ctx = getAudioCtx();
  beep(ctx, 740, 0, 0.16, 0.28);
  beep(ctx, 1040, 0.17, 0.2, 0.28);
}

function playTransitionCue() {
  if (!settings.soundOn) return;
  const ctx = getAudioCtx();
  beep(ctx, 520, 0, 0.12, 0.22);
  beep(ctx, 520, 0.16, 0.12, 0.22);
  beep(ctx, 400, 0.32, 0.18, 0.22);
}

function playCompleteCue() {
  if (!settings.soundOn) return;
  const ctx = getAudioCtx();
  [660, 880, 1100].forEach((f, i) => beep(ctx, f, i * 0.16, 0.22, 0.25));
}

// ---------------------------------------------------------------------------
// Settings
// ---------------------------------------------------------------------------

const SETTINGS_KEY = "stretchapp.settings.v1";
const DEFAULT_SETTINGS = { stretchSeconds: 30, transitionSeconds: 10, soundOn: true };

function loadSettings() {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) return { ...DEFAULT_SETTINGS };
    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch (e) {
    return { ...DEFAULT_SETTINGS };
  }
}

function saveSettings() {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (e) {
    /* ignore (private mode / storage disabled) */
  }
}

let settings = loadSettings();

// ---------------------------------------------------------------------------
// DOM refs
// ---------------------------------------------------------------------------

const screenSetup = document.getElementById("screen-setup");
const screenRoutine = document.getElementById("screen-routine");
const screenDone = document.getElementById("screen-done");

const stretchValueEl = document.getElementById("stretch-duration-value");
const transitionValueEl = document.getElementById("transition-duration-value");
const soundToggle = document.getElementById("sound-toggle");
const routineListEl = document.getElementById("routine-list");
const routineTotalTimeEl = document.getElementById("routine-total-time");
const startBtn = document.getElementById("start-btn");

const exitBtn = document.getElementById("exit-btn");
const progressFill = document.getElementById("progress-fill");
const stepCounterEl = document.getElementById("step-counter");
const phaseBanner = document.getElementById("phase-banner");
const animHost = document.getElementById("anim-host");
const timerNumber = document.getElementById("timer-number");
const timerBarFill = document.getElementById("timer-bar-fill");
const stretchNameEl = document.getElementById("stretch-name");
const stretchInstructionsEl = document.getElementById("stretch-instructions");
const nextUpEl = document.getElementById("next-up");
const prevBtn = document.getElementById("prev-btn");
const pauseBtn = document.getElementById("pause-btn");
const skipBtn = document.getElementById("skip-btn");
const restartBtn = document.getElementById("restart-btn");

function showScreen(screen) {
  [screenSetup, screenRoutine, screenDone].forEach((s) => s.classList.remove("active"));
  screen.classList.add("active");
}

function formatMMSS(totalSeconds) {
  const m = Math.floor(totalSeconds / 60);
  const s = Math.round(totalSeconds % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

// ---------------------------------------------------------------------------
// Setup screen rendering
// ---------------------------------------------------------------------------

function renderSetup() {
  stretchValueEl.textContent = settings.stretchSeconds + "s";
  transitionValueEl.textContent = settings.transitionSeconds + "s";
  soundToggle.checked = settings.soundOn;

  routineListEl.innerHTML = "";
  ROUTINE.forEach((step, i) => {
    const li = document.createElement("li");
    li.innerHTML = `<span class="rl-index">${i + 1}</span><span>${step.label}</span>`;
    routineListEl.appendChild(li);
  });

  const totalSeconds = ROUTINE.length * (settings.stretchSeconds + settings.transitionSeconds);
  routineTotalTimeEl.textContent = `(~${formatMMSS(totalSeconds)})`;
}

document.querySelectorAll(".stepper-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const key = btn.dataset.adjust === "stretch" ? "stretchSeconds" : "transitionSeconds";
    const delta = parseInt(btn.dataset.delta, 10);
    const min = btn.dataset.adjust === "stretch" ? 10 : 0;
    settings[key] = Math.max(min, Math.min(120, settings[key] + delta));
    saveSettings();
    renderSetup();
  });
});

soundToggle.addEventListener("change", () => {
  settings.soundOn = soundToggle.checked;
  saveSettings();
});

// ---------------------------------------------------------------------------
// Player state machine
// ---------------------------------------------------------------------------

let idx = 0;
let phase = "transition"; // 'transition' | 'stretch'
let phaseDurationMs = 0;
let phaseStartTs = 0;
let pausedRemainingMs = null;
let paused = false;
let tickHandle = null;
let wakeLock = null;

function currentStep() {
  return ROUTINE[idx];
}

async function requestWakeLock() {
  try {
    if ("wakeLock" in navigator) {
      wakeLock = await navigator.wakeLock.request("screen");
    }
  } catch (e) {
    wakeLock = null;
  }
}

function releaseWakeLock() {
  if (wakeLock) {
    wakeLock.release().catch(() => {});
    wakeLock = null;
  }
}

function startRoutine() {
  getAudioCtx(); // unlock audio on user gesture
  idx = 0;
  phase = "transition";
  showScreen(screenRoutine);
  requestWakeLock();
  startPhase();
}

function startPhase() {
  paused = false;
  pauseBtn.innerHTML = "&#10074;&#10074;";
  phaseDurationMs =
    (phase === "transition" ? settings.transitionSeconds : settings.stretchSeconds) * 1000;

  if (phaseDurationMs <= 0) {
    // zero-length phase: skip immediately
    advancePhase();
    return;
  }

  phaseStartTs = performance.now();
  pausedRemainingMs = null;

  if (phase === "transition") {
    playTransitionCue();
  } else {
    playStartCue();
  }

  renderPhase();
  clearTimer();
  tickHandle = setInterval(tick, 100);
  tick();
}

function clearTimer() {
  if (tickHandle) {
    clearInterval(tickHandle);
    tickHandle = null;
  }
}

function tick() {
  if (paused) return;
  const elapsed = performance.now() - phaseStartTs;
  const remaining = phaseDurationMs - elapsed;
  if (remaining <= 0) {
    advancePhase();
    return;
  }
  updateTimerDisplay(remaining);
}

function updateTimerDisplay(remainingMs) {
  const secondsLeft = Math.ceil(remainingMs / 1000);
  timerNumber.textContent = secondsLeft;
  const frac = Math.max(0, remainingMs / phaseDurationMs);
  timerBarFill.style.width = `${frac * 100}%`;
}

function advancePhase() {
  if (phase === "transition") {
    phase = "stretch";
    startPhase();
  } else {
    if (idx >= ROUTINE.length - 1) {
      finishRoutine();
    } else {
      idx += 1;
      phase = "transition";
      startPhase();
    }
  }
}

function renderPhase() {
  const step = currentStep();
  const total = ROUTINE.length;
  screenRoutine.classList.toggle("is-transition", phase === "transition");

  stepCounterEl.textContent = `Step ${idx + 1} of ${total}`;
  const progressed = idx + (phase === "stretch" ? 1 : 0.5);
  progressFill.style.width = `${(progressed / total) * 100}%`;

  timerBarFill.style.width = "100%";

  animHost.innerHTML = sketchMarkup(step);

  if (phase === "transition") {
    phaseBanner.textContent = "Get Ready";
    phaseBanner.className = "phase-banner transition";
    stretchNameEl.textContent = "Up next: " + step.label;
    stretchInstructionsEl.textContent = "Move into position for the next stretch.";
    nextUpEl.textContent = "";
  } else {
    phaseBanner.textContent = "Stretch";
    phaseBanner.className = "phase-banner stretch";
    stretchNameEl.textContent = step.label;
    stretchInstructionsEl.textContent = step.instructions;
    const next = ROUTINE[idx + 1];
    nextUpEl.textContent = next ? "Next: " + next.label : "Last stretch — finish line ahead!";
  }
}

function finishRoutine() {
  clearTimer();
  releaseWakeLock();
  playCompleteCue();
  showScreen(screenDone);
}

function exitRoutine() {
  clearTimer();
  releaseWakeLock();
  showScreen(screenSetup);
  renderSetup();
}

function togglePause() {
  if (!paused) {
    paused = true;
    pausedRemainingMs = phaseDurationMs - (performance.now() - phaseStartTs);
    pauseBtn.innerHTML = "&#9654;";
  } else {
    paused = false;
    phaseStartTs = performance.now() - (phaseDurationMs - pausedRemainingMs);
    pauseBtn.innerHTML = "&#10074;&#10074;";
  }
}

function skipForward() {
  clearTimer();
  if (phase === "transition") {
    phase = "stretch";
  } else if (idx >= ROUTINE.length - 1) {
    finishRoutine();
    return;
  } else {
    idx += 1;
    phase = "transition";
  }
  startPhase();
}

function skipBackward() {
  clearTimer();
  if (phase === "stretch" ) {
    // restart current stretch
    startPhase();
    return;
  }
  // currently in a transition: go back into previous stretch
  if (idx > 0) {
    idx -= 1;
  }
  phase = "stretch";
  startPhase();
}

// ---------------------------------------------------------------------------
// Wire up controls
// ---------------------------------------------------------------------------

startBtn.addEventListener("click", startRoutine);
exitBtn.addEventListener("click", exitRoutine);
pauseBtn.addEventListener("click", togglePause);
skipBtn.addEventListener("click", skipForward);
prevBtn.addEventListener("click", skipBackward);
restartBtn.addEventListener("click", () => {
  showScreen(screenSetup);
  renderSetup();
});

document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible" && screenRoutine.classList.contains("active")) {
    requestWakeLock();
  }
});

// ---------------------------------------------------------------------------
// PWA service worker registration
// ---------------------------------------------------------------------------

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  });
}

// ---------------------------------------------------------------------------
// Init
// ---------------------------------------------------------------------------

renderSetup();
