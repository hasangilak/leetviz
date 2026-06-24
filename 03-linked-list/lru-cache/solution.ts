/**
 * LeetCode #146 — LRU Cache (Medium)
 * https://leetcode.com/problems/lru-cache/
 *
 * Design a cache with a fixed capacity that evicts the LEAST recently used key
 * when full. Both get and put must run in O(1).
 */

/** Node of an internal doubly linked list (stores key so we can evict it). */
class DLLNode {
  key: number;
  value: number;
  prev: DLLNode | null = null;
  next: DLLNode | null = null;
  constructor(key = 0, value = 0) {
    this.key = key;
    this.value = value;
  }
}

/**
 * Hash map + doubly linked list.
 *
 *   Map<key, node>     -> O(1) lookup of any node by key.
 *   Doubly linked list -> O(1) move-to-front and O(1) evict-from-back,
 *                         maintaining recency order.
 *
 * Two sentinel nodes (head/tail) remove all null-checks when splicing:
 *   head <-> [most recent] <-> ... <-> [least recent] <-> tail
 *
 * Every access (get or put) moves the node to the front. Eviction removes the
 * node just before `tail` — the least recently used.
 *
 * Time:  O(1) for get and put.
 * Space: O(capacity).
 */
export class LRUCache {
  private readonly capacity: number;
  private readonly map = new Map<number, DLLNode>();
  private readonly head: DLLNode; // sentinel: most-recent side
  private readonly tail: DLLNode; // sentinel: least-recent side

  constructor(capacity: number) {
    this.capacity = capacity;
    this.head = new DLLNode();
    this.tail = new DLLNode();
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  /** Unlink a node from the list. */
  private remove(node: DLLNode): void {
    node.prev!.next = node.next;
    node.next!.prev = node.prev;
  }

  /** Insert a node right after head (the most-recent position). */
  private addToFront(node: DLLNode): void {
    node.prev = this.head;
    node.next = this.head.next;
    this.head.next!.prev = node;
    this.head.next = node;
  }

  get(key: number): number {
    const node = this.map.get(key);
    if (node === undefined) return -1;
    // touching a key makes it the most recently used
    this.remove(node);
    this.addToFront(node);
    return node.value;
  }

  put(key: number, value: number): void {
    const existing = this.map.get(key);
    if (existing !== undefined) {
      existing.value = value;
      this.remove(existing);
      this.addToFront(existing);
      return;
    }

    if (this.map.size === this.capacity) {
      // evict least recently used: the node right before the tail sentinel
      const lru = this.tail.prev!;
      this.remove(lru);
      this.map.delete(lru.key);
    }

    const node = new DLLNode(key, value);
    this.map.set(key, node);
    this.addToFront(node);
  }
}

if (require.main === module) {
  const cache = new LRUCache(2);
  cache.put(1, 1);
  cache.put(2, 2);
  console.log(cache.get(1)); // 1   (1 is now most recent)
  cache.put(3, 3); // evicts key 2 (least recently used)
  console.log(cache.get(2)); // -1  (evicted)
  cache.put(4, 4); // evicts key 1
  console.log(cache.get(1)); // -1
  console.log(cache.get(3)); // 3
  console.log(cache.get(4)); // 4
}
