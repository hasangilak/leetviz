/**
 * LeetCode #347 — Top K Frequent Elements (Medium)
 * https://leetcode.com/problems/top-k-frequent-elements/
 *
 * Return the `k` most frequent elements (any order).
 */

/**
 * Bucket sort by frequency.
 *
 * Step 1: count occurrences with a hash map.
 * Step 2: an element can appear at most `n` times, so create n+1 buckets where
 *         bucket[f] holds every value seen exactly f times. This is a counting
 *         sort on frequency — no comparison sort needed.
 * Step 3: walk buckets from high frequency to low and collect the first k.
 *
 * This beats the common heap solution: O(n) instead of O(n log k).
 *
 * Time:  O(n)
 * Space: O(n) — map + buckets.
 */
export function topKFrequent(nums: number[], k: number): number[] {
  const freq = new Map<number, number>();
  for (const n of nums) freq.set(n, (freq.get(n) ?? 0) + 1);

  // buckets[f] = list of numbers that occur exactly f times
  const buckets: number[][] = Array.from({ length: nums.length + 1 }, () => []);
  for (const [num, count] of freq) buckets[count].push(num);

  const result: number[] = [];
  for (let f = buckets.length - 1; f >= 0 && result.length < k; f--) {
    for (const num of buckets[f]) {
      result.push(num);
      if (result.length === k) break;
    }
  }
  return result;
}

if (require.main === module) {
  console.log(topKFrequent([1, 1, 1, 2, 2, 3], 2)); // [1, 2]
  console.log(topKFrequent([1], 1)); // [1]
  console.log(topKFrequent([4, 4, 4, 5, 5, 6], 2)); // [4, 5]
}
