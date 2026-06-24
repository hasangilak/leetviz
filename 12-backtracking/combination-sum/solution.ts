/**
 * LeetCode #39 — Combination Sum (Medium)
 * https://leetcode.com/problems/combination-sum/
 *
 * Given DISTINCT candidates and a target, return all unique combinations summing
 * to target. Each candidate may be reused unlimited times.
 */

/**
 * Backtracking with reuse allowed.
 *
 * Track the `remaining` amount. At each step try every candidate from `start`
 * onward; recursing with the SAME index (i, not i+1) permits reusing a number.
 * Fixing a non-decreasing start index prevents permutations of the same
 * combination (so [2,2,3] is found once, never also as [2,3,2]).
 *
 * Prune as soon as `remaining` goes negative.
 *
 * Time:  exponential — roughly O(n^(target/min)) candidates explored.
 * Space: O(target / min) recursion depth.
 */
export function combinationSum(candidates: number[], target: number): number[][] {
  const result: number[][] = [];
  const current: number[] = [];

  const backtrack = (start: number, remaining: number): void => {
    if (remaining === 0) {
      result.push([...current]); // exact hit
      return;
    }
    if (remaining < 0) return; // overshot -> prune

    for (let i = start; i < candidates.length; i++) {
      current.push(candidates[i]);
      backtrack(i, remaining - candidates[i]); // i (not i+1) -> reuse allowed
      current.pop();
    }
  };

  backtrack(0, target);
  return result;
}

if (require.main === module) {
  console.log(combinationSum([2, 3, 6, 7], 7)); // [[2,2,3],[7]]
  console.log(combinationSum([2, 3, 5], 8)); // [[2,2,2,2],[2,3,3],[3,5]]
  console.log(combinationSum([2], 1)); // []
}
