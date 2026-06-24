/**
 * LeetCode #238 — Product of Array Except Self (Medium)
 * https://leetcode.com/problems/product-of-array-except-self/
 *
 * Return `answer` where answer[i] = product of all elements except nums[i].
 * Must run in O(n) and WITHOUT using division.
 */

/**
 * Prefix products × suffix products.
 *
 * answer[i] = (product of everything to the LEFT of i)
 *           × (product of everything to the RIGHT of i)
 *
 * Pass 1 (left→right): store the running left product in answer[i].
 * Pass 2 (right→left): multiply answer[i] by the running right product.
 *
 * The output array carries the prefix products, and two scalars carry the
 * prefix/suffix accumulators — so no extra arrays are needed.
 *
 * Time:  O(n) — two linear passes.
 * Space: O(1) extra — output array doesn't count toward extra space.
 */
export function productExceptSelf(nums: number[]): number[] {
  const n = nums.length;
  const answer = new Array<number>(n).fill(1);

  // answer[i] becomes the product of everything to the left of i
  let prefix = 1;
  for (let i = 0; i < n; i++) {
    answer[i] = prefix;
    prefix *= nums[i];
  }

  // multiply in the product of everything to the right of i
  let suffix = 1;
  for (let i = n - 1; i >= 0; i--) {
    answer[i] *= suffix;
    suffix *= nums[i];
  }

  return answer;
}

if (require.main === module) {
  console.log(productExceptSelf([1, 2, 3, 4])); // [24, 12, 8, 6]
  console.log(productExceptSelf([-1, 1, 0, -3, 3])); // [0, 0, 9, 0, 0]
}
