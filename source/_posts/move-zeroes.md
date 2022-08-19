---
title: LeetCode 283. 移动零
date: 2021-11-15 15:45:13
categories: LeetCode
tags:
---

### 题目
[283. 移动零](https://leetcode-cn.com/problems/move-zeroes/)
{% codelevel easy %}

给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。

<!-- more -->

### 思路
todo

### 实现
``` cpp
void moveZeroes(vector<int>& nums) {
    int l = 0;
    for (int i=0; i<nums.size(); ++i) {
        if (nums[i] != 0) {
            std::swap(nums[i], nums[l]);
            ++l;
        }
    }
}
```
