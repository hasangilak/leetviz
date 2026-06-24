# Longest Substring Without Repeating Characters · #3 · Medium

🔗 https://leetcode.com/problems/longest-substring-without-repeating-characters/

## Problem
Length of the longest **contiguous** substring with all-distinct characters.

```
"abcabcbb" -> 3   ("abc")
"bbbbb"    -> 1   ("b")
"pwwkew"   -> 3   ("wke")
```

## 🧐 In plain English
A **substring** is a run of characters that are next to each other in the string (no gaps) — unlike a *subsequence*, you can't skip characters. Scan the string for the longest such run in which every character is different (no letter repeats inside that run), and report how long it is.

- **You're given:** a string `s`.
- **Return:** the *length* (a number) of the longest contiguous substring with all-distinct characters — not the substring itself.
- **Rules / guarantees:** characters must be consecutive; an empty string returns `0`.
- **Watch out for:** "substring" means contiguous (`"pwke"` is not valid for `"pwwkew"` because the chars aren't adjacent); the answer is a length, so don't return the text.

## The idea 💡 — sliding window
Keep a window `[start … i]` that is **always** duplicate-free. Slide the right
edge `i` forward one char at a time:

```
   ┌─ window ─┐
 . . a b c . . . .          new char fits  → window just GREW  ✅
       ▲     ▲
     start   i

   ┌─ window ─┐
 . a b c a . . . .          new char 'a' already inside
     ▲     ▲                → jump `start` to just AFTER the old 'a'
   start   i                  (evicts the duplicate in one move)
```

The map stores each char's **last index**, so `start` can *leap* instead of
crawling forward one step at a time.

## 🎬 Frame-by-frame — `"pwwkew"`
Window shown in `[ ]`; `len` = current window length; `best` = answer so far.

```
i  char  action                              window      len  best
─  ────  ──────────────────────────────────  ──────────  ───  ────
0  p     add p                               [p]wwkew      1    1
1  w     add w                               [pw]wkew      2    2
2  w     dup! old w at idx1 ≥ start0         p[w]kew       1    2
         → start jumps to 2
3  k     add k                               p[wk]ew       2    2
4  e     add e                               p[wke]w       3    3  ★ longest
5  w     dup! old w at idx2 ≥ start3? 2<3    p w[kew]      3    3
         old w is BEFORE the window → no jump, just extend
─────────────────────────────────────────────────────────────────
                                                    ANSWER = 3 ✅
```

## ⚠️ The `prev >= start` guard
A character may have been seen *before the window began* (already evicted). We
only jump `start` when the previous occurrence is **inside** the current window:

```
   p  w  [k  e  w]          the duplicate 'w' at index 2 is LEFT of start(3)
         ▲       ▲          → it's stale, ignore it (don't move start backwards!)
       start     i
```

Without this check, `start` could jump *backwards* and corrupt the window.

## Complexity
| | |
|---|---|
| **Time**  | `O(n)` — `i` and `start` each only ever move forward (≤ n steps total) |
| **Space** | `O(min(n, Σ))` — Σ = alphabet size (≤ 128 ASCII / 26 letters) |
