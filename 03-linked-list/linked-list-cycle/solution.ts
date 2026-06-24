/**
 * LeetCode #141 — Linked List Cycle (Easy)
 * https://leetcode.com/problems/linked-list-cycle/
 *
 * Return true if the linked list has a cycle (some node's next points back into
 * the list), false otherwise.
 */

export class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

/**
 * Floyd's "tortoise and hare" — two pointers at different speeds.
 *
 * Move `slow` by 1 and `fast` by 2 each step. If the list ends, `fast` hits
 * null -> no cycle. If there IS a cycle, both pointers are trapped in the loop,
 * and the faster one gradually laps the slower one until they collide.
 *
 * Why they must meet: inside the cycle the gap between them shrinks by exactly 1
 * every step, so it eventually reaches 0 — they can't "jump over" each other.
 *
 * Time:  O(n)
 * Space: O(1) — two pointers, vs O(n) for a "visited" hash set.
 */
export function hasCycle(head: ListNode | null): boolean {
  let slow = head;
  let fast = head;

  while (fast !== null && fast.next !== null) {
    slow = slow!.next; // slow is never null while fast is ahead
    fast = fast.next.next;
    if (slow === fast) return true; // they collided -> cycle
  }

  return false; // fast reached the end -> no cycle
}

if (require.main === module) {
  // 3 → 2 → 0 → -4 → (back to 2)   has a cycle
  const a = new ListNode(3);
  const b = new ListNode(2);
  const c = new ListNode(0);
  const d = new ListNode(-4);
  a.next = b;
  b.next = c;
  c.next = d;
  d.next = b; // cycle
  console.log(hasCycle(a)); // true

  // 1 → 2 → null   no cycle
  const x = new ListNode(1);
  x.next = new ListNode(2);
  console.log(hasCycle(x)); // false
  console.log(hasCycle(null)); // false
}
