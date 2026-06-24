# Daily Temperatures · #739 · Medium · *Monotonic Stack*

🔗 https://leetcode.com/problems/daily-temperatures/

## Problem
Given daily temperatures, return an array where `answer[i]` = the number of days
you must wait after day `i` for a **warmer** temperature. If none, use `0`.

```
[73,74,75,71,69,72,76,73] -> [1,1,4,2,1,1,0,0]
```

## 🧐 In plain English
You get a list of daily temperatures in order. For each day, you want to know: how many days do I have to wait until it gets warmer than today? You build a new list of the same length where each spot holds that waiting count (the number of days forward, not the future temperature). If no later day is ever warmer, put `0` for that day.

- **You're given:** an array `temperatures` of integers, one per day in chronological order.
- **Return:** an array `answer` of the same length where `answer[i]` is the count of days to wait after day `i` until a strictly warmer day; `0` if none exists.
- **Rules / guarantees:** "warmer" means strictly greater; the answer is a *gap* (`futureIndex - i`), not a temperature.
- **Watch out for:** the warmer day must come *after* day `i`, and equal temperatures don't count as warmer. The last day (and any day with no warmer future) is always `0`.

## The idea 💡
Brute force checks every later day for each day — `O(n²)`. The **monotonic
stack** pattern does it in one pass.

Keep a stack of **indices whose temperatures are still waiting** for something
warmer, kept in *decreasing* temperature order. When a new day is warmer than
the day on top of the stack, that new day is exactly the answer for the popped
day. Keep resolving (popping) until the new day is no longer warmer, then push
it to wait its turn.

> **Monotonic stack** = a stack you maintain in sorted (here: decreasing) order,
> used to find the "next greater / next smaller" element in O(n).

## Walkthrough
`[73, 74, 75, 71, 69, 72, 76, 73]` (stack holds indices)

```
day 0 (73)  stack empty            push 0           stack:[0]
day 1 (74)  74>73 -> ans[0]=1-0=1  pop0, push1      stack:[1]
day 2 (75)  75>74 -> ans[1]=2-1=1  pop1, push2      stack:[2]
day 3 (71)  71<75                  push3            stack:[2,3]
day 4 (69)  69<71                  push4            stack:[2,3,4]
day 5 (72)  72>69 ans[4]=1; 72>71 ans[3]=2; 72<75   push5  stack:[2,5]
day 6 (76)  76>72 ans[5]=1; 76>75 ans[2]=4          push6  stack:[6]
day 7 (73)  73<76                  push7            stack:[6,7]
leftover 6,7 -> ans stays 0
```

Result: `[1,1,4,2,1,1,0,0]` ✅

## Why is it O(n) and not O(n²)?
Look at the nested `while` and think it's quadratic — but **each index is pushed
once and popped at most once**. Total push+pop work is `2n`, so the whole thing
is linear (amortized analysis).

## Complexity
| | |
|---|---|
| **Time**  | `O(n)` amortized |
| **Space** | `O(n)` — the index stack + answer array |
