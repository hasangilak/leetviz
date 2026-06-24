/**
 * LeetCode #20 — Valid Parentheses (Easy)
 * https://leetcode.com/problems/valid-parentheses/
 *
 * Given a string of just ()[]{} characters, decide whether every bracket is
 * closed by the SAME type and in the CORRECT order.
 */

/**
 * Stack of open brackets.
 *
 * Brackets nest like a stack: the most recently opened bracket must be the next
 * one closed (LIFO). So push every opener; on a closer, the top of the stack
 * must be its matching opener — otherwise it's invalid. A valid string leaves
 * the stack empty.
 *
 * Time:  O(n)
 * Space: O(n) — worst case "(((((((" pushes everything.
 */
export function isValid(s: string): boolean {
  const closerToOpener: Record<string, string> = { ')': '(', ']': '[', '}': '{' };
  const stack: string[] = [];

  for (const ch of s) {
    if (ch === '(' || ch === '[' || ch === '{') {
      stack.push(ch);
    } else {
      // a closer with nothing/the wrong opener on top is invalid
      if (stack.pop() !== closerToOpener[ch]) return false;
    }
  }

  return stack.length === 0; // leftover openers => unbalanced
}

if (require.main === module) {
  console.log(isValid('()')); // true
  console.log(isValid('()[]{}')); // true
  console.log(isValid('(]')); // false
  console.log(isValid('([)]')); // false
  console.log(isValid('{[]}')); // true
}
