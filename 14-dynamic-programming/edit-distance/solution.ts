/**
 * LeetCode #72 — Edit Distance (Hard, but a DP must-know)
 * https://leetcode.com/problems/edit-distance/
 *
 * Minimum number of single-character edits (insert, delete, replace) to turn
 * word1 into word2. Also known as Levenshtein distance.
 */

/**
 * 2-D DP over prefixes.
 *
 * STATE:      dp[i][j] = edits to turn word1[0..i) into word2[0..j).
 * RECURRENCE: compare the last characters:
 *               match  -> dp[i][j] = dp[i-1][j-1]               (free, no edit)
 *               differ -> dp[i][j] = 1 + min(
 *                            dp[i-1][j],      // delete  from word1
 *                            dp[i][j-1],      // insert  into word1
 *                            dp[i-1][j-1])    // replace one char
 * BASE:       dp[i][0] = i (delete all i chars), dp[0][j] = j (insert all j).
 *
 * Time:  O(m · n)
 * Space: O(m · n)
 */
export function minDistance(word1: string, word2: string): number {
  const m = word1.length;
  const n = word2.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () =>
    new Array<number>(n + 1).fill(0),
  );

  for (let i = 0; i <= m; i++) dp[i][0] = i; // turn word1's prefix into ""
  for (let j = 0; j <= n; j++) dp[0][j] = j; // turn "" into word2's prefix

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (word1[i - 1] === word2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1]; // characters agree → carry the diagonal
      } else {
        dp[i][j] = 1 + Math.min(
          dp[i - 1][j], // delete
          dp[i][j - 1], // insert
          dp[i - 1][j - 1], // replace
        );
      }
    }
  }

  return dp[m][n];
}

if (require.main === module) {
  console.log(minDistance('horse', 'ros')); // 3
  console.log(minDistance('intention', 'execution')); // 5
  console.log(minDistance('', 'abc')); // 3
  console.log(minDistance('same', 'same')); // 0
}
