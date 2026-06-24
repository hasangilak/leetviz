/**
 * LeetCode #33 — Search in Rotated Sorted Array (Medium)
 * https://leetcode.com/problems/search-in-rotated-sorted-array/
 *
 * A sorted array was rotated at some unknown pivot (e.g. [4,5,6,7,0,1,2]).
 * Find target's index in O(log n), or -1.
 */

/**
 * Modified binary search: one half is always sorted.
 *
 * Even after rotation, splitting at mid leaves at least ONE side fully sorted.
 * Detect which side is sorted, then check whether target lies within that
 * sorted side's range:
 *   - if yes, search there;
 *   - if no, search the other side.
 * This preserves the O(log n) halving.
 *
 * Time:  O(log n)
 * Space: O(1)
 */
export function search(nums: number[], target: number): number {
  let lo = 0;
  let hi = nums.length - 1;

  while (lo <= hi) {
    const mid = (lo + hi) >>> 1;
    if (nums[mid] === target) return mid;

    if (nums[lo] <= nums[mid]) {
      // left half [lo..mid] is sorted
      if (nums[lo] <= target && target < nums[mid]) hi = mid - 1;
      else lo = mid + 1;
    } else {
      // right half [mid..hi] is sorted
      if (nums[mid] < target && target <= nums[hi]) lo = mid + 1;
      else hi = mid - 1;
    }
  }

  return -1;
}

if (require.main === module) {
  console.log(search([4, 5, 6, 7, 0, 1, 2], 0)); // 4
  console.log(search([4, 5, 6, 7, 0, 1, 2], 3)); // -1
  console.log(search([1], 0)); // -1
}
