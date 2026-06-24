# Longest Repeating Character Replacement · #424 · Medium

🔗 https://leetcode.com/problems/longest-repeating-character-replacement/

## Problem
You may replace **at most `k`** characters with any uppercase letter. Return the
longest substring that can become a single repeated letter.

```
"ABAB", k=2     -> 4   (replace the two B's  → "AAAA")
"AABABBA", k=1  -> 4   (e.g. "AABA" → "AAAA")
```

## 🧐 In plain English
You get a string of uppercase letters and a budget `k`. You're allowed to change up to `k` characters into any other uppercase letters. After spending your budget however you like, what's the longest **substring** (contiguous run) that ends up being all the *same* letter? Return that length.

- **You're given:** a string `s` (uppercase A–Z) and an integer `k` (the max number of edits).
- **Return:** the *length* of the longest contiguous run you can make uniform using at most `k` replacements.
- **Rules / guarantees:** you don't actually have to perform the edits — just find the best achievable length; you may use fewer than `k` edits.
- **Watch out for:** within any window, the cheapest plan is to keep the most common letter and replace the rest, so the cost is `windowLength − (count of the most frequent letter)`.

## The idea 💡
Look at any window. To turn it into one repeated letter as cheaply as possible,
**keep the most frequent letter and replace everything else**:

```
   window:  A A B A B          length = 5
   counts:  A:3  B:2
            └─ keep A (the majority) ─┘
   replacements needed = windowLength − maxFreq = 5 − 3 = 2
```

The window is **valid** while `replacements needed ≤ k`. So slide:
- always **extend** the right edge,
- if the window goes invalid, **shrink** from the left,
- track the longest valid window.

```
            replacements = windowLen − maxFreq
                              │
            ≤ k  ──────────── valid ───────────▶  extend right, update best
            > k  ──────────── invalid ─────────▶  shrink left
```

## 🎬 Frame-by-frame — `"AABABBA"`, k = 1
`need = len − maxFreq` (chars we'd have to replace). Valid while `need ≤ 1`.

```
window        counts          len  maxFreq  need  ≤k?  best
────────────  ──────────────  ───  ───────  ────  ───  ────
[A]ABABBA     A:1              1      1       0    ✅    1
[AA]BABBA     A:2              2      2       0    ✅    2
[AAB]ABBA     A:2 B:1          3      2       1    ✅    3
[AABA]BBA     A:3 B:1          4      3       1    ✅    4  ★
[AABAB]BA     A:3 B:2          5      3       2    ❌   shrink →
 A[ABAB]BA    A:2 B:2          4      3*      1    ✅    4
 ...stays length 4...
──────────────────────────────────────────────────────────
                                          ANSWER = 4 ✅
```

## 🪄 The clever shortcut — never decrease `maxFreq`
Notice the `3*` above: even after shrinking, we **don't recompute** `maxFreq`
down to 2. Why is keeping a stale (too-large) `maxFreq` safe?

```
best only ever grows when a BIGGER maxFreq appears.
a stale maxFreq just makes `need = len − maxFreq` SMALLER,
  → the validity test is stricter, never looser,
  → it can never produce a wrong, larger answer.
```

So we skip the recompute entirely and stay clean `O(n)`. The window simply never
shrinks below the best length already found.

## Complexity
| | |
|---|---|
| **Time**  | `O(n)` — each edge advances ≤ n times; no inner recomputation |
| **Space** | `O(1)` — a fixed 26-letter count array |
