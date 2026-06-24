# Edit Distance · #72 · Hard · *2-D DP must-know*

🔗 https://leetcode.com/problems/edit-distance/

## Problem
Fewest single-character edits — **insert**, **delete**, or **replace** — to turn
`word1` into `word2` (a.k.a. *Levenshtein distance*).

```
"horse" -> "ros"          : 3
"intention" -> "execution": 5
```

## 🧐 In plain English
You want to transform the first word into the second. Each "edit" changes one
letter: **insert** a letter, **delete** a letter, or **replace** a letter with
another. Find the minimum number of such edits needed. (This is what spell
checkers and `git diff` use under the hood.)

- **You're given:** two strings `word1` and `word2`.
- **Return:** the minimum number of insert/delete/replace operations to make them equal.
- **Rules / guarantees:** each operation changes exactly one character and costs 1; either word may be empty.
- **Watch out for:** matching characters are **free** — don't spend an edit when the current letters already agree.

## The idea 💡 — three choices when letters differ
Work over prefixes. To convert `word1[0..i)` into `word2[0..j)`, look at the last
character of each:

```
   ┌──────────────────────────────────────────────────────────────┐
   │ STATE       dp[i][j] = edits to make word1[0..i) == word2[0..j) │
   │ MATCH       dp[i][j] = dp[i-1][j-1]                  (free)      │
   │ DIFFER      dp[i][j] = 1 + min(                                 │
   │                dp[i-1][j],     ← delete from word1              │
   │                dp[i][j-1],     ← insert into word1              │
   │                dp[i-1][j-1] )  ← replace one char               │
   │ BASE        dp[i][0]=i (delete all),  dp[0][j]=j (insert all)   │
   └──────────────────────────────────────────────────────────────┘
```

The three neighbours map exactly to the three operations:
```
   dp[i-1][j-1]  ↖ replace      dp[i-1][j]  ↑ delete
   dp[i][j-1]    ← insert
```

## 📊 Fill the table — `"horse"` → `"ros"`
Base row/col = "edits against the empty string". `↖`=match (copy diagonal):

```
            ""   r    o    s
       ┌────────────────────────
   ""  │   0    1    2    3
    h  │   1    1    2    3
    o  │   2    2    1↖   2
    r  │   3    2↖   2    2
    s  │   4    3    3    2↖
    e  │   5    4    4    3      ★

   dp[5][3] = 3
```

The optimal 3 edits: `horse → rorse` (replace h→r) `→ rose` (delete r) `→ ros`
(delete e).

## Complexity
| | |
|---|---|
| **Time**  | `O(m · n)` — one min-of-three per cell |
| **Space** | `O(m · n)` (reducible to `O(min(m, n))` with two rows) |

> Edit Distance is the [Longest Common Subsequence](../longest-common-subsequence)
> grid with two extra moves (insert/delete) and a cost on mismatches — same DNA.
