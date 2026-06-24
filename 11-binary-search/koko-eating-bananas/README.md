# Koko Eating Bananas · #875 · Medium

🔗 https://leetcode.com/problems/koko-eating-bananas/

## Problem
Koko eats `k` bananas/hour. Each hour she picks one pile; if it has fewer than
`k`, she eats it and waits out the hour. Find the **smallest integer `k`** that
clears all piles within `h` hours.

```
piles = [3,6,7,11], h = 8  ->  4
```

## 🧐 In plain English
There are several piles of bananas. Koko eats at a fixed speed of `k` bananas per hour. Each hour she sits at exactly one pile and eats up to `k` bananas from it; if that pile has fewer than `k` left, she finishes it and just relaxes for the rest of that hour (she won't start another pile until the next hour). Given a deadline of `h` hours, find the *slowest* whole-number speed `k` that still lets her finish every pile in time.

- **You're given:** an array `piles` (bananas in each pile) and an integer `h` (hours available).
- **Return:** the smallest integer `k` (bananas/hour) such that she clears all piles within `h` hours.
- **Rules / guarantees:** `k` must be a positive integer; `h` is at least the number of piles, so an answer always exists; one pile per hour, never two at once.
- **Watch out for:** hours for a pile is rounded *up* — a pile of `7` at `k = 4` takes `⌈7/4⌉ = 2` hours, not `1.75`. Faster `k` always means equal-or-fewer hours, which is what makes the search work.

## 💡 The leap: binary-search the *answer*, not an index
The thing we're searching for isn't a position in an array — it's the **eating
speed** `k`. The trick is that hours-needed is **monotonic** in speed:

```
   hoursNeeded(k) = Σ ceil(pile / k)        // total hours at speed k

   slower  ◀──────────────  speed k  ──────────────▶  faster
   more hours                                         fewer hours
```

So the predicate `feasible(k) = hoursNeeded(k) ≤ h` looks like a **step
function** — all "no" then all "yes" — and we binary-search the boundary:

```
   k:          1    2    3    4    5    6   ...  11
   feasible:   ✗    ✗    ✗    ✓    ✓    ✓   ...   ✓
                         ▲    ▲
                      last✗  first✓  ← THIS is the answer (smallest feasible k)
```

Search range = `[1 .. max(pile)]` (eating faster than the biggest pile is
pointless — one pile per hour is the cap).

## 🎬 Frame-by-frame — `[3,6,7,11]`, h = 8
`hours(k) = ⌈3/k⌉+⌈6/k⌉+⌈7/k⌉+⌈11/k⌉`

```
range          mid  hours(mid)              ≤ 8?   move
─────────────  ───  ──────────────────────  ─────  ─────────────
[1 .. 11]       6   1+1+2+2 = 6             ✅     feasible → try slower: hi=6
[1 ..  6]       3   1+2+3+4 = 10            ❌     too slow  → lo=4
[4 ..  6]       5   1+2+2+3 = 8             ✅     feasible → hi=5
[4 ..  5]       4   1+2+2+3 = 8             ✅     feasible → hi=4
[4 ..  4]       lo == hi  →  k = 4 ✅
```

> At `k=4`: pile 11 takes ⌈11/4⌉ = 3 hours, pile 7 takes 2, piles 6 & 3 take 2 & 1
> → 8 hours total, exactly within budget.

## When to reach for "binary search on the answer"
Whenever you can (a) **guess** an answer, (b) **cheaply test** if it works, and
(c) the test is **monotonic** (once true, stays true). Then bisect the guess
space instead of brute-forcing it.

## Complexity
| | |
|---|---|
| **Time**  | `O(n log M)` — `M = max(piles)`; each feasibility check is `O(n)` |
| **Space** | `O(1)` |
