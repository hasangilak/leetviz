/**
 * LeetCode #211 — Design Add and Search Words Data Structure (Medium)
 * https://leetcode.com/problems/design-add-and-search-words-data-structure/
 *
 * Like a trie, but search supports the wildcard '.', which matches ANY single
 * character.
 */

class TrieNode {
  children = new Map<string, TrieNode>();
  isEndOfWord = false;
}

/**
 * Trie + DFS for the '.' wildcard.
 *
 * `addWord` is an ordinary trie insert. `search` walks the trie, but on a '.'
 * it must try EVERY child — so search becomes a small depth-first search that
 * branches at each wildcard.
 *
 * addWord: O(L).
 * search:  O(L) with no wildcards; up to O(26^d · L) with d wildcards (each '.'
 *          can branch over up to 26 children). In practice tiny.
 */
export class WordDictionary {
  private readonly root = new TrieNode();

  addWord(word: string): void {
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

  search(word: string): boolean {
    const dfs = (node: TrieNode, i: number): boolean => {
      if (i === word.length) return node.isEndOfWord; // consumed all chars

      const ch = word[i];
      if (ch === '.') {
        // wildcard: succeed if ANY child can match the rest
        for (const child of node.children.values()) {
          if (dfs(child, i + 1)) return true;
        }
        return false;
      }

      const next = node.children.get(ch);
      return next !== undefined && dfs(next, i + 1);
    };

    return dfs(this.root, 0);
  }
}

if (require.main === module) {
  const wd = new WordDictionary();
  wd.addWord('bad');
  wd.addWord('dad');
  wd.addWord('mad');
  console.log(wd.search('pad')); // false
  console.log(wd.search('bad')); // true
  console.log(wd.search('.ad')); // true (matches bad/dad/mad)
  console.log(wd.search('b..')); // true (matches bad)
  console.log(wd.search('..')); // false (no 2-letter words)
}
