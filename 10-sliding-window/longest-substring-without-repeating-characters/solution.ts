/**
 * LeetCode #3 — Longest Substring Without Repeating Characters (Medium)
 * https://leetcode.com/problems/longest-substring-without-repeating-characters/
 *
 * Return the length of the longest substring (contiguous) with all-distinct
 * characters.
 */

/**
 * Sliding window with a "last seen index" map.
 *
 * Maintain a window [start, i] that always holds distinct characters. As `i`
 * advances, if the current char was seen INSIDE the window, jump `start` to just
 * past its previous position — instantly evicting the duplicate (and everything
 * before it). Track the best window length along the way.
 *
 * Storing last-seen INDEX (not just presence) lets `start` jump in O(1) instead
 * of crawling forward.
 *
 * Time:  O(n) — each index advances `i` once and `start` monotonically.
 * Space: O(min(n, alphabet)) — the map.
 */
export function lengthOfLongestSubstring(s: string): number {
  const lastSeen = new Map<string, number>(); // char -> last index
  let start = 0;
  let best = 0;

  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    const prev = lastSeen.get(ch);
    // only jump if the duplicate is within the current window
    if (prev !== undefined && prev >= start) {
      start = prev + 1;
    }
    lastSeen.set(ch, i);
    best = Math.max(best, i - start + 1);
  }

  return best;
}

if (require.main === module) {
  console.log(lengthOfLongestSubstring('abcabcbb')); // 3 ("abc")
  console.log(lengthOfLongestSubstring('bbbbb')); // 1 ("b")
  console.log(lengthOfLongestSubstring('pwwkew')); // 3 ("wke")
  console.log(lengthOfLongestSubstring('')); // 0
}
