/**
 * LeetCode #57 — Insert Interval (Medium)
 * https://leetcode.com/problems/insert-interval/
 *
 * Given NON-overlapping intervals sorted by start, insert a new interval and
 * merge if necessary. Return the result still sorted & non-overlapping.
 */

/**
 * Three-phase linear sweep (no sorting needed — input is already sorted).
 *
 *   1) Copy all intervals that end BEFORE the new one starts (strictly left).
 *   2) Merge every interval that overlaps the new one into it (widen the new
 *      interval's start/end), then place the merged interval.
 *   3) Copy all intervals that start AFTER the new one ends (strictly right).
 *
 * Time:  O(n)
 * Space: O(n) — output.
 */
export function insert(intervals: number[][], newInterval: number[]): number[][] {
  const result: number[][] = [];
  let [newStart, newEnd] = newInterval;
  let i = 0;
  const n = intervals.length;

  // 1) intervals entirely before the new one
  while (i < n && intervals[i][1] < newStart) {
    result.push(intervals[i]);
    i++;
  }

  // 2) absorb all overlapping intervals into [newStart, newEnd]
  while (i < n && intervals[i][0] <= newEnd) {
    newStart = Math.min(newStart, intervals[i][0]);
    newEnd = Math.max(newEnd, intervals[i][1]);
    i++;
  }
  result.push([newStart, newEnd]);

  // 3) intervals entirely after the new one
  while (i < n) {
    result.push(intervals[i]);
    i++;
  }

  return result;
}

if (require.main === module) {
  console.log(insert([[1, 3], [6, 9]], [2, 5])); // [[1,5],[6,9]]
  console.log(insert([[1, 2], [3, 5], [6, 7], [8, 10], [12, 16]], [4, 8]));
  // [[1,2],[3,10],[12,16]]
  console.log(insert([], [5, 7])); // [[5,7]]
}
