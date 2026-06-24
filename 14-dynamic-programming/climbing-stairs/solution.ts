/**
 * LeetCode #70 — Climbing Stairs (Easy)
 * https://leetcode.com/problems/climbing-stairs/
 *
 * You climb a staircase of n steps, taking 1 or 2 steps at a time. How many
 * distinct ways can you reach the top?
 */

/**
 * Bottom-up DP (it's secretly Fibonacci).
 *
 * STATE:      ways(i) = number of distinct ways to reach step i.
 * RECURRENCE: the last move was either +1 (from step i-1) or +2 (from i-2), so
 *             ways(i) = ways(i-1) + ways(i-2).
 * BASE:       ways(0) = 1 (already there), ways(1) = 1.
 *
 * We only ever need the previous two values, so we keep two variables instead of
 * a whole array — O(1) space.
 *
 * Time:  O(n)
 * Space: O(1)
 */
export function climbStairs(n: number): number {
  let twoBack = 1; // ways(i-2), starts as ways(0)
  let oneBack = 1; // ways(i-1), starts as ways(1)

  for (let i = 2; i <= n; i++) {
    const current = oneBack + twoBack;
    twoBack = oneBack;
    oneBack = current;
  }

  return oneBack;
}

if (require.main === module) {
  console.log(climbStairs(2)); // 2  (1+1, 2)
  console.log(climbStairs(3)); // 3  (1+1+1, 1+2, 2+1)
  console.log(climbStairs(5)); // 8
  console.log(climbStairs(1)); // 1
}
