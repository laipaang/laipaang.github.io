---
title: LeetCode 1470. 重新排列数组
date: 2022-08-29 23:14:22
categories: LeetCode
tags:
---

### 题目
[1470. 重新排列数组](https://leetcode.cn/problems/shuffle-the-array/)
{% codelevel easy %}

给你一个数组 nums ，数组中有 2n 个元素，按 [x1,x2,...,xn,y1,y2,...,yn] 的格式排列。

请你将数组按 [x1,y1,x2,y2,...,xn,yn] 格式重新排列，返回重排后的数组。
<!-- more -->

### 题解
``` cpp
vector<int> shuffle(vector<int>& nums, int n) {
    std::vector<int> ans(nums.size(), 0);
    for (int i=0; i<n; ++i) {
        ans[i*2] = nums[i];
        ans[i*2+1] = nums[i+n];
    }

    return ans;
}
```
