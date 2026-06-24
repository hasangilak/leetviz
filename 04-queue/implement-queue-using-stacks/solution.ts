/**
 * LeetCode #232 — Implement Queue using Stacks (Easy)
 * https://leetcode.com/problems/implement-queue-using-stacks/
 *
 * Build a FIFO queue (push/pop/peek/empty) using only stack operations
 * (push to top / pop from top / peek top / size).
 */

/**
 * Two stacks: an "in" stack and an "out" stack.
 *
 * A stack reverses order (LIFO). Pour one stack into another and you reverse it
 * AGAIN -> back to original order (FIFO). So:
 *   push -> always onto `inStack`.
 *   pop/peek -> from `outStack`; if it's empty, first pour all of `inStack`
 *               into it (this flips newest-on-top into oldest-on-top).
 *
 * Each element is moved between stacks at most once, so although a single pop
 * can be O(n), the AMORTIZED cost per operation is O(1).
 */
export class MyQueue {
  private inStack: number[] = []; // newest on top
  private outStack: number[] = []; // oldest on top (front of queue)

  push(x: number): void {
    this.inStack.push(x);
  }

  pop(): number {
    this.transferIfNeeded();
    return this.outStack.pop()!;
  }

  peek(): number {
    this.transferIfNeeded();
    return this.outStack[this.outStack.length - 1];
  }

  empty(): boolean {
    return this.inStack.length === 0 && this.outStack.length === 0;
  }

  /** Move everything from inStack to outStack, but only when outStack is dry. */
  private transferIfNeeded(): void {
    if (this.outStack.length === 0) {
      while (this.inStack.length > 0) {
        this.outStack.push(this.inStack.pop()!);
      }
    }
  }
}

if (require.main === module) {
  const q = new MyQueue();
  q.push(1);
  q.push(2);
  console.log(q.peek()); // 1 (front)
  console.log(q.pop()); // 1
  console.log(q.empty()); // false
  console.log(q.pop()); // 2
  console.log(q.empty()); // true
}
