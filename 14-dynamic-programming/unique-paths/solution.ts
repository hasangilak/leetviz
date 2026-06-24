/**
 * LeetCode #62 — Unique Paths (Medium)
 * https://leetcode.com/problems/unique-paths/
 *
 * A robot at the top-left of an m x n grid wants to reach the bottom-right,
 * moving only RIGHT or DOWN. How many distinct paths are there?
 */

/**
 * Grid DP, space-optimized to one row.
 *
 * STATE:      paths(i, j) = ways to reach cell (i, j).
 * RECURRENCE: you arrive from the left or from above:
 *               paths(i, j) = paths(i-1, j) + paths(i, j-1)
 * BASE:       the entire first row and first column are 1 (only one straight-line
 *             way to reach them).
 *
 * Processing row by row, the value already in dp[j] is the cell ABOVE and
 * dp[j-1] is the cell to the LEFT — so a single 1-D array suffices.
 *
 * Time:  O(m · n)
 * Space: O(n)
 */
export function uniquePaths(m: number, n: number): number {
  const dp = new Array<number>(n).fill(1); // first row: all 1s

  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[j] += dp[j - 1]; // (from above = old dp[j]) + (from left = dp[j-1])
    }
  }

  return dp[n - 1];
}

if (require.main === module) {
  console.log(uniquePaths(3, 7)); // 28
  console.log(uniquePaths(3, 2)); // 3
  console.log(uniquePaths(1, 1)); // 1
}
