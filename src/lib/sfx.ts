let ctx: AudioContext | null = null;

function getCtx() {
  if (typeof window === "undefined") return null;
  const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Ctor) return null;
  if (!ctx) ctx = new Ctor();
  return ctx;
}

/** Airhorn-ish siren used when the video deterrent can't autoplay. */
export function playSiren(durationSec = 2.5) {
  const audio = getCtx();
  if (!audio) return;
  void audio.resume();
  const now = audio.currentTime;
  const osc = audio.createOscillator();
  const gain = audio.createGain();
  osc.type = "sawtooth";
  osc.frequency.setValueAtTime(520, now);
  for (let i = 0; i < Math.ceil(durationSec * 2); i++) {
    osc.frequency.linearRampToValueAtTime(i % 2 === 0 ? 980 : 520, now + (i + 1) * 0.5);
  }
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.35, now + 0.05);
  gain.gain.setValueAtTime(0.35, now + durationSec - 0.15);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + durationSec);
  osc.connect(gain).connect(audio.destination);
  osc.start(now);
  osc.stop(now + durationSec);
}

/** Short celebratory arpeggio on session completion. */
export function playSuccess() {
  const audio = getCtx();
  if (!audio) return;
  void audio.resume();
  const now = audio.currentTime;
  [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
    const osc = audio.createOscillator();
    const gain = audio.createGain();
    osc.type = "triangle";
    osc.frequency.value = freq;
    const start = now + i * 0.12;
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(0.25, start + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.5);
    osc.connect(gain).connect(audio.destination);
    osc.start(start);
    osc.stop(start + 0.55);
  });
}

// ---------- game feedback sounds ----------

const MUTE_KEY = "padida.sfx.muted";

export function isMuted() {
  if (typeof window === "undefined") return true;
  try {
    return window.localStorage.getItem(MUTE_KEY) === "1";
  } catch {
    return false;
  }
}

export function setMuted(muted: boolean) {
  try {
    window.localStorage.setItem(MUTE_KEY, muted ? "1" : "0");
  } catch {
    /* ignore */
  }
}

function tones(
  notes: { freq: number; at: number; dur: number; type?: OscillatorType; gain?: number }[],
) {
  if (isMuted()) return;
  const audio = getCtx();
  if (!audio) return;
  void audio.resume();
  const now = audio.currentTime;
  notes.forEach(({ freq, at, dur, type = "sine", gain = 0.18 }) => {
    const osc = audio.createOscillator();
    const amp = audio.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    const start = now + at;
    amp.gain.setValueAtTime(0.0001, start);
    amp.gain.exponentialRampToValueAtTime(gain, start + 0.015);
    amp.gain.exponentialRampToValueAtTime(0.0001, start + dur);
    osc.connect(amp).connect(audio.destination);
    osc.start(start);
    osc.stop(start + dur + 0.05);
  });
}

/** Bright two-note "ding" for a right answer. */
export function playCorrect() {
  tones([
    { freq: 880, at: 0, dur: 0.12, type: "triangle" },
    { freq: 1318.5, at: 0.08, dur: 0.22, type: "triangle" },
  ]);
}

/** Soft low "bonk" for a wrong answer — gentle, not punishing. */
export function playWrong() {
  tones([
    { freq: 220, at: 0, dur: 0.18, type: "sine", gain: 0.2 },
    { freq: 174.6, at: 0.1, dur: 0.24, type: "sine", gain: 0.16 },
  ]);
}

/** Rising sparkle that climbs with the combo. */
export function playCombo(combo: number) {
  const base = 660 * Math.pow(2, Math.min(12, combo) / 24);
  tones([
    { freq: base, at: 0, dur: 0.1, type: "triangle", gain: 0.14 },
    { freq: base * 1.25, at: 0.06, dur: 0.1, type: "triangle", gain: 0.14 },
    { freq: base * 1.5, at: 0.12, dur: 0.22, type: "triangle", gain: 0.14 },
  ]);
}

/** Fanfare for level-ups, streaks and badges. */
export function playLevelUp() {
  tones(
    [523.25, 659.25, 783.99, 1046.5, 1318.5].map((freq, i) => ({
      freq,
      at: i * 0.09,
      dur: 0.35,
      type: "triangle" as const,
      gain: 0.16,
    })),
  );
}

/** Tiny tick for XP counters and quest claims. */
export function playTick() {
  tones([{ freq: 1567.98, at: 0, dur: 0.06, type: "square", gain: 0.05 }]);
}
