# LRU Cache · #146 · Medium · *Design*

🔗 https://leetcode.com/problems/lru-cache/

## Problem
Build a cache with fixed `capacity` supporting:
- `get(key)` → value, or `-1` if absent.
- `put(key, value)` → insert/update; if over capacity, **evict the least
  recently used** key.

Both must run in **O(1)**.

## 🧐 In plain English
You're building a fixed-size key-value store (a *cache*) that remembers only the most recently used items. "LRU" stands for *Least Recently Used*: once the cache is full and a new item arrives, you throw out whichever key hasn't been touched (read or written) for the longest time to make room.

You implement a class with these operations:
- `LRUCache(capacity)` — create the cache with room for at most `capacity` keys.
- `get(key)` — return the key's value, or `-1` if it isn't stored; reading a key counts as using it (so it becomes "most recent").
- `put(key, value)` — add the key (or overwrite its value); this also marks it most recent, and if that pushes you over `capacity`, evict the least-recently-used key.

- **The hard part:** both `get` and `put` must run in **O(1)** time — so you can't scan the list to find the oldest item or to look up a key.

## The idea 💡
We need two things at once, each O(1):
1. **Look up any key instantly** → a **hash map** `key → node`.
2. **Know the usage order** so we can drop the oldest, and bump a key to
   "newest" on every touch → a **doubly linked list** ordered by recency.

Neither structure alone is enough:
- A map has no order.
- A list has order but O(n) lookup.

Combine them: the map points *into* the list, so we can find a node by key and
then splice it in O(1).

```
map: {1:•, 2:•, 3:•}
                                most recent ──────────────► least recent
list:   head ⇄ [3] ⇄ [1] ⇄ [2] ⇄ tail
        (sentinels remove edge cases when inserting/removing)
```

### Operations
| Op | What happens | Cost |
|----|--------------|------|
| `get(k)` hit | unlink node, move to front, return value | O(1) |
| `get(k)` miss | return -1 | O(1) |
| `put(k,v)` update | overwrite value, move to front | O(1) |
| `put(k,v)` new, room | create node, add to front, map it | O(1) |
| `put(k,v)` new, full | evict node before `tail`, delete from map, add new to front | O(1) |

The node stores its **key** (not just value) so that on eviction we can also
remove it from the map.

## Walkthrough (capacity = 2)
```
put(1,1)   list: 1                 map{1}
put(2,2)   list: 2 ⇄ 1             map{1,2}
get(1)->1  list: 1 ⇄ 2             (1 touched -> front)
put(3,3)   full! evict LRU=2       list: 3 ⇄ 1     map{1,3}
get(2)->-1 (evicted)
put(4,4)   full! evict LRU=1       list: 4 ⇄ 3     map{3,4}
get(1)->-1
get(3)->3  list: 3 ⇄ 4
get(4)->4  list: 4 ⇄ 3
```

## Complexity
| | |
|---|---|
| **Time**  | `O(1)` for both `get` and `put` |
| **Space** | `O(capacity)` — map + list hold at most `capacity` entries |

## Why sentinels (head/tail dummies)?
Without them, inserting into an empty list or removing the last node needs
null-checks. With permanent `head` and `tail` guards, `node.prev` and
`node.next` are **never null** for real nodes — the splicing code stays
branch-free.
