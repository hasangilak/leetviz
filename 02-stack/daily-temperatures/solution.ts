/**
 * LeetCode #739 — Daily Temperatures (Medium)
 * https://leetcode.com/problems/daily-temperatures/
 *
 * For each day, how many days until a WARMER temperature? Put 0 if there is no
 * future warmer day.
 */

/**
 * Monotonic (decreasing) stack of indices.
 *
 * We keep a stack of day-indices whose temperatures are strictly decreasing —
 * these are days still "waiting" for a warmer day. When today's temperature is
 * higher than the day on top of the stack, today RESOLVES that day: the wait is
 * (today - thatDay). Keep popping while today beats the top, then push today.
 *
 * Each index is pushed once and popped at most once -> linear overall.
 *
 * Time:  O(n) — amortized; every index enters/leaves the stack once.
 * Space: O(n) — the stack (and the answer array).
 */
export function dailyTemperatures(temperatures: number[]): number[] {
  const n = temperatures.length;
  const answer = new Array<number>(n).fill(0);
  const stack: number[] = []; // indices, temperatures strictly decreasing

  for (let day = 0; day < n; day++) {
    while (
      stack.length > 0 &&
      temperatures[day] > temperatures[stack[stack.length - 1]]
    ) {
      const coldDay = stack.pop()!;
      answer[coldDay] = day - coldDay;
    }
    stack.push(day);
  }

  return answer; // indices left on the stack keep their default 0
}

if (require.main === module) {
  console.log(dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73]));
  // [1, 1, 4, 2, 1, 1, 0, 0]
  console.log(dailyTemperatures([30, 40, 50, 60])); // [1, 1, 1, 0]
  console.log(dailyTemperatures([30, 60, 90])); // [1, 1, 0]
}
