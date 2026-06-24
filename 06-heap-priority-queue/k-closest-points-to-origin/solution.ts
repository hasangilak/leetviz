/**
 * LeetCode #973 — K Closest Points to Origin (Medium)
 * https://leetcode.com/problems/k-closest-points-to-origin/
 *
 * Return the k points closest to the origin (0,0). Distance is Euclidean, but
 * since we only COMPARE distances we can skip the square root and use x²+y².
 */

/** Minimal binary heap; `less(a,b)` decides who floats to the root. */
class Heap<T> {
  private data: T[] = [];
  constructor(private readonly less: (a: T, b: T) => boolean) {}
  size(): number {
    return this.data.length;
  }
  push(value: T): void {
    this.data.push(value);
    let i = this.data.length - 1;
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (!this.less(this.data[i], this.data[p])) break;
      [this.data[i], this.data[p]] = [this.data[p], this.data[i]];
      i = p;
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

type Entry = { dist: number; point: number[] };

/**
 * Max-heap of size k (keep the k closest).
 *
 * Stream the points through a MAX-heap keyed by squared distance, capped at size
 * k. The root is the FARTHEST of the current candidates; whenever the heap
 * exceeds k, pop that farthest one. Whatever survives is the k closest.
 *
 * Keeping the heap at size k (instead of heaping all n) makes it O(n log k)
 * time and O(k) space — better than O(n log n) when k << n.
 *
 * Time:  O(n log k)
 * Space: O(k)
 */
export function kClosest(points: number[][], k: number): number[][] {
  const maxHeap = new Heap<Entry>((a, b) => a.dist > b.dist); // farthest at root

  for (const [x, y] of points) {
    maxHeap.push({ dist: x * x + y * y, point: [x, y] });
    if (maxHeap.size() > k) maxHeap.pop(); // evict the farthest
  }

  const result: number[][] = [];
  while (maxHeap.size() > 0) result.push(maxHeap.pop()!.point);
  return result;
}

if (require.main === module) {
  console.log(kClosest([[1, 3], [-2, 2]], 1)); // [[-2,2]]
  console.log(kClosest([[3, 3], [5, -1], [-2, 4]], 2)); // [[3,3],[-2,4]] (any order)
}
