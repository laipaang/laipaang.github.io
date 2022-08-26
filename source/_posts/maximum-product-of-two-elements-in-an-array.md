---
title: LeetCode 1464. 数组中两元素的最大乘积
date: 2022-08-26 20:50:54
categories: LeetCode
tags:
---

### 题目
[1464. 数组中两元素的最大乘积](https://leetcode.cn/problems/maximum-product-of-two-elements-in-an-array/)
{% codelevel easy %}

给你一个整数数组 nums，请你选择数组的两个不同下标 i 和 j，使 (nums[i]-1)*(nums[j]-1) 取得最大值。

请你计算并返回该式的最大值。
<!-- more -->

- 2 <= nums.length <= 500
- 1 <= nums[i] <= 10^3

### 题解
``` cpp
int maxProduct(vector<int>& nums) {
    int i = 0;
    int j = 0;
    for (int num: nums) {
        --num;
        if (num > i) {
            j = i; // 需要同时更新第2大
            i = num;
        } else if (num > j) {
            j = num;
        }
    }

    return i * j;
}
```
