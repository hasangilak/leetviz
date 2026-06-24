# House Robber · #198 · Medium

🔗 https://leetcode.com/problems/house-robber/

## Problem
Houses in a row hold money. You **can't rob two adjacent houses** (their alarms
are linked). Maximize the total you rob.

```
[1, 2, 3, 1]    -> 4    (rob house 0 and 2: 1 + 3)
[2, 7, 9, 3, 1] -> 12   (rob house 0, 2, 4: 2 + 9 + 1)
```

## 🧐 In plain English
You're walking down a street of houses, each with a known stash of cash. If you
rob two *next-door* houses, the alarm goes off — so any two houses you rob must
have at least one un-robbed house between them. Pick the set of non-adjacent
houses that gives you the most money, and return that amount.

- **You're given:** an array `nums` where `nums[i]` is the money in house `i`.
- **Return:** the maximum total money you can rob.
- **Rules / guarantees:** you may not rob two adjacent houses; values are ≥ 0.
- **Watch out for:** "no two adjacent" doesn't mean "every other house" — sometimes skipping *two* in a row is better (see `[2,1,1,2]` → rob the ends = 4).

## The idea 💡 — a decision at every house
This is the classic **"take it or leave it"** DP. Stand at house `i` and ask:

```
   ┌─────────────────────────────────────────────────────────┐
   │ STATE       best(i) = most money using houses 0..i        │
   │ RECURRENCE  ROB  i → nums[i] + best(i-2)  (skip neighbour) │
   │             SKIP i → best(i-1)                            │
   │             best(i) = max(ROB, SKIP)                      │
   │ BASE        best before the street = 0                    │
   └─────────────────────────────────────────────────────────┘
```

If you rob house `i`, you must have skipped `i-1`, so you build on `best(i-2)`.
If you skip `i`, you simply inherit `best(i-1)`.

## 📊 Build the table — `[2, 7, 9, 3, 1]`
`take = twoBack + money`, `skip = oneBack`, `best = max(take, skip)`:

```
 i  money   take = 2-back + money     skip = 1-back    best
 ─  ─────   ──────────────────────    ─────────────    ────
 0    2     0 + 2  =  2               0                 2
 1    7     0 + 7  =  7               2                 7
 2    9     2 + 9  = 11               7                11
 3    3     7 + 3  = 10              11                11
 4    1    11 + 1  = 12              11                12   ★ answer
                                                       └ rob houses 0,2,4 = 2+9+1
```

Watch the rolling variables shadow the array: at each house we only ever reach
**one or two houses back**.

## Complexity
| | |
|---|---|
| **Time**  | `O(n)` — one decision per house |
| **Space** | `O(1)` — two rolling variables |

> **House Robber II (#213)** arranges the houses in a **circle** (first and last
> are now adjacent). Trick: run this twice — once excluding house 0, once
> excluding the last — and take the max.
