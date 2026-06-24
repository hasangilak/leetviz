/**
 * LeetCode #78 — Subsets (Medium)
 * https://leetcode.com/problems/subsets/
 *
 * Return ALL subsets (the power set) of an array of distinct integers.
 */

/**
 * Backtracking: at each index, choose to include it or not.
 *
 * We grow a `current` subset and explore. The `start` index ensures we only ever
 * add elements to the right of what we've added — so each subset is generated in
 * exactly one order, with no duplicates. Every node of the recursion tree IS a
 * valid subset, so we record `current` on entry.
 *
 * There are 2^n subsets and we spend O(n) copying each -> O(n · 2^n).
 *
 * Time:  O(n · 2^n)
 * Space: O(n) recursion depth (plus the output).
 */
export function subsets(nums: number[]): number[][] {
  const result: number[][] = [];
  const current: number[] = [];

  const backtrack = (start: number): void => {
    result.push([...current]); // every prefix-state is a subset

    for (let i = start; i < nums.length; i++) {
      current.push(nums[i]); // choose nums[i]
      backtrack(i + 1); // explore with it
      current.pop(); // un-choose (backtrack)
    }
  };

  backtrack(0);
  return result;
}

if (require.main === module) {
  console.log(subsets([1, 2, 3]));
  // [[],[1],[1,2],[1,2,3],[1,3],[2],[2,3],[3]]
  console.log(subsets([0])); // [[],[0]]
}
