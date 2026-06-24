# Top K Frequent Elements · #347 · Medium

🔗 https://leetcode.com/problems/top-k-frequent-elements/

## Problem
Return the `k` most frequent elements (in any order).

```
nums = [1,1,1,2,2,3], k = 2  ->  [1, 2]
```

## 🧐 In plain English
*Frequency* just means how many times a value appears in the list. Count how often each value shows up, then hand back the `k` values that appear most often. In the example, `1` appears 3 times and `2` appears twice, so the two most frequent values are `1` and `2`.

- **You're given:** an array `nums` and an integer `k`.
- **Return:** an array of the `k` values (the elements themselves, not their counts or positions) that occur most frequently.
- **Rules / guarantees:** the answer is unique — there's never a tie that makes the top `k` ambiguous, and `k` is always valid for the input.
- **Watch out for:** you return the *values*, not their frequencies, and the output can be in any order.

## The idea 💡
Counting frequencies is the easy half (one hash map). The interesting half is
selecting the top `k` **without** a full sort.

Key insight: **a value's frequency is at most `n`** (the array length). That
bounded range is exactly when **bucket / counting sort** shines. Make `n + 1`
buckets indexed by frequency; drop each value into its frequency's bucket. Then
sweep buckets from the highest frequency downward and take the first `k`.

| Approach | Time | Note |
|----------|------|------|
| Sort by frequency | `O(n log n)` | simplest to write |
| Min-heap of size k | `O(n log k)` | classic interview answer |
| **Bucket sort (this)** | **`O(n)`** | optimal; uses the bounded-frequency trick |

## Walkthrough
`nums = [1,1,1,2,2,3]`, `k = 2`

```
counts:  {1:3, 2:2, 3:1}

buckets (index = frequency):
  f: 0   1     2     3
     []  [3]   [2]   [1]

sweep from f=6 down:
  f=3 -> take 1   (result = [1])
  f=2 -> take 2   (result = [1,2])  -> length == k, stop
```

## Complexity
| | |
|---|---|
| **Time**  | `O(n)` — counting + bucket fill + single bucket sweep |
| **Space** | `O(n)` — frequency map plus `n + 1` buckets |
