# K Closest Points to Origin · #973 · Medium

🔗 https://leetcode.com/problems/k-closest-points-to-origin/

## Problem
Given points on a plane, return the `k` closest to the origin `(0,0)`. Any order.

```
points = [[1,3],[-2,2]], k = 1  ->  [[-2,2]]
```

## 🧐 In plain English
You're given a bunch of points on a 2-D grid and asked for the `k` of them that sit nearest to the center `(0,0)`. "Nearest" is measured by **Euclidean distance** — the straight-line distance, computed as `√(x² + y²)` for a point `(x, y)`. So you sort the points by how far they are from the origin and hand back the closest `k`.

- **You're given:** an array `points` where each element is a pair `[x, y]`, and an integer `k`.
- **Return:** the `k` points closest to the origin, as an array of `[x, y]` pairs — in **any order**.
- **Rules / guarantees:** the answer is unique (no ties to break), and `k` is at most the number of points.
- **Watch out for:** you only need *which* points are closest, not their distances — and you can compare `x² + y²` directly without the square root, since it gives the same ordering and avoids float rounding.

## Two warm-up insights
1. **Skip the square root.** Euclidean distance is `√(x²+y²)`, but `√` is
   monotonic — comparing `x²+y²` gives the same ordering, with no float error.
2. We need the *k smallest* distances. Sorting everything is `O(n log n)`; a
   size-capped heap does better when `k` is small.

## The idea 💡 (max-heap of size k)
Keep a **max-heap of at most k** points, keyed by squared distance. The root is
the **farthest** current candidate. For each new point:

1. push it,
2. if the heap exceeds `k`, pop the root — that's the farthest, so it's safe to
   discard.

After processing all points, the heap holds exactly the **k closest**.

> "Closest" but a **max**-heap? Yes: to *keep the smallest k*, you must be able
> to throw away the **largest** of your current keepers — so the largest must be
> instantly available, i.e. at a max-heap's root.

## Walkthrough
`[[3,3],[5,-1],[-2,4]]`, `k=2`  (distances²: 18, 26, 20)
```
push (18)            heap: {18}
push (26)            heap: {26,18}            size 2 ok
push (20)            heap: {26,20,18} size 3>2 -> pop 26  heap: {20,18}
result = points with dist² 18 and 20 = [3,3] and [-2,4] ✅  (26 discarded)
```

## Complexity
| | |
|---|---|
| **Time**  | `O(n log k)` — n pushes/pops on a size-k heap |
| **Space** | `O(k)` — heap holds at most k points |

> Alternatives: heap **all** points then pop k → `O(n log n)`. **Quickselect**
> → `O(n)` average, `O(n²)` worst, in place but unstable.
