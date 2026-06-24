/**
 * LeetCode #19 — Remove Nth Node From End of List (Medium)
 * https://leetcode.com/problems/remove-nth-node-from-end-of-list/
 *
 * Remove the n-th node counting from the END, in ONE pass. Return the head.
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
 * Two pointers with a fixed n-gap.
 *
 * "n-th from the end" is awkward without knowing the length. Trick: move a
 * `fast` pointer n steps ahead, THEN advance `fast` and `slow` together. When
 * `fast` falls off the end, `slow` sits exactly one node BEFORE the target — so
 * we can splice it out with `slow.next = slow.next.next`.
 *
 * A dummy head before the list makes removing the real head a non-special case.
 *
 * Time:  O(L) — single pass.
 * Space: O(1).
 */
export function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
  const dummy = new ListNode(0, head);
  let fast: ListNode | null = dummy;
  let slow: ListNode = dummy;

  // open a gap of n nodes between fast and slow
  for (let i = 0; i < n; i++) fast = fast!.next;

  // advance both until fast is the last node
  while (fast!.next !== null) {
    fast = fast!.next;
    slow = slow.next!;
  }

  // slow.next is the node to remove
  slow.next = slow.next!.next;
  return dummy.next;
}

if (require.main === module) {
  const fromArray = (arr: number[]): ListNode | null =>
    arr.reduceRight<ListNode | null>((next, val) => new ListNode(val, next), null);
  const toArray = (head: ListNode | null): number[] => {
    const out: number[] = [];
    for (let n = head; n !== null; n = n.next) out.push(n.val);
    return out;
  };

  console.log(toArray(removeNthFromEnd(fromArray([1, 2, 3, 4, 5]), 2))); // [1,2,3,5]
  console.log(toArray(removeNthFromEnd(fromArray([1]), 1))); // []
  console.log(toArray(removeNthFromEnd(fromArray([1, 2]), 1))); // [1]
}
