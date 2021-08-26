---
title: LeetCode 674. 最长连续递增序列
date: 2021-11-18 00:08:18
categories: LeetCode
tags:
- 动态规划
---

### 题目
[LeetCode 674. 最长连续递增序列](https://leetcode-cn.com/problems/longest-continuous-increasing-subsequence/)
难度: <span style="color: rgba(90, 183, 38, 1);">简单</span>

给定一个未经排序的整数数组，找到最长且 连续递增的子序列，并返回该序列的长度。
<!-- more -->

连续递增的子序列 可以由两个下标 `l` 和 `r`（`l < r`）确定，如果对于每个 `l <= i < r`，都有 `nums[i] < nums[i + 1]` ，那么子序列 `[nums[l], nums[l + 1], ..., nums[r - 1], nums[r]]` 就是连续递增子序列。

### 思路
todo

### 实现
``` cpp
int findLengthOfLCIS(vector<int>& nums) {
    if (nums.size() < 1) {
        return 0;
    }

    int cur = 0;
    int len = 1;
    for (int i=1; i<nums.size(); ++i) {
        if (nums[i-1] < nums[i]) {
            continue;
        }

        len = std::max(len, i - cur);
        cur = i;
    }
    // for循环未更新过len的情况
    len = std::max(len, int(nums.size()) - cur);

    return len;
}
```
