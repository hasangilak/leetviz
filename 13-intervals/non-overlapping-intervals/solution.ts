/**
 * LeetCode #435 — Non-overlapping Intervals (Medium)
 * https://leetcode.com/problems/non-overlapping-intervals/
 *
 * Return the MINIMUM number of intervals to remove so the rest don't overlap.
 */

/**
 * Greedy: sort by END, always keep the interval that finishes earliest.
 *
 * This is the classic "activity selection" problem. To keep the most intervals
 * (= remove the fewest), repeatedly keep the one that ends soonest — it leaves
 * the most room for the others. Sort by end time; track the last kept end. If an
 * interval starts before that end, it overlaps and must be removed; otherwise
 * keep it and advance the boundary.
 *
 * Time:  O(n log n) — the sort.
 * Space: O(1) extra.
 */
export function eraseOverlapIntervals(intervals: number[][]): number {
  intervals.sort((a, b) => a[1] - b[1]); // by end time
  let prevEnd = -Infinity;
  let removals = 0;

  for (const [start, end] of intervals) {
    if (start >= prevEnd) {
      prevEnd = end; // no overlap -> keep it
    } else {
      removals++; // overlaps the kept one -> remove this one
    }
  }

  return removals;
}

if (require.main === module) {
  console.log(eraseOverlapIntervals([[1, 2], [2, 3], [3, 4], [1, 3]])); // 1
  console.log(eraseOverlapIntervals([[1, 2], [1, 2], [1, 2]])); // 2
  console.log(eraseOverlapIntervals([[1, 2], [2, 3]])); // 0
}
