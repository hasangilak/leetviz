/**
 * LeetCode #1143 — Longest Common Subsequence (Medium)
 * https://leetcode.com/problems/longest-common-subsequence/
 *
 * Return the length of the longest subsequence common to two strings. A
 * subsequence keeps order but may skip characters.
 */

/**
 * Classic 2-D string DP.
 *
 * STATE:      dp[i][j] = LCS length of the prefixes text1[0..i) and text2[0..j).
 * RECURRENCE: compare the last characters of each prefix:
 *               match  -> dp[i][j] = dp[i-1][j-1] + 1   (extend the diagonal)
 *               differ -> dp[i][j] = max(dp[i-1][j], dp[i][j-1])  (drop one char)
 * BASE:       dp[0][*] = dp[*][0] = 0 (empty prefix shares nothing).
 *
 * Time:  O(m · n)
 * Space: O(m · n)  (reducible to O(min(m, n)) with two rows)
 */
export function longestCommonSubsequence(text1: string, text2: string): number {
  const m = text1.length;
  const n = text2.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () =>
    new Array<number>(n + 1).fill(0),
  );

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1; // characters match → extend diagonal
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]); // skip one char
      }
    }
  }

  return dp[m][n];
}

if (require.main === module) {
  console.log(longestCommonSubsequence('abcde', 'ace')); // 3  ("ace")
  console.log(longestCommonSubsequence('abc', 'abc')); // 3
  console.log(longestCommonSubsequence('abc', 'def')); // 0
}
