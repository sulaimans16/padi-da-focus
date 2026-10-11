import type { MascotMood } from "@/components/mascot/Mascot";
import type { GameState } from "./gamification";

const pick = <T>(items: readonly T[], seed: number) => items[Math.abs(seed) % items.length]!;

/** What Dr. Pulse says on the dashboard, based on the learner's day so far. */
export function dashboardLine(
  state: GameState | null,
  name: string,
  hour: number,
): { mood: MascotMood; text: string } {
  const seed = new Date().getDate();
  if (!state || state.xpTotal === 0) {
    return {
      mood: "happy",
      text: `Hi ${name}! I'm Dr. Pulse, your study buddy. Let's do one quick lesson together.`,
    };
  }
  if (state.freezesUsed > 0) {
    return {
      mood: "happy",
      text: "Phew! A streak freeze saved your streak. Let's not need another one.",
    };
  }
  if (state.streakExtendedToday) {
    return {
      mood: "cheer",
      text: pick(
        [
          `Goal smashed! ${state.streak} day streak and counting.`,
          "That's today's dose done. Bonus questions make you even stronger!",
          "You showed up today. That's what toppers do.",
        ],
        seed,
      ),
    };
  }
  if (state.streak > 0 && hour >= 19) {
    return {
      mood: "sad",
      text: `Your ${state.streak} day streak ends at midnight! Just ${Math.max(0, state.dailyGoal - state.todayXp)} XP to save it.`,
    };
  }
  if (state.mistakesDue > 0) {
    return {
      mood: "think",
      text: `${state.mistakesDue} past mistake${state.mistakesDue > 1 ? "s are" : " is"} ready for review. Fixing them is where marks are won.`,
    };
  }
  if (state.todayXp > 0) {
    return {
      mood: "fire",
      text: `${state.dailyGoal - state.todayXp} XP to today's goal. Keep the pulse going!`,
    };
  }
  if (hour < 5)
    return { mood: "sleep", text: "Burning the midnight oil? Even a 5-minute drill counts." };
  return {
    mood: "idle",
    text: pick(
      [
        "Ready for today's dose of medicine? Ten questions, no side effects.",
        "A little every day beats cramming. Shall we start?",
        `Day ${state.streak + 1} of your streak starts with one lesson.`,
      ],
      seed,
    ),
  };
}
