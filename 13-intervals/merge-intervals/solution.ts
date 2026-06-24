/**
 * LeetCode #56 — Merge Intervals (Medium)
 * https://leetcode.com/problems/merge-intervals/
 *
 * Merge all overlapping intervals.
 */

/**
 * Sort by start, then sweep and merge.
 *
 * After sorting by start time, overlapping intervals are adjacent. Walk through
 * them keeping the last merged interval; if the next one starts at or before the
 * last one's end, they overlap — extend the end. Otherwise it's a fresh interval.
 *
 * Time:  O(n log n) — dominated by the sort.
 * Space: O(n) — output (O(log n) sort stack aside).
 */
export function merge(intervals: number[][]): number[][] {
  intervals.sort((a, b) => a[0] - b[0]);
  const merged: number[][] = [];

  for (const [start, end] of intervals) {
    const last = merged[merged.length - 1];
    if (last !== undefined && start <= last[1]) {
      last[1] = Math.max(last[1], end); // overlap -> extend
    } else {
      merged.push([start, end]); // disjoint -> new interval
    }
  }

  return merged;
}

if (require.main === module) {
  console.log(merge([[1, 3], [2, 6], [8, 10], [15, 18]]));
  // [[1,6],[8,10],[15,18]]
  console.log(merge([[1, 4], [4, 5]])); // [[1,5]]  (touching counts as overlap)
}
