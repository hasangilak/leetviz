/**
 * LeetCode #128 — Longest Consecutive Sequence (Medium)
 * https://leetcode.com/problems/longest-consecutive-sequence/
 *
 * Return the length of the longest run of CONSECUTIVE integers (e.g. 1,2,3,4),
 * in O(n). The numbers may appear in any order.
 */

/**
 * Hash set + "only start counting at a sequence's beginning".
 *
 * Put everything in a set for O(1) membership. A number `n` begins a consecutive
 * run only if `n - 1` is absent. From each such start, walk n+1, n+2, … counting
 * the streak. Because we expand only from starts, every element is visited at
 * most twice total -> linear, despite the inner while loop.
 *
 * Time:  O(n)
 * Space: O(n) — the set.
 */
export function longestConsecutive(nums: number[]): number {
  const set = new Set(nums);
  let best = 0;

  for (const n of set) {
    if (set.has(n - 1)) continue; // n is NOT a start; skip

    let length = 1;
    while (set.has(n + length)) length++; // extend the run
    best = Math.max(best, length);
  }

  return best;
}

if (require.main === module) {
  console.log(longestConsecutive([100, 4, 200, 1, 3, 2])); // 4 ([1,2,3,4])
  console.log(longestConsecutive([0, 3, 7, 2, 5, 8, 4, 6, 0, 1])); // 9
  console.log(longestConsecutive([])); // 0
}
