/**
 * LeetCode #1046 — Last Stone Weight (Easy)
 * https://leetcode.com/problems/last-stone-weight/
 *
 * Each turn, smash the two heaviest stones together:
 *   equal weights  -> both destroyed.
 *   different      -> the heavier becomes (heavier - lighter).
 * Return the weight of the last remaining stone (0 if none remain).
 */

/** Minimal binary heap; `less(a,b)` decides who floats to the root. */
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
    let i = this.data.length - 1;
    while (i > 0) {
      const parent = (i - 1) >> 1;
      if (!this.less(this.data[i], this.data[parent])) break;
      [this.data[i], this.data[parent]] = [this.data[parent], this.data[i]];
      i = parent;
    }
  }
  pop(): T | undefined {
    const top = this.data[0];
    const last = this.data.pop();
    if (last !== undefined && this.data.length > 0) {
      this.data[0] = last;
      let i = 0;
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
    return top;
  }
}

/**
 * Max-heap simulation.
 *
 * We repeatedly need the two LARGEST stones, so a MAX-heap is the right tool
 * (root = current heaviest, in O(1); push/pop in O(log n)). Pop the top two,
 * push back their difference if non-zero, and repeat until 0 or 1 stones remain.
 *
 * Time:  O(n log n) — up to n smashes, each doing O(log n) heap work.
 * Space: O(n) — the heap.
 */
export function lastStoneWeight(stones: number[]): number {
  const maxHeap = new Heap<number>((a, b) => a > b); // a > b => max-heap
  for (const s of stones) maxHeap.push(s);

  while (maxHeap.size() > 1) {
    const heaviest = maxHeap.pop()!;
    const next = maxHeap.pop()!;
    if (heaviest !== next) {
      maxHeap.push(heaviest - next); // survivor goes back in
    }
  }

  return maxHeap.size() === 1 ? maxHeap.peek()! : 0;
}

if (require.main === module) {
  console.log(lastStoneWeight([2, 7, 4, 1, 8, 1])); // 1
  console.log(lastStoneWeight([1])); // 1
  console.log(lastStoneWeight([2, 2])); // 0
}
