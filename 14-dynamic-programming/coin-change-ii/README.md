# Coin Change II · #518 · Medium · *Counting Knapsack*

🔗 https://leetcode.com/problems/coin-change-ii/

## Problem
Count the **distinct combinations** of coins (unlimited supply) that sum to
`amount`. Order doesn't matter.

```
amount=5, coins=[1,2,5] -> 4    (5 ; 2+2+1 ; 2+1+1+1 ; 1+1+1+1+1)
amount=3, coins=[2]     -> 0
```

## 🧐 In plain English
Same coins-and-amount setup as [Coin Change](../coin-change), but now you're not
minimizing — you're **counting how many different ways** the coins can add up to
the amount. Two ways are "the same" if they use the same multiset of coins, so
`1+2` and `2+1` count once, not twice.

- **You're given:** an integer `amount` and an array `coins` of denominations.
- **Return:** the number of distinct combinations (unordered) summing to `amount`.
- **Rules / guarantees:** unlimited coins of each type; `1+2` and `2+1` are the **same** combination.
- **Watch out for:** `amount = 0` has exactly **one** combination — the empty one — so the answer is `1`, not `0`.

## The idea 💡 — and why loop order matters
We count by adding coins **one denomination at a time**.

```
   ┌──────────────────────────────────────────────────────────────┐
   │ STATE       dp[a] = # of combinations summing to amount a       │
   │ RECURRENCE  for each coin, for a = coin..amount:                │
   │                 dp[a] += dp[a - coin]                          │
   │ BASE        dp[0] = 1   (one way to make 0: pick nothing)      │
   └──────────────────────────────────────────────────────────────┘
```

🔑 **Coins on the OUTSIDE, amount on the inside.** This pins down an order in
which coins are *considered*, so each unordered combination is built exactly once.
(Swap the loops — amount outside — and you'd count **permutations** instead, the
answer to a different problem, [Combination Sum IV #377].)

## 📊 Fill the table — `amount=5`, coins `[1, 2, 5]`
Start `dp = [1,0,0,0,0,0]`, then fold in one coin at a time:

```
   amount a:        0   1   2   3   4   5
   ───────────────  ─   ─   ─   ─   ─   ─
   start            1   0   0   0   0   0
   after coin 1     1   1   1   1   1   1     (only 1s: one way each)
   after coin 2     1   1   2   2   3   3     dp[4]+=dp[2]→3, dp[5]+=dp[3]→3
   after coin 5     1   1   2   2   3   4 ★   dp[5]+=dp[0]=1 → 4

   dp[5] = 4 ✅
```

Reading the final row: `4` ways to make 5 — exactly `{5}, {2,2,1}, {2,1,1,1},
{1,1,1,1,1}`.

## 🔁 The knapsack family
| Problem | min / count | loop order |
|---------|-------------|-----------|
| [Coin Change](../coin-change) | **min** coins | either |
| Coin Change II (here) | **count** combos | coins outer |
| Combination Sum IV (#377) | count *sequences* | amount outer |

## Complexity
| | |
|---|---|
| **Time**  | `O(amount × #coins)` |
| **Space** | `O(amount)` — the 1-D table |
