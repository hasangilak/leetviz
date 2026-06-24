# Valid Parentheses · #20 · Easy

🔗 https://leetcode.com/problems/valid-parentheses/

## Problem
Given a string containing only `()[]{}`, return `true` if every bracket is
closed by the **same type** in the **correct order**.

```
"()[]{}" -> true
"(]"     -> false
"([)]"   -> false   (closed in the wrong order)
"{[]}"   -> true
```

## 🧐 In plain English
You're handed a string made only of bracket characters: round `()`, square `[]`, and curly `{}`. Decide whether they're "balanced" — meaning every opening bracket has a matching closing bracket of the *same type*, and they're nested properly (you can't close `[` while a `(` opened more recently is still waiting). Return `true` if it's all valid, `false` otherwise.

- **You're given:** a string `s` containing only the characters `( ) [ ] { }`.
- **Return:** a boolean — `true` if the brackets are balanced and correctly ordered, else `false`.
- **Rules / guarantees:** every closer must match the *type* of the most recent unclosed opener; order matters, not just counts.
- **Watch out for:** `"([)]"` has equal counts of each bracket but is still invalid because the nesting crosses; an empty string counts as valid.

## The idea 💡
Nesting is **Last-In-First-Out**: the bracket you opened most recently must be
the first one you close. That's exactly a **stack**.

- See an **opener** → push it.
- See a **closer** → the top of the stack must be its matching opener. Pop and
  compare. Mismatch (or empty stack) → invalid.
- End → the stack must be empty (no dangling openers).

## Walkthrough
`"([)]"`:
```
'(' push        stack: (
'[' push        stack: ( [
')' closer, top is '[' ≠ '('  ->  ✋ return false
```

`"{[]}"`:
```
'{' push        stack: {
'[' push        stack: { [
']' top '[' matches, pop   stack: {
'}' top '{' matches, pop   stack: (empty)
end -> stack empty -> true ✅
```

## Complexity
| | |
|---|---|
| **Time**  | `O(n)` — one pass, O(1) stack ops |
| **Space** | `O(n)` — all-openers string keeps everything on the stack |
