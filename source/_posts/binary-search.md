---
title: LeetCode 704. 二分查找
date: 2022-09-03 19:54:56
categories: LeetCode
tags:
- 二分查找
---

### 题目
[704. 二分查找](https://leetcode.cn/problems/binary-search/)
{% codelevel easy %}

给定一个 n 个元素有序的（升序）整型数组 nums 和一个目标值 target  ，写一个函数搜索 nums 中的 target，如果目标值存在返回下标，否则返回 -1。
<!-- more -->

### 题解
``` cpp
int search(vector<int>& nums, int target) {
    int l = 0;
    int r = nums.size() - 1;
    while (l <= r) {
        int m = l + (r - l) / 2;
        if (nums[m] == target) {
            return m;
        } else if (nums[m] < target) {
            l = m + 1;
        } else {
            r = m - 1;
        }
    }

    return -1;
}
```
