/**
 * LeetCode #46 — Permutations (Medium)
 * https://leetcode.com/problems/permutations/
 *
 * Return all permutations of an array of distinct integers.
 */

/**
 * Backtracking with a `used` marker.
 *
 * Unlike subsets/combinations, ORDER matters and every element must appear, so
 * we don't use a forward-only `start`. Instead, at each position try every
 * not-yet-used number. A `used[]` flag records which indices are already placed
 * in the current prefix. When the prefix reaches full length, it's a complete
 * permutation.
 *
 * Time:  O(n · n!) — n! permutations, each O(n) to build/copy.
 * Space: O(n) — recursion depth + used[].
 */
export function permute(nums: number[]): number[][] {
  const result: number[][] = [];
  const current: number[] = [];
  const used = new Array<boolean>(nums.length).fill(false);

  const backtrack = (): void => {
    if (current.length === nums.length) {
      result.push([...current]);
      return;
    }

    for (let i = 0; i < nums.length; i++) {
      if (used[i]) continue; // already placed in this prefix
      used[i] = true;
      current.push(nums[i]);
      backtrack();
      current.pop(); // undo
      used[i] = false;
    }
  };

  backtrack();
  return result;
}

if (require.main === module) {
  console.log(permute([1, 2, 3]));
  // [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
  console.log(permute([0, 1])); // [[0,1],[1,0]]
}
