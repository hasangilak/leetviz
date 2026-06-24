# Coin Change · #322 · Medium · *Unbounded Knapsack*

🔗 https://leetcode.com/problems/coin-change/

## Problem
Given coin denominations (unlimited supply) and a target `amount`, return the
**fewest coins** that sum to it, or `-1` if impossible.

```
coins=[1,2,5], amount=11  -> 3    (5 + 5 + 1)
coins=[2],     amount=3   -> -1   (odd amount from 2s is impossible)
```

## 🧐 In plain English
You have an endless pile of coins in a few fixed denominations and you owe an
exact `amount`. Hand it over using as **few coins as possible**. If no combination
of the available coins adds up to exactly that amount, return `-1`.

- **You're given:** an array `coins` of distinct denominations and an integer `amount`.
- **Return:** the minimum number of coins summing to `amount`, or `-1` if it can't be done.
- **Rules / guarantees:** each coin may be used **unlimited** times; `amount ≥ 0`.
- **Watch out for:** greedy (always grab the biggest coin) is **wrong** — e.g. coins `[1,3,4]`, amount `6`: greedy gives `4+1+1=3` coins, but `3+3=2` coins is better.

## The idea 💡 — build up from smaller amounts
Solve every amount from `0` up to the target, reusing smaller answers.

```
   ┌──────────────────────────────────────────────────────────┐
   │ STATE       dp[a] = fewest coins to make amount a           │
   │ RECURRENCE  try each coin c as the LAST coin:               │
   │             dp[a] = 1 + min( dp[a - c] )  over coins c ≤ a   │
   │ BASE        dp[0] = 0     (unreachable amounts stay ∞)      │
   └──────────────────────────────────────────────────────────┘
```

"Use coin `c` last" means the rest — `a - c` — was already solved optimally. Try
every coin and keep the smallest.

## 📊 Fill the table — `coins=[1,2,5]`, amount = 11
`∞` = not yet reachable. Each cell = `1 + min(dp[a-1], dp[a-2], dp[a-5])`:

```
 amount a:  0   1   2   3   4   5   6   7   8   9  10  11
 dp[a]:     0   1   1   2   2   1   2   2   3   3   2   3
                │           │       │               │
   dp[5]=1 (one 5)          dp[7]= 1+min(dp[6],dp[5],dp[2])
                            = 1+min(2,1,1) = 2  (5+2)
   dp[11]= 1+min(dp[10],dp[9],dp[6])
         = 1+min(2,3,2) = 3   →  5+5+1 ✅
```

Reading `dp[11] = 3`: the answer is **3 coins**.

## 🔁 Two flavours of this DP
| Goal | Combine with | This problem |
|------|--------------|--------------|
| **Min** coins | `min(...) + 1` | ← here |
| **Count** ways | `sum(...)` | [Coin Change II](../coin-change-ii) |

## Complexity
| | |
|---|---|
| **Time**  | `O(amount × #coins)` — fill each amount, try each coin |
| **Space** | `O(amount)` — the 1-D table |
