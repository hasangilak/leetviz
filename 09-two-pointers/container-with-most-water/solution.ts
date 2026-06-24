/**
 * LeetCode #11 — Container With Most Water (Medium)
 * https://leetcode.com/problems/container-with-most-water/
 *
 * Each height[i] is a vertical line. Pick two lines that, with the x-axis, hold
 * the most water. Return that maximum area.
 */

/**
 * Two pointers closing in from the ends.
 *
 * Area between i and j = (distance) × (shorter of the two walls):
 *     area = (j - i) * min(height[i], height[j])
 *
 * Start as wide as possible (lo=0, hi=last). To improve, we must raise the
 * limiting (shorter) wall, so move whichever pointer is shorter inward. Moving
 * the taller one can only shrink width without ever raising the bottleneck.
 *
 * Time:  O(n) — pointers meet after n steps.
 * Space: O(1).
 */
export function maxArea(height: number[]): number {
  let lo = 0;
  let hi = height.length - 1;
  let best = 0;

  while (lo < hi) {
    const area = (hi - lo) * Math.min(height[lo], height[hi]);
    best = Math.max(best, area);

    // move the shorter wall — it's the bottleneck
    if (height[lo] < height[hi]) lo++;
    else hi--;
  }

  return best;
}

if (require.main === module) {
  console.log(maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7])); // 49
  console.log(maxArea([1, 1])); // 1
}
