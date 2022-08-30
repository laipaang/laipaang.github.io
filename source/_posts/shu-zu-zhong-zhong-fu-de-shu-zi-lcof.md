---
title: 剑指 Offer 03. 数组中重复的数字
date: 2022-08-30 22:36:40
categories: 剑指 Offer
tags:
---

### 题目
[03. 数组中重复的数字](https://leetcode.cn/problems/shu-zu-zhong-zhong-fu-de-shu-zi-lcof/)
{% codelevel easy %}

找出数组中重复的数字。
<!-- more -->

在一个长度为 n 的数组 nums 里的所有数字都在 0～n-1 的范围内。数组中某些数字是重复的，但不知道有几个数字重复了，也不知道每个数字重复了几次。请找出数组中任意一个重复的数字。

### 题解
``` cpp
int findRepeatNumber(vector<int>& nums) {
    for (int i=0; i<nums.size(); ++i) {
        while (nums[i] != i) {
            if (nums[i] == nums[nums[i]]) {
                return nums[i];
            }
            std::swap(nums[i], nums[nums[i]]);
        }
    }

    return -1;
}
```
