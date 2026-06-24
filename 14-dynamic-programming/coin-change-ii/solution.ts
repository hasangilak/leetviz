/**
 * LeetCode #518 — Coin Change II (Medium)
 * https://leetcode.com/problems/coin-change-ii/
 *
 * Count the number of distinct COMBINATIONS of coins (unlimited supply) that sum
 * to amount. Order doesn't matter: 1+2 and 2+1 are the same combination.
 */

/**
 * Counting DP (unbounded knapsack — count, not minimize).
 *
 * STATE:      dp[a] = number of combinations that sum to amount a.
 * RECURRENCE: process coins ONE AT A TIME (outer loop). For each coin, sweep
 *             amounts upward adding the ways that use that coin:
 *               dp[a] += dp[a - coin]
 * BASE:       dp[0] = 1 (one way to make 0: take no coins).
 *
 * Why coins on the OUTSIDE? It fixes a consideration order for the coins, so each
 * unordered combination is counted exactly once (never as a reordering).
 *
 * Time:  O(amount · #coins)
 * Space: O(amount)
 */
export function change(amount: number, coins: number[]): number {
  const dp = new Array<number>(amount + 1).fill(0);
  dp[0] = 1;

  for (const coin of coins) {
    for (let a = coin; a <= amount; a++) {
      dp[a] += dp[a - coin];
    }
  }

  return dp[amount];
}

if (require.main === module) {
  console.log(change(5, [1, 2, 5])); // 4  (5; 2+2+1; 2+1+1+1; 1×5)
  console.log(change(3, [2])); // 0
  console.log(change(10, [10])); // 1
  console.log(change(0, [7])); // 1 (the empty combination)
}
