/**
 * LeetCode #53 — Maximum Subarray (Medium)
 * https://leetcode.com/problems/maximum-subarray/
 *
 * Find the contiguous subarray with the largest sum and return that sum.
 */

/**
 * Kadane's algorithm — DP on "best sum ending here".
 *
 * STATE:      endHere = the largest subarray sum that ENDS at the current index.
 * RECURRENCE: extend the previous run or start fresh at the current number:
 *               endHere = max(num, endHere + num)
 *             If the running sum has gone negative, it can only drag us down, so
 *             we drop it and restart at `num`.
 * ANSWER:     the best `endHere` seen across all indices.
 *
 * Time:  O(n)
 * Space: O(1)
 */
export function maxSubArray(nums: number[]): number {
  let endHere = nums[0]; // best sum ending at index 0
  let best = nums[0];

  for (let i = 1; i < nums.length; i++) {
    endHere = Math.max(nums[i], endHere + nums[i]); // extend or restart
    best = Math.max(best, endHere);
  }

  return best;
}

if (require.main === module) {
  console.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4])); // 6  ([4,-1,2,1])
  console.log(maxSubArray([1])); // 1
  console.log(maxSubArray([5, 4, -1, 7, 8])); // 23
  console.log(maxSubArray([-3, -1, -2])); // -1 (least negative)
}
