/**
 * LeetCode #875 — Koko Eating Bananas (Medium)
 * https://leetcode.com/problems/koko-eating-bananas/
 *
 * Koko eats at speed k bananas/hour: each hour she finishes one pile (or eats k
 * and stops if the pile is smaller). Find the MINIMUM integer speed k that
 * finishes all piles within h hours.
 */

/**
 * Binary search on the ANSWER (the speed).
 *
 * The hours needed are MONOTONIC in speed: faster speed -> fewer (or equal)
 * hours. So "can Koko finish at speed k within h?" flips from false to true
 * exactly once as k increases — perfect for binary search over k in [1, maxPile].
 * Find the leftmost k whose required hours <= h.
 *
 * hoursAt(k) = sum over piles of ceil(pile / k).
 *
 * Time:  O(n log M) — M = max pile size; each feasibility check is O(n).
 * Space: O(1)
 */
export function minEatingSpeed(piles: number[], h: number): number {
  const hoursAt = (speed: number): number =>
    piles.reduce((sum, pile) => sum + Math.ceil(pile / speed), 0);

  let lo = 1;
  let hi = Math.max(...piles); // eating faster than this never helps

  while (lo < hi) {
    const mid = (lo + hi) >>> 1;
    if (hoursAt(mid) <= h) {
      hi = mid; // mid works; try slower
    } else {
      lo = mid + 1; // too slow; speed up
    }
  }

  return lo; // smallest feasible speed
}

if (require.main === module) {
  console.log(minEatingSpeed([3, 6, 7, 11], 8)); // 4
  console.log(minEatingSpeed([30, 11, 23, 4, 20], 5)); // 30
  console.log(minEatingSpeed([30, 11, 23, 4, 20], 6)); // 23
}
