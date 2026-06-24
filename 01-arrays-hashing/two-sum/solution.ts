/**
 * LeetCode #1 — Two Sum (Easy)
 * https://leetcode.com/problems/two-sum/
 *
 * Given an array `nums` and a `target`, return the indices of the two numbers
 * that add up to `target`. Exactly one solution exists; you may not reuse an
 * element.
 */

/**
 * One-pass hash map.
 *
 * For each number `x` we ask: "have I already seen `target - x`?"
 * The map stores  value -> index  of everything to our left, so the lookup is
 * O(1) on average. The first time the complement exists, we're done.
 *
 * Time:  O(n) — single pass, O(1) average map ops.
 * Space: O(n) — up to n entries in the map.
 */
export function twoSum(nums: number[], target: number): number[] {
  const seen = new Map<number, number>(); // value -> index

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (seen.has(complement)) {
      return [seen.get(complement)!, i];
    }
    seen.set(nums[i], i);
  }

  return []; // problem guarantees a solution, so this is unreachable
}

if (require.main === module) {
  console.log(twoSum([2, 7, 11, 15], 9)); // [0, 1]
  console.log(twoSum([3, 2, 4], 6)); // [1, 2]
  console.log(twoSum([3, 3], 6)); // [0, 1]
}
