/**
 * LeetCode #155 — Min Stack (Medium)
 * https://leetcode.com/problems/min-stack/
 *
 * Design a stack supporting push, pop, top, and retrieving the minimum element
 * — all in O(1).
 */

/**
 * Parallel "minimum so far" stack.
 *
 * The trick: alongside the value stack, keep a second stack whose top is always
 * the minimum of everything currently in the main stack. When we push `val`, we
 * push min(val, currentMin) onto the mins stack. Pops stay in lockstep, so the
 * min is always correct for the current contents — even after pops reveal older
 * minimums.
 *
 * Every operation is O(1) time. Space is O(n) for the extra mins stack.
 */
export class MinStack {
  private stack: number[] = [];
  private mins: number[] = []; // mins[i] = min of stack[0..i]

  push(val: number): void {
    this.stack.push(val);
    const currentMin = this.mins.length === 0
      ? val
      : Math.min(val, this.mins[this.mins.length - 1]);
    this.mins.push(currentMin);
  }

  pop(): void {
    this.stack.pop();
    this.mins.pop();
  }

  top(): number {
    return this.stack[this.stack.length - 1];
  }

  getMin(): number {
    return this.mins[this.mins.length - 1];
  }
}

if (require.main === module) {
  const s = new MinStack();
  s.push(-2);
  s.push(0);
  s.push(-3);
  console.log(s.getMin()); // -3
  s.pop();
  console.log(s.top()); // 0
  console.log(s.getMin()); // -2
}
