// ---------------------------------------------------------------------------
// Routine data
//
// Source: YouTube video "8 Minute Stretching Routine For People Who AREN'T
// Flexible!" (Tone and Tighten, Dr. Jared Beckstrand), id FI51zRzgIe4.
// The exact on-screen order/hold-times could not be independently confirmed
// (no accessible transcript/description) — this list was reconstructed from
// third-party chapter/summary listings of that video and should be treated
// as a best-effort reconstruction. See README.md for details and correct it
// in BASE_ROUTINE below if it doesn't match what you see in the video.
// ---------------------------------------------------------------------------

const BASE_ROUTINE = [
  {
    id: "lumbar-rotation",
    name: "Lumbar Rotation",
    instructions: "Lie on your back, knees bent, feet flat. Gently rock both knees side to side.",
    anim: "anim-lumbar",
    sides: false,
  },
  {
    id: "hamstring",
    name: "Supine Hamstring Stretch",
    instructions: "Lying on your back, raise one leg toward the ceiling, keeping the knee straight.",
    anim: "anim-hamstring",
    sides: true,
  },
  {
    id: "piriformis",
    name: "Piriformis Stretch",
    instructions: "Lying on your back, cross one ankle over the opposite knee and gently pull the knee toward your chest.",
    anim: "anim-piriformis",
    sides: true,
  },
  {
    id: "hip-flexor",
    name: "Hip Flexor & Kneeling Hamstring",
    instructions: "Half-kneeling lunge. Tuck your tailbone and shift weight forward to feel the stretch in front of the hip.",
    anim: "anim-hipflexor",
    sides: true,
  },
  {
    id: "seated-rotation",
    name: "Seated Spinal Rotation",
    instructions: "Sit tall and gently rotate your torso, looking over your shoulder.",
    anim: "anim-rotation",
    sides: false,
  },
  {
    id: "childs-pose",
    name: "Child's Pose",
    instructions: "Kneel and fold forward, reaching your arms out in front and relaxing your back.",
    anim: "anim-childpose",
    sides: false,
  },
  {
    id: "upper-back-extension",
    name: "Upper Back Extension",
    instructions: "Seated or kneeling, clasp your hands behind your head and gently arch your upper back.",
    anim: "anim-upperback",
    sides: false,
  },
  {
    id: "neck-stretch",
    name: "Gentle Neck Stretch",
    instructions: "Seated tall, gently tilt your ear toward your shoulder.",
    anim: "anim-neck",
    sides: true,
  },
];

function buildRoutine() {
  const steps = [];
  for (const move of BASE_ROUTINE) {
    if (!move.sides) {
      steps.push({ ...move, label: move.name });
    } else {
      steps.push({ ...move, label: move.name + " — Right Side", mirror: false });
      steps.push({ ...move, label: move.name + " — Left Side", mirror: true });
    }
  }
  return steps;
}

const ROUTINE = buildRoutine();

// ---------------------------------------------------------------------------
// Animation markup (simple stick-figure illustrations, CSS-animated)
// ---------------------------------------------------------------------------

const ANIM_SVG = {
  "anim-lumbar": `<svg viewBox="0 0 120 120"><circle class="figure-head" cx="20" cy="55" r="8"/><path class="figure-part" d="M28,55 L65,55"/><path class="figure-part" d="M55,52 L72,38"/><g class="anim-group"><path class="figure-part" d="M65,55 L82,38 L98,52"/></g></svg>`,
  "anim-hamstring": `<svg viewBox="0 0 120 120"><circle class="figure-head" cx="20" cy="90" r="8"/><path class="figure-part" d="M28,90 L70,90"/><path class="figure-part" d="M70,90 L96,90"/><path class="figure-part" d="M40,86 L55,72"/><g class="anim-group"><path class="figure-part" d="M70,90 L70,38"/></g></svg>`,
  "anim-piriformis": `<svg viewBox="0 0 120 120"><circle class="figure-head" cx="20" cy="90" r="8"/><path class="figure-part" d="M28,90 L55,90"/><path class="figure-part" d="M55,90 L92,90"/><g class="anim-group"><path class="figure-part" d="M55,90 L45,62 L28,55"/></g></svg>`,
  "anim-hipflexor": `<svg viewBox="0 0 120 120"><circle class="figure-head" cx="60" cy="25" r="8"/><path class="figure-part" d="M60,33 L60,65"/><path class="figure-part" d="M60,42 L40,56"/><path class="figure-part" d="M60,65 L78,82 L78,104"/><g class="anim-group"><path class="figure-part" d="M60,65 L48,86 L48,106"/></g></svg>`,
  "anim-rotation": `<svg viewBox="0 0 120 120"><path class="figure-part" d="M44,78 L60,78 L76,78"/><g class="anim-group"><circle class="figure-head" cx="60" cy="32" r="8"/><path class="figure-part" d="M60,40 L60,68"/><path class="figure-part" d="M60,48 L38,40"/><path class="figure-part" d="M60,48 L82,62"/></g></svg>`,
  "anim-childpose": `<svg viewBox="0 0 120 120"><path class="figure-part" d="M78,48 L96,78 L96,98"/><g class="anim-group"><circle class="figure-head" cx="35" cy="75" r="8"/><path class="figure-part" d="M43,75 L78,48"/><path class="figure-part" d="M58,64 L88,42"/></g></svg>`,
  "anim-upperback": `<svg viewBox="0 0 120 120"><path class="figure-part" d="M46,98 L60,98 L74,98"/><g class="anim-group"><path class="figure-part" d="M60,92 L60,56"/><circle class="figure-head" cx="60" cy="46" r="8"/><path class="figure-part" d="M54,56 L44,40"/><path class="figure-part" d="M66,56 L76,40"/></g></svg>`,
  "anim-neck": `<svg viewBox="0 0 120 120"><path class="figure-part" d="M60,96 L60,56"/><path class="figure-part" d="M60,66 L40,82"/><path class="figure-part" d="M60,66 L80,82"/><g class="anim-group"><circle class="figure-head" cx="55" cy="40" r="9"/></g></svg>`,
};

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
const timerRingFg = document.getElementById("timer-ring-fg");
const stretchNameEl = document.getElementById("stretch-name");
const stretchInstructionsEl = document.getElementById("stretch-instructions");
const nextUpEl = document.getElementById("next-up");
const prevBtn = document.getElementById("prev-btn");
const pauseBtn = document.getElementById("pause-btn");
const skipBtn = document.getElementById("skip-btn");
const restartBtn = document.getElementById("restart-btn");

const RING_CIRCUMFERENCE = 2 * Math.PI * 54;

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
  timerRingFg.style.strokeDashoffset = String(RING_CIRCUMFERENCE * (1 - frac));
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

  timerRingFg.style.strokeDasharray = String(RING_CIRCUMFERENCE);
  timerRingFg.style.strokeDashoffset = "0";

  animHost.innerHTML = ANIM_SVG[step.anim] || "";
  const svg = animHost.querySelector("svg");
  if (svg) {
    svg.classList.add(step.anim);
    if (step.mirror) svg.style.transform = "scaleX(-1)";
  }

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
