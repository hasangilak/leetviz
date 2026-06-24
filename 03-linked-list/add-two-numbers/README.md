# Add Two Numbers · #2 · Medium

🔗 https://leetcode.com/problems/add-two-numbers/

## Problem
Two non-negative integers are stored as linked lists, **least-significant digit
first**. Return their sum in the same format.

```
(2 → 4 → 3) + (5 → 6 → 4)  =  (7 → 0 → 8)        // 342 + 465 = 807
(9 → 9 → 9) + (1)          =  (0 → 0 → 0 → 1)    // 999 + 1 = 1000
```

## 🧐 In plain English
A *linked list* is a chain of nodes, each holding one digit. Here each list represents a whole number, but the digits are stored backwards — the *ones* digit is the first node, then tens, then hundreds. So `2 → 4 → 3` means the number 342. You add the two numbers and give the answer back as a linked list in the same digit-reversed format.

- **You're given:** `l1` and `l2`, two non-empty linked lists where each node is a single digit (0–9), stored least-significant digit first.
- **Return:** the head of a linked list (same backwards format) holding the sum of the two numbers.
- **Rules / guarantees:** numbers are non-negative; no extra leading zeros (except the number 0 itself).
- **Watch out for:** the two lists can differ in length, and a final *carry* (like 999 + 1) needs an extra node at the end.

## 💡 Reverse order = grade-school addition
Because the **ones digit comes first**, traversing left-to-right is exactly how
you add on paper — start at the ones column and carry leftward:

```
        3 4 2            list1:  2 → 4 → 3      (read bottom-up = 342)
      + 4 6 5            list2:  5 → 6 → 4      (read bottom-up = 465)
      ───────
        8 0 7            result: 7 → 0 → 8
        ▲ ▲ ▲
        │ │ └ ones:  2+5     = 7,  carry 0
        │ └── tens:  4+6     = 10 → digit 0, carry 1
        └──── hundreds: 3+4+1(carry) = 8, carry 0
```

```
   loop while  l1 has digits  OR  l2 has digits  OR  carry ≠ 0:
       sum   = (l1 digit ?? 0) + (l2 digit ?? 0) + carry
       digit = sum % 10        ← append as a new node
       carry = sum ÷ 10        ← 0 or 1
```

## 🎬 Frame-by-frame — `999 + 1`
The `carry ≠ 0` loop condition is what grows the extra leading digit:

```
pos  l1  l2  carry  sum  digit  carry'   result so far
───  ──  ──  ─────  ───  ─────  ──────   ─────────────
 0    9   1    0     10    0      1        0
 1    9   ·    1     10    0      1        0 → 0
 2    9   ·    1     10    0      1        0 → 0 → 0
 3    ·   ·    1      1    1      0        0 → 0 → 0 → 1   ← carry created this node
                                          ANSWER 0→0→0→1 ✅
```

## 🛟 Two bug-savers
```
   carry ≠ 0 in the loop  →  catches a final carry (999+1 needs a new node)
   (l?.val ?? 0)          →  lets different-length lists add cleanly
```
A **dummy head** keeps the append uniform: always `tail.next = node`, return
`dummy.next`.

## Complexity
| | |
|---|---|
| **Time**  | `O(max(n, m))` — one pass over the longer list |
| **Space** | `O(max(n, m))` — the result list (+1 for a possible carry) |
