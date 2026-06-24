/**
 * LeetCode #139 — Word Break (Medium)
 * https://leetcode.com/problems/word-break/
 *
 * Can string s be segmented into a space-separated sequence of one or more words
 * from the dictionary? Words may be reused.
 */

/**
 * Bottom-up DP over prefixes.
 *
 * STATE:      dp[i] = can the first i characters s[0..i) be fully segmented?
 * RECURRENCE: dp[i] is true if there's a split point j < i where
 *               dp[j] is true  AND  s[j..i) is a dictionary word.
 * BASE:       dp[0] = true (the empty prefix is trivially segmentable).
 * ANSWER:     dp[n].
 *
 * Time:  O(n^2 · L) — n split points × n starts × substring/lookup cost L.
 * Space: O(n) for dp (+ the word set).
 */
export function wordBreak(s: string, wordDict: string[]): boolean {
  const words = new Set(wordDict);
  const n = s.length;
  const dp = new Array<boolean>(n + 1).fill(false);
  dp[0] = true;

  for (let i = 1; i <= n; i++) {
    for (let j = 0; j < i; j++) {
      // s[0..j) breakable AND s[j..i) is a word  ->  s[0..i) breakable
      if (dp[j] && words.has(s.slice(j, i))) {
        dp[i] = true;
        break;
      }
    }
  }

  return dp[n];
}

if (require.main === module) {
  console.log(wordBreak('leetcode', ['leet', 'code'])); // true
  console.log(wordBreak('applepenapple', ['apple', 'pen'])); // true
  console.log(wordBreak('catsandog', ['cats', 'dog', 'sand', 'and', 'cat'])); // false
}
