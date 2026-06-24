# Word Break · #139 · Medium

🔗 https://leetcode.com/problems/word-break/

## Problem
Can `s` be cut into a sequence of **dictionary words** (each reusable)?

```
"leetcode",      ["leet","code"]                    -> true   ("leet" + "code")
"applepenapple", ["apple","pen"]                    -> true   ("apple"+"pen"+"apple")
"catsandog",     ["cats","dog","sand","and","cat"]  -> false
```

## 🧐 In plain English
Imagine the string has no spaces and you have a dictionary. Can you insert spaces
so that every resulting chunk is a real dictionary word, using the whole string
with nothing left over? You may reuse a word as many times as you like. Return
true/false — you don't need to output the actual split.

- **You're given:** a string `s` and a list `wordDict` of allowed words.
- **Return:** `true` if `s` can be fully segmented into dictionary words, else `false`.
- **Rules / guarantees:** words may be reused; the entire string must be covered (no leftovers).
- **Watch out for:** greedily grabbing the first word that fits can fail — `"catsandog"` matches `"cats"` early but then strands `"andog"`. You must consider all split points.

## The idea 💡 — "is this prefix breakable?"
Solve increasingly long **prefixes** of `s`.

```
   ┌──────────────────────────────────────────────────────────────┐
   │ STATE       dp[i] = can s[0..i) be fully segmented?            │
   │ RECURRENCE  dp[i] = true  if some j < i has                    │
   │                     dp[j] == true   AND   s[j..i) ∈ dictionary │
   │ BASE        dp[0] = true   (empty prefix)                      │
   │ ANSWER      dp[n]                                              │
   └──────────────────────────────────────────────────────────────┘
```

To check prefix length `i`, try every split `j`: if the left part `s[0..j)` is
already breakable **and** the right part `s[j..i)` is a single word, then `s[0..i)`
is breakable too.

## 📊 Fill the table — `"leetcode"`, dict {"leet","code"}
`dp[i]` = is the prefix of length `i` segmentable?

```
   prefix:   ""  l  le  lee leet leetc ... leetcode
   i:         0  1   2   3    4     5  ...      8
   dp:        T  F   F   F    T     F   F  F    T
              │                │                │
   dp[0]=T (base)              │                │
   dp[4]=T: dp[0]=T & "leet"∈dict ✓             │
   dp[8]=T: dp[4]=T & "code"∈dict ✓  ───────────┘

   dp[8] = true  →  "leet" + "code" ✅
```

For `"catsandog"`, `dp` reaches `"catsand"` (cat+s..., cats+and) but no word
finishes the `"og"` tail, so `dp[9] = false`.

## Complexity
| | |
|---|---|
| **Time**  | `O(n² · L)` — n end points × n split points × substring/lookup cost L |
| **Space** | `O(n)` for `dp` (+ the dictionary set) |

> The same prefix-DP, but **counting** or **listing** the segmentations, is
> **Word Break II (#140)** — there you memoize the actual sentences.
