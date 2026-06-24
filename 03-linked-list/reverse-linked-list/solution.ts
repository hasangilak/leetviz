/**
 * LeetCode #206 — Reverse Linked List (Easy)
 * https://leetcode.com/problems/reverse-linked-list/
 *
 * Reverse a singly linked list and return the new head.
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
 * Iterative pointer-flipping.
 *
 * Walk the list once, reversing each `next` pointer to point backward. We need
 * three references at all times:
 *   prev — the part already reversed (head of the new list-so-far)
 *   curr — the node we're flipping now
 *   next — saved BEFORE flipping, so we don't lose the rest of the list
 *
 * Time:  O(n) — one pass.
 * Space: O(1) — just three pointers (no recursion stack).
 */
export function reverseList(head: ListNode | null): ListNode | null {
  let prev: ListNode | null = null;
  let curr = head;

  while (curr !== null) {
    const next = curr.next; // save the rest before we overwrite the link
    curr.next = prev; // flip the pointer
    prev = curr; // advance prev
    curr = next; // advance curr
  }

  return prev; // prev is the old tail = new head
}

if (require.main === module) {
  const fromArray = (arr: number[]): ListNode | null =>
    arr.reduceRight<ListNode | null>((next, val) => new ListNode(val, next), null);
  const toArray = (head: ListNode | null): number[] => {
    const out: number[] = [];
    for (let n = head; n !== null; n = n.next) out.push(n.val);
    return out;
  };

  console.log(toArray(reverseList(fromArray([1, 2, 3, 4, 5])))); // [5,4,3,2,1]
  console.log(toArray(reverseList(fromArray([1, 2])))); // [2,1]
  console.log(toArray(reverseList(fromArray([])))); // []
}
