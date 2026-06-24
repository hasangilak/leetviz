# Longest Common Subsequence · #1143 · Medium · *2-D String DP*

🔗 https://leetcode.com/problems/longest-common-subsequence/

## Problem
Return the **length** of the longest subsequence present in **both** strings.

```
"abcde", "ace" -> 3    ("ace")
"abc",   "def" -> 0
```

## 🧐 In plain English
A **subsequence** keeps order but may drop letters (so `"ace"` is a subsequence of
`"abcde"`). You're looking for the longest string of characters that appears — in
the same order, not necessarily adjacent — inside **both** inputs, and you report
its length.

- **You're given:** two strings `text1` and `text2`.
- **Return:** the length of their longest common subsequence (not the subsequence text).
- **Rules / guarantees:** characters must keep their relative order in both strings; they needn't be contiguous.
- **Watch out for:** subsequence ≠ substring — the common part can be scattered across each string (`"ace"` skips `b` and `d`).

## The idea 💡 — compare prefixes, char by char
Build a table over **prefixes** of the two strings.

```
   ┌──────────────────────────────────────────────────────────────┐
   │ STATE       dp[i][j] = LCS of text1[0..i) and text2[0..j)       │
   │ RECURRENCE  last chars MATCH  → dp[i][j] = dp[i-1][j-1] + 1     │
   │             last chars DIFFER → dp[i][j] = max(dp[i-1][j],      │
   │                                               dp[i][j-1])       │
   │ BASE        empty prefix → 0                                    │
   └──────────────────────────────────────────────────────────────┘
```

- **Match** → both prefixes end in the same char, so it joins the LCS: take the
  **diagonal** answer and add 1.
- **Differ** → at least one of those last chars isn't in the LCS, so drop it: take
  the better of "ignore text1's last char" (up) or "ignore text2's last" (left).

## 📊 Fill the table — `"abcde"` × `"ace"`
↖ = diagonal+1 on a match; otherwise max(↑, ←):

```
            ""   a    c    e
       ┌────────────────────────
   ""  │   0    0    0    0
    a  │   0    1↖   1    1
    b  │   0    1    1    1
    c  │   0    1    2↖   2
    d  │   0    1    2    2
    e  │   0    1    2    3↖   ★

   dp[5][3] = 3   →  the LCS is "ace" ✅
```

Follow the ↖ matches back from the corner: `e` (5,3) → `c` (3,2) → `a` (1,1) =
`"ace"`.

## 👪 This table is a DP workhorse
The exact same prefix-grid solves **Edit Distance**, **Shortest Common
Supersequence**, **Longest Common Substring**, and the diff algorithm behind
`git diff`.

## Complexity
| | |
|---|---|
| **Time**  | `O(m · n)` — fill each cell once |
| **Space** | `O(m · n)` (reducible to `O(min(m, n))` keeping just two rows) |
