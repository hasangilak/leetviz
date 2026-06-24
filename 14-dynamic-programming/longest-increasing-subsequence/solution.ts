/**
 * LeetCode #300 — Longest Increasing Subsequence (Medium)
 * https://leetcode.com/problems/longest-increasing-subsequence/
 *
 * Return the length of the longest STRICTLY increasing subsequence. A
 * subsequence keeps order but may drop elements (not necessarily contiguous).
 */

/**
 * O(n^2) DP on "LIS ending at i".
 *
 * STATE:      dp[i] = length of the longest increasing subsequence that ENDS at
 *             index i.
 * RECURRENCE: extend any earlier smaller element:
 *               dp[i] = 1 + max(dp[j]) for all j < i with nums[j] < nums[i]
 *             (or just 1 if none qualify).
 * ANSWER:     the max over all dp[i].
 *
 * Time:  O(n^2)
 * Space: O(n)
 *
 * (An O(n log n) "patience sorting" version exists — see the README.)
 */
export function lengthOfLIS(nums: number[]): number {
  const n = nums.length;
  if (n === 0) return 0;

  const dp = new Array<number>(n).fill(1); // each element alone is length 1
  let best = 1;

  for (let i = 1; i < n; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[j] < nums[i] && dp[j] + 1 > dp[i]) {
        dp[i] = dp[j] + 1;
      }
    }
    best = Math.max(best, dp[i]);
  }

  return best;
}

if (require.main === module) {
  console.log(lengthOfLIS([10, 9, 2, 5, 3, 7, 101, 18])); // 4  ([2,3,7,101])
  console.log(lengthOfLIS([0, 1, 0, 3, 2, 3])); // 4
  console.log(lengthOfLIS([7, 7, 7, 7])); // 1 (strictly increasing)
}
