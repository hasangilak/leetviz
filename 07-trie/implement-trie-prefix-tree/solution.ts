/**
 * LeetCode #208 — Implement Trie (Prefix Tree) (Medium)
 * https://leetcode.com/problems/implement-trie-prefix-tree/
 *
 * A trie stores strings as a tree of characters, enabling fast prefix queries.
 * Implement insert, search (exact word), and startsWith (prefix).
 */

/** One trie node: a map of next-character -> child, plus an end-of-word flag. */
class TrieNode {
  children = new Map<string, TrieNode>();
  isEndOfWord = false;
}

/**
 * Trie (prefix tree).
 *
 * Each edge is labeled with a character; a path from the root spells a prefix.
 * `isEndOfWord` marks where a complete inserted word ends — that's what lets us
 * tell the word "app" apart from the mere prefix of "apple".
 *
 * For a string of length L:
 *   insert / search / startsWith all run in O(L), independent of how many words
 *   are stored.
 */
export class Trie {
  private readonly root = new TrieNode();

  /** O(L): walk/create a path of nodes, then flag the final node. */
  insert(word: string): void {
    let node = this.root;
    for (const ch of word) {
      let next = node.children.get(ch);
      if (next === undefined) {
        next = new TrieNode();
        node.children.set(ch, next);
      }
      node = next;
    }
    node.isEndOfWord = true;
  }

  /** O(L): a word exists only if the path exists AND ends on a word-marker. */
  search(word: string): boolean {
    const node = this.walk(word);
    return node !== null && node.isEndOfWord;
  }

  /** O(L): a prefix exists if its path exists, regardless of word-markers. */
  startsWith(prefix: string): boolean {
    return this.walk(prefix) !== null;
  }

  /** Follow the characters; return the final node, or null if the path breaks. */
  private walk(s: string): TrieNode | null {
    let node = this.root;
    for (const ch of s) {
      const next = node.children.get(ch);
      if (next === undefined) return null;
      node = next;
    }
    return node;
  }
}

if (require.main === module) {
  const trie = new Trie();
  trie.insert('apple');
  console.log(trie.search('apple')); // true
  console.log(trie.search('app')); // false (inserted "apple", not "app")
  console.log(trie.startsWith('app')); // true
  trie.insert('app');
  console.log(trie.search('app')); // true
}
