---
title: LeetCode 334. 递增的三元子序列
date: 2022-03-02 22:40:21
categories: LeetCode
tags:
- 贪心
---

### 题目
[334. 递增的三元子序列](https://leetcode-cn.com/problems/increasing-triplet-subsequence/)
{% codelevel medium %}

给你一个整数数组 nums ，判断这个数组中是否存在长度为 3 的递增子序列。
<!-- more -->

如果存在这样的三元组下标 (i, j, k) 且满足 i < j < k ，使得 nums[i] < nums[j] < nums[k] ，返回 true ；否则，返回 false 。

### 题解
``` cpp
bool increasingTriplet(vector<int>& vec) {
    if (vec.size() < 3) {
        return false;
    }

    int i = std::numeric_limits<int>::max();
    int j = std::numeric_limits<int>::max();

    for (int k: vec) {
        if (i < k && j < k) {
            return true;
        }

        if (k < i) {
            i = k;
        }
        // 贪心 j要尽可能小，才能保证符合条件的k>j
        if (i < k && k < j) {
            j = k;
        }
    }

    return false;
}
```

``` cpp
bool increasingTriplet(vector<int>& vec) {
    if (vec.size() < 3) {
        return false;
    }

    int i = std::numeric_limits<int>::max();
    int j = std::numeric_limits<int>::max();

    for (int k: vec) {
        if (k > j) { // 隐藏条件：已经存在一个i使得i<j
            return true;
        }

        if (k > i) { // 隐藏条件：k小于之前的j，否则走不到这里
            j = k;
        } else {
            i = k;
        }
    }

    return false;
}
```
