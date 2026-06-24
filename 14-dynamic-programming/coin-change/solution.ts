/**
 * LeetCode #322 — Coin Change (Medium)
 * https://leetcode.com/problems/coin-change/
 *
 * Given coin denominations and an amount, return the FEWEST coins that sum to
 * the amount (coins are unlimited), or -1 if it's impossible.
 */

/**
 * Bottom-up DP (unbounded knapsack, minimizing count).
 *
 * STATE:      dp[a] = fewest coins to make amount a.
 * RECURRENCE: try every coin as the LAST coin used:
 *               dp[a] = 1 + min over coins c≤a of dp[a - c]
 * BASE:       dp[0] = 0 (zero coins make amount 0). Unreachable amounts stay ∞.
 *
 * We build dp from 1 up to amount, so dp[a - c] is always ready.
 *
 * Time:  O(amount · #coins)
 * Space: O(amount)
 */
export function coinChange(coins: number[], amount: number): number {
  const dp = new Array<number>(amount + 1).fill(Infinity);
  dp[0] = 0;

  for (let a = 1; a <= amount; a++) {
    for (const coin of coins) {
      if (coin <= a && dp[a - coin] + 1 < dp[a]) {
        dp[a] = dp[a - coin] + 1;
      }
    }
  }

  return dp[amount] === Infinity ? -1 : dp[amount];
}

if (require.main === module) {
  console.log(coinChange([1, 2, 5], 11)); // 3  (5 + 5 + 1)
  console.log(coinChange([2], 3)); // -1 (can't make 3 from 2s)
  console.log(coinChange([1], 0)); // 0
  console.log(coinChange([1, 3, 4, 5], 7)); // 2  (3 + 4)
}
