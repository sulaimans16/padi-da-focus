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
