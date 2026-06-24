# Insert Interval · #57 · Medium

🔗 https://leetcode.com/problems/insert-interval/

## Problem
Insert `newInterval` into an already-sorted, non-overlapping list, merging as
needed.

```
[[1,3],[6,9]], insert [2,5]                       -> [[1,5],[6,9]]
[[1,2],[3,5],[6,7],[8,10],[12,16]], insert [4,8]  -> [[1,2],[3,10],[12,16]]
```

## 🧐 In plain English
An **interval** is a range `[start, end]`. You start with a list of intervals that is already sorted by start and has no overlaps. Drop one new interval into that list, then merge it with any intervals it touches or crosses, so the result is still sorted and overlap-free.

- **You're given:** a sorted, non-overlapping array `intervals` and a single `newInterval` `[start, end]`.
- **Return:** the updated list of intervals after inserting and merging.
- **Rules / guarantees:** the existing list is already in order and disjoint, so **no sorting is needed**; the new interval may overlap zero, one, or several existing intervals.
- **Watch out for:** intervals before and after the new one's reach are copied unchanged — only the ones it actually touches get merged into it.

## 📏 The three zones
Because the input is **already sorted and disjoint**, the new interval splits the
list into three contiguous zones — no sorting needed:

```
   0    2    4    6    8   10   12   14   16
   ·····|····|····|····|····|····|····|····|···
     ▓▓                                            [1,2]    ┐ BEFORE  (copy as-is)
            ▓▓▓                                     [3,5]    ┐
                  ▓                                 [6,7]    │ OVERLAP (merge into new)
                     ▓▓▓                            [8,10]   ┘
                                  ▓▓▓▓▓             [12,16]  ┐ AFTER   (copy as-is)

           ░░░░░░░░░                                [4,8]    ← newInterval
   ────────────────────────────────────────────────────────
     ▓▓    ▓▓▓▓▓▓▓▓▓▓▓                  ▓▓▓▓▓        result
     [1,2]   [3,10]  (3,5∪4,8∪6,7∪8,10) [12,16]
```

## The idea 💡 — one linear pass, three phases
```
   [ BEFORE … ]   [ OVERLAP … ]   [ AFTER … ]
      copy          absorb           copy
   end < newStart  start ≤ newEnd   start > newEnd
```

1. **Before** — intervals ending before `newStart` can't touch it → copy.
2. **Overlap** — while an interval starts at/before `newEnd`, it touches the new
   one → widen `newStart`/`newEnd` to swallow it. Push the grown interval after.
3. **After** — everything left starts beyond `newEnd` → copy.

## 🎬 Frame-by-frame — insert `[4,8]`
```
phase 1  BEFORE (end < 4):
   [1,2]  end 2 < 4  → copy            result: [[1,2]]

phase 2  OVERLAP (start ≤ 8), grow new = [4,8]:
   [3,5]  3 ≤ 8  → new = [min(4,3), max(8,5)] = [3,8]
   [6,7]  6 ≤ 8  → new = [3,8]
   [8,10] 8 ≤ 8  → new = [3, max(8,10)] = [3,10]
   push new                            result: [[1,2],[3,10]]

phase 3  AFTER (rest):
   [12,16] → copy                      result: [[1,2],[3,10],[12,16]] ✅
```

## Complexity
| | |
|---|---|
| **Time**  | `O(n)` — single pass, **no sort** (input is pre-sorted) |
| **Space** | `O(n)` — the output |

> Contrast with **Merge Intervals (#56)**, which must sort first (`O(n log n)`)
> because its input isn't already ordered.
