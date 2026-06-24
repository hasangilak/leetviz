/**
 * LeetCode #153 — Find Minimum in Rotated Sorted Array (Medium)
 * https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/
 *
 * A sorted array of distinct values was rotated. Return its minimum in O(log n).
 */

/**
 * Binary search for the "inflection point".
 *
 * The minimum is the only element smaller than its predecessor — the pivot where
 * the rotation wraps. Compare nums[mid] to nums[hi] (the right end):
 *   - nums[mid] > nums[hi]  -> the drop is to the RIGHT of mid, so min is in
 *                              (mid, hi]; move lo = mid + 1.
 *   - nums[mid] <= nums[hi] -> mid..hi is sorted, so the min is at mid or to its
 *                              left; move hi = mid.
 * Converge until lo == hi: that's the minimum.
 *
 * (Comparing to nums[hi], not nums[lo], cleanly handles the non-rotated case.)
 *
 * Time:  O(log n)
 * Space: O(1)
 */
export function findMin(nums: number[]): number {
  let lo = 0;
  let hi = nums.length - 1;

  while (lo < hi) {
    const mid = (lo + hi) >>> 1;
    if (nums[mid] > nums[hi]) {
      lo = mid + 1; // minimum is strictly right of mid
    } else {
      hi = mid; // minimum is mid or to the left
    }
  }

  return nums[lo]; // lo == hi -> the minimum
}

if (require.main === module) {
  console.log(findMin([3, 4, 5, 1, 2])); // 1
  console.log(findMin([4, 5, 6, 7, 0, 1, 2])); // 0
  console.log(findMin([11, 13, 15, 17])); // 11 (not rotated)
}
