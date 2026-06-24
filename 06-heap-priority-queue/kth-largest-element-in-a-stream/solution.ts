/**
 * LeetCode #703 — Kth Largest Element in a Stream (Easy)
 * https://leetcode.com/problems/kth-largest-element-in-a-stream/
 *
 * Design a class that, as numbers stream in, always reports the k-th LARGEST
 * element seen so far.
 */

/**
 * A minimal binary heap. `less(a, b)` defines priority: the element for which
 * `less` is "most true" sits at the root. Pass a < b for a MIN-heap.
 */
class Heap<T> {
  private data: T[] = [];
  constructor(private readonly less: (a: T, b: T) => boolean) {}

  size(): number {
    return this.data.length;
  }

  peek(): T | undefined {
    return this.data[0];
  }

  push(value: T): void {
    this.data.push(value);
    this.bubbleUp(this.data.length - 1);
  }

  pop(): T | undefined {
    const top = this.data[0];
    const last = this.data.pop();
    if (last !== undefined && this.data.length > 0) {
      this.data[0] = last;
      this.bubbleDown(0);
    }
    return top;
  }

  private bubbleUp(i: number): void {
    while (i > 0) {
      const parent = (i - 1) >> 1;
      if (!this.less(this.data[i], this.data[parent])) break;
      [this.data[i], this.data[parent]] = [this.data[parent], this.data[i]];
      i = parent;
    }
  }

  private bubbleDown(i: number): void {
    const n = this.data.length;
    while (true) {
      let best = i;
      const l = 2 * i + 1;
      const r = 2 * i + 2;
      if (l < n && this.less(this.data[l], this.data[best])) best = l;
      if (r < n && this.less(this.data[r], this.data[best])) best = r;
      if (best === i) break;
      [this.data[i], this.data[best]] = [this.data[best], this.data[i]];
      i = best;
    }
  }
}

/**
 * Keep a MIN-heap holding only the k largest values seen so far.
 *
 * Why a min-heap (not max)? We want the k-th largest. If we keep exactly the top
 * k values, the SMALLEST of those k IS the k-th largest — and a min-heap puts
 * that smallest at the root, readable in O(1). Whenever the heap grows past k,
 * pop the root (the current smallest of the top-k), discarding values that can
 * never be the k-th largest.
 *
 * add():  O(log k)
 * Space:  O(k)
 */
export class KthLargest {
  private readonly heap = new Heap<number>((a, b) => a < b); // min-heap
  private readonly k: number;

  constructor(k: number, nums: number[]) {
    this.k = k;
    for (const n of nums) this.add(n);
  }

  add(val: number): number {
    this.heap.push(val);
    if (this.heap.size() > this.k) this.heap.pop(); // drop smallest beyond top-k
    return this.heap.peek()!; // root = k-th largest
  }
}

if (require.main === module) {
  const kth = new KthLargest(3, [4, 5, 8, 2]);
  console.log(kth.add(3)); // 4  (stream sorted desc: 8,5,4 -> 3rd = 4)
  console.log(kth.add(5)); // 5
  console.log(kth.add(10)); // 5
  console.log(kth.add(9)); // 8
  console.log(kth.add(4)); // 8
}
