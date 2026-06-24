# Merge Intervals · #56 · Medium

🔗 https://leetcode.com/problems/merge-intervals/

## Problem
Merge every set of overlapping intervals.

```
[[1,3],[2,6],[8,10],[15,18]] -> [[1,6],[8,10],[15,18]]
[[1,4],[4,5]]                -> [[1,5]]   (touching = overlapping)
```

## 🧐 In plain English
An **interval** is a range with a start and an end, written `[start, end]` — think of each as a stretch of time or a bar on a number line. Two intervals **overlap** if their ranges touch or cross (they share at least one point). Your job: combine any overlapping ranges into single larger ranges, and return the cleaned-up list.

- **You're given:** an array `intervals`, where each element is a pair `[start, end]`.
- **Return:** a list of intervals with all overlapping ones merged together.
- **Rules / guarantees:** intervals arrive in **no particular order**; just-touching intervals like `[1,4]` and `[4,5]` count as overlapping and merge into `[1,5]`.
- **Watch out for:** the input isn't sorted, so you usually sort by start first; a merged interval can absorb several originals in a row.

## 📏 See it on a number line
```
   0    2    4    6    8   10   12   14   16   18
   ·····|····|····|····|····|····|····|····|····|···
        ▓▓▓▓▓                                          [1,3]
          ▓▓▓▓▓▓▓▓▓                                    [2,6]   ← overlaps [1,3]
                          ▓▓▓▓                          [8,10]
                                            ▓▓▓▓▓▓▓     [15,18]

   merge overlaps ▼
        ▓▓▓▓▓▓▓▓▓▓▓                                    [1,6]
                          ▓▓▓▓                          [8,10]
                                            ▓▓▓▓▓▓▓     [15,18]
```

## The idea 💡
The enabling move is **sort by start time**. Once sorted, any intervals that
overlap become *adjacent*, so a single left-to-right sweep handles everything.

Keep the **last** interval in your output. For each next interval:

```
   last = [..,  e]        next = [s, ..]

   s ≤ e   ── OVERLAP ──▶   extend:  last.end = max(e, next.end)
   ────────────────────
        s   e
   ▓▓▓▓▓▓│                       ▓▓▓▓▓▓▓▓▓▓
        ▓▓▓▓▓        →  becomes
        └ overlap                  (one merged bar)

   s > e   ── GAP ──────▶   push next as a NEW interval
        e   s
   ▓▓▓▓▓│   ▓▓▓▓▓        →  two separate bars
```

Sorting guarantees `next.start ≥ last.start`, so you only ever compare against the
**single most recent** interval — never look further back.

## 🎬 Frame-by-frame — `[[1,3],[2,6],[8,10],[15,18]]`
```
sorted: [1,3] [2,6] [8,10] [15,18]

read [1,3]   → output: [[1,3]]
read [2,6]   2 ≤ 3 overlap → extend end to max(3,6)=6  → [[1,6]]
read [8,10]  8 > 6 gap     → push                       → [[1,6],[8,10]]
read [15,18] 15 > 10 gap   → push                       → [[1,6],[8,10],[15,18]] ✅
```

## Complexity
| | |
|---|---|
| **Time**  | `O(n log n)` — the sort dominates; the sweep is `O(n)` |
| **Space** | `O(n)` — the output (sorting may use `O(log n)`) |

> This **sort-then-sweep** template underlies most interval problems: insert
> interval, meeting rooms, non-overlapping intervals, etc.
