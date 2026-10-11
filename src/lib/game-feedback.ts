import { registerAnswer } from "./gamification";
import { playCombo, playCorrect, playWrong } from "./sfx";

const PRAISE = ["Nice!", "Spot on!", "Textbook!", "Sharp call!", "Consultant-level!", "Nailed it!"];
const COMBO_PRAISE = ["On fire!", "Unstoppable!", "Clinical genius!", "Ward-round ready!"];
const ENCOURAGE = [
  "Not quite. Now you'll remember it.",
  "Close one. Read the why below.",
  "Every miss today is a mark on exam day.",
  "Tricky one. You'll see it again soon.",
];

const pick = <T,>(items: readonly T[]) => items[Math.floor(Math.random() * items.length)]!;

/** Answer feedback in one call: predicted XP, combo, sound and a message. */
export function answerFeedback(correct: boolean, opts: { silent?: boolean } = {}) {
  const { amount, combo } = registerAnswer(correct, opts);
  if (!opts.silent) {
    if (!correct) playWrong();
    else if (combo >= 3) playCombo(combo);
    else playCorrect();
  }
  const message = !correct ? pick(ENCOURAGE) : combo >= 5 ? pick(COMBO_PRAISE) : pick(PRAISE);
  return { amount, combo, message };
}
