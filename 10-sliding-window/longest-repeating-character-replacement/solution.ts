/**
 * LeetCode #424 — Longest Repeating Character Replacement (Medium)
 * https://leetcode.com/problems/longest-repeating-character-replacement/
 *
 * You may change at most k characters (to any uppercase letter). Return the
 * length of the longest substring of a single repeated letter you can produce.
 */

/**
 * Sliding window keyed on "how many chars must I replace?"
 *
 * For a window, the cheapest way to make it all-one-letter is to keep the most
 * frequent letter and replace the rest:
 *     replacements needed = windowLength - countOfMostFrequentLetter
 * The window is valid while that's <= k. Grow the right edge always; when the
 * window becomes invalid, nudge the left edge forward. The answer is the largest
 * valid window seen.
 *
 * Neat trick: we never need to DECREASE maxCount when shrinking — a stale (too
 * high) maxCount only makes the validity test stricter, so the answer stays
 * correct while keeping the loop O(n).
 *
 * Time:  O(n)
 * Space: O(1) — 26 counts.
 */
export function characterReplacement(s: string, k: number): number {
  const count = new Array<number>(26).fill(0);
  const A = 'A'.charCodeAt(0);
  let left = 0;
  let maxCount = 0; // count of the most frequent char in the window
  let best = 0;

  for (let right = 0; right < s.length; right++) {
    const idx = s.charCodeAt(right) - A;
    count[idx]++;
    maxCount = Math.max(maxCount, count[idx]);

    // window length - most frequent = chars we'd have to replace
    while (right - left + 1 - maxCount > k) {
      count[s.charCodeAt(left) - A]--;
      left++;
    }

    best = Math.max(best, right - left + 1);
  }

  return best;
}

if (require.main === module) {
  console.log(characterReplacement('ABAB', 2)); // 4 (replace 2 -> "AAAA")
  console.log(characterReplacement('AABABBA', 1)); // 4 ("AABA"->"AAAA" or "ABBB")
  console.log(characterReplacement('AAAA', 0)); // 4
}
