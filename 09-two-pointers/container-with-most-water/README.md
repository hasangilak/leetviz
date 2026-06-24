# Container With Most Water · #11 · Medium

🔗 https://leetcode.com/problems/container-with-most-water/

## Problem
Heights are vertical lines. Choose two to form a container holding the **most
water**; return that area.

```
[1,8,6,2,5,4,8,3,7]  ->  49
```

## 🧐 In plain English
Each number is the height of a vertical wall standing on a number line (its index is its x-position). Pick any two walls; together with the flat ground they form a bucket. Water fills the bucket up to the height of the *shorter* of the two walls (any higher and it spills over the short side). Find the two walls that hold the most water and return that maximum area.

- **You're given:** an array `height` where `height[i]` is the height of the wall at position `i`.
- **Return:** the largest possible area = `(distance between the two walls) × (height of the shorter wall)`.
- **Rules / guarantees:** the container is just two walls and the flat bottom — walls *between* them are ignored, and the bucket can't be tilted.
- **Watch out for:** area is capped by the **shorter** wall, so a very tall wall paired with a short one can still hold little water.

## 🌊 Picture the container
The water is bounded by the **shorter** of the two walls (it would spill over the
shorter one), and stretches across their horizontal distance:

```
height: 1  8  6  2  5  4  8  3  7
index:  0  1  2  3  4  5  6  7  8

  8 |    █▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒          ← left wall = 8 (index 1)
  7 |    █▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒█          ← right wall = 7 (index 8)  ← water level = min(8,7)=7
  6 |    █▒▒█▒▒▒▒▒▒▒▒▒▒▒▒█
  5 |    █▒▒█▒▒▒▒█▒▒▒▒▒▒▒█
  4 |    █▒▒█▒▒▒▒█▒▒█▒▒▒▒█
  3 |    █▒▒█▒▒▒▒█▒▒█▒▒▒▒█▒▒█
  2 |    █▒▒█▒▒█▒█▒▒█▒▒▒▒█▒▒█
  1 |  █▒█▒▒█▒▒█▒█▒▒█▒▒█▒█▒▒█
     +----------------------
      0  1  2  3  4  5  6  7  8
            └────── width = 7 ──────┘

      area = width × min(wall heights) = 7 × min(8, 7) = 7 × 7 = 49 ▒
```

## The idea 💡
```
area(i, j) = (j - i) · min(height[i], height[j])
             └ width ┘   └─── limited by the shorter wall ───┘
```

Checking all pairs is `O(n²)`. Instead, **start at the widest span** (both ends)
and shrink smartly. The water level is capped by the **shorter** wall, so:

> Always move the pointer at the **shorter** wall inward.
> Moving the taller wall can only keep the same bottleneck while losing width.

## 🎬 Frame-by-frame
```
[1, 8, 6, 2, 5, 4, 8, 3, 7]
 ↑                        ↑
 lo=0(h1)               hi=8(h7)    area = 8 × min(1,7) = 8     left shorter ▶ lo++

    8, 6, 2, 5, 4, 8, 3, 7
    ↑                    ↑
    lo=1(h8)           hi=8(h7)     area = 7 × min(8,7) = 49 ★  right shorter ◀ hi--

    8, 6, 2, 5, 4, 8, 3
    ↑                 ↑
    lo=1(h8)        hi=7(h3)        area = 6 × min(8,3) = 18    right shorter ◀ hi--

    ...no later area beats 49...

                       BEST = 49 ✅
```

## Why is "move the shorter wall" safe? 🤔
Say `height[lo] < height[hi]`. Any *other* container that still uses `lo` must be
**narrower** (its right wall is left of `hi`) **and** is still capped by
`height[lo]` — so it can never beat the area we just measured. We lose nothing by
discarding `lo`. ∎

## Complexity
| | |
|---|---|
| **Time**  | `O(n)` — single two-pointer pass, pointers meet once |
| **Space** | `O(1)` |
