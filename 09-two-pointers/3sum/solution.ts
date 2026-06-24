/**
 * LeetCode #15 — 3Sum (Medium)
 * https://leetcode.com/problems/3sum/
 *
 * Return all UNIQUE triplets [a, b, c] with a + b + c == 0.
 */

/**
 * Sort, then fix one number and two-pointer the rest.
 *
 * After sorting, fix nums[i] and search the remaining subarray for two numbers
 * that sum to -nums[i]. Because the subarray is sorted, two pointers (lo, hi)
 * converge in O(n): too small -> move lo right (bigger), too big -> move hi left.
 *
 * Skipping equal neighbours (for i, and for lo/hi after a hit) avoids duplicate
 * triplets without needing a hash set.
 *
 * Time:  O(n^2) — outer loop O(n) × inner two-pointer O(n). Sort is O(n log n).
 * Space: O(1) extra (ignoring the output and sort's stack).
 */
export function threeSum(nums: number[]): number[][] {
  const result: number[][] = [];
  nums.sort((a, b) => a - b);

  for (let i = 0; i < nums.length - 2; i++) {
    if (nums[i] > 0) break; // smallest is positive -> no zero-sum left
    if (i > 0 && nums[i] === nums[i - 1]) continue; // skip duplicate anchor

    let lo = i + 1;
    let hi = nums.length - 1;
    while (lo < hi) {
      const sum = nums[i] + nums[lo] + nums[hi];
      if (sum < 0) {
        lo++;
      } else if (sum > 0) {
        hi--;
      } else {
        result.push([nums[i], nums[lo], nums[hi]]);
        lo++;
        hi--;
        while (lo < hi && nums[lo] === nums[lo - 1]) lo++; // skip dup
        while (lo < hi && nums[hi] === nums[hi + 1]) hi--; // skip dup
      }
    }
  }

  return result;
}

if (require.main === module) {
  console.log(threeSum([-1, 0, 1, 2, -1, -4])); // [[-1,-1,2],[-1,0,1]]
  console.log(threeSum([0, 1, 1])); // []
  console.log(threeSum([0, 0, 0])); // [[0,0,0]]
}
