/**
 * LeetCode #217 — Contains Duplicate (Easy)
 * https://leetcode.com/problems/contains-duplicate/
 *
 * Return true if any value appears at least twice in `nums`, false if every
 * element is distinct.
 */

/**
 * Hash set membership.
 *
 * Walk the array once. A `Set` answers "have I seen this before?" in O(1)
 * average time. The moment we try to add something already present, we have a
 * duplicate.
 *
 * Time:  O(n)
 * Space: O(n) — up to n distinct values in the set.
 */
export function containsDuplicate(nums: number[]): boolean {
  const seen = new Set<number>();

  for (const n of nums) {
    if (seen.has(n)) return true;
    seen.add(n);
  }

  return false;
}

if (require.main === module) {
  console.log(containsDuplicate([1, 2, 3, 1])); // true
  console.log(containsDuplicate([1, 2, 3, 4])); // false
  console.log(containsDuplicate([1, 1, 1, 3, 3, 4, 3, 2, 4, 2])); // true
}
