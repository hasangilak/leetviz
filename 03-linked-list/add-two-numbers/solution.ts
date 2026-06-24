/**
 * LeetCode #2 — Add Two Numbers (Medium)
 * https://leetcode.com/problems/add-two-numbers/
 *
 * Two numbers are stored as linked lists with digits in REVERSE order (ones
 * digit first). Return their sum as the same kind of list.
 *   342 + 465 = 807  ->  (2->4->3) + (5->6->4) = (7->0->8)
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
 * Elementary-school addition with a carry.
 *
 * Reverse order is a gift: the heads are the ones digits, so we add left-to-right
 * exactly like adding by hand. At each position sum the two digits plus the
 * carry, write `sum % 10`, carry `sum / 10`. Continue while EITHER list has
 * digits OR a carry remains (handles a final carry like 5+5=10).
 *
 * A dummy head keeps the append logic uniform.
 *
 * Time:  O(max(n, m))
 * Space: O(max(n, m)) — the result list.
 */
export function addTwoNumbers(
  l1: ListNode | null,
  l2: ListNode | null,
): ListNode | null {
  const dummy = new ListNode();
  let tail = dummy;
  let carry = 0;

  while (l1 !== null || l2 !== null || carry !== 0) {
    const sum = (l1?.val ?? 0) + (l2?.val ?? 0) + carry;
    carry = Math.floor(sum / 10);
    tail.next = new ListNode(sum % 10);
    tail = tail.next;
    l1 = l1?.next ?? null;
    l2 = l2?.next ?? null;
  }

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

  console.log(toArray(addTwoNumbers(fromArray([2, 4, 3]), fromArray([5, 6, 4])))); // [7,0,8]
  console.log(toArray(addTwoNumbers(fromArray([0]), fromArray([0])))); // [0]
  console.log(toArray(addTwoNumbers(fromArray([9, 9, 9]), fromArray([1])))); // [0,0,0,1]
}
