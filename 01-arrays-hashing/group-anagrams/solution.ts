/**
 * LeetCode #49 — Group Anagrams (Medium)
 * https://leetcode.com/problems/group-anagrams/
 *
 * Group strings that are anagrams of one another. Anagrams use the same letters
 * with the same multiplicities, in any order.
 */

/**
 * Bucket by a canonical signature.
 *
 * Two words are anagrams  <=>  they have identical letter counts. So we build a
 * 26-slot count vector for each word and use it as a hash-map key. All anagrams
 * collide into the same bucket.
 *
 * Using the count vector as the key is O(k) per word (k = word length).
 * Sorting each word would also work but costs O(k log k) per word.
 *
 * Time:  O(n * k) — n words, each of length up to k.
 * Space: O(n * k) — every character is stored once across the buckets.
 */
export function groupAnagrams(strs: string[]): string[][] {
  const groups = new Map<string, string[]>();
  const A = 'a'.charCodeAt(0);

  for (const s of strs) {
    const count = new Array<number>(26).fill(0);
    for (let i = 0; i < s.length; i++) {
      count[s.charCodeAt(i) - A]++;
    }
    // "#"-joined counts form a collision-free signature, e.g. "1#0#0#...#2"
    const key = count.join('#');

    const bucket = groups.get(key);
    if (bucket) bucket.push(s);
    else groups.set(key, [s]);
  }

  return [...groups.values()];
}

if (require.main === module) {
  console.log(groupAnagrams(['eat', 'tea', 'tan', 'ate', 'nat', 'bat']));
  // [['eat','tea','ate'], ['tan','nat'], ['bat']]
  console.log(groupAnagrams([''])); // [['']]
  console.log(groupAnagrams(['a'])); // [['a']]
}
