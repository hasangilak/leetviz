/**
 * LeetCode #198 — House Robber (Medium)
 * https://leetcode.com/problems/house-robber/
 *
 * Houses in a row each hold some money. You can't rob two ADJACENT houses (alarms
 * link neighbours). Maximize the money you can rob.
 */

/**
 * Bottom-up "take or skip" DP.
 *
 * STATE:      best(i) = max money robbing among houses 0..i.
 * RECURRENCE: at house i you either
 *               - ROB it:  nums[i] + best(i-2)   (must skip the neighbour i-1)
 *               - SKIP it: best(i-1)
 *             best(i) = max(rob, skip).
 * BASE:       best(-1) = 0, best(-2) = 0  (no houses → no money).
 *
 * Only the previous two answers matter, so two rolling variables suffice.
 *
 * Time:  O(n)
 * Space: O(1)
 */
export function rob(nums: number[]): number {
  let twoBack = 0; // best(i-2)
  let oneBack = 0; // best(i-1)

  for (const money of nums) {
    const takeThis = twoBack + money; // rob i → add best from two houses back
    const skipThis = oneBack; // skip i → carry the previous best
    const best = Math.max(takeThis, skipThis);
    twoBack = oneBack;
    oneBack = best;
  }

  return oneBack;
}

if (require.main === module) {
  console.log(rob([1, 2, 3, 1])); // 4  (rob house 0 and 2: 1+3)
  console.log(rob([2, 7, 9, 3, 1])); // 12 (rob 2 + 9 + 1)
  console.log(rob([5])); // 5
  console.log(rob([])); // 0
}
