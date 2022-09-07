---
title: LeetCode 300. 最长递增子序列
date: 2022-09-04 22:47:11
categories: LeetCode
tags:
- 动态规划
- 子序列
---

### 题目
[300. 最长递增子序列](https://leetcode.cn/problems/longest-increasing-subsequence/)
{% codelevel medium %}

给你一个整数数组 nums ，找到其中最长严格递增子序列的长度。

子序列 是由数组派生而来的序列，删除（或不删除）数组中的元素而不改变其余元素的顺序。例如，[3,6,2,7] 是数组 [0,3,1,6,2,2,7] 的子序列。
<!-- more -->

### 题解
``` cpp
int lengthOfLIS(vector<int>& nums) {
    int len = nums.size();
    int ans = 0;
    std::vector<int> dp(len, 0);

    for (int i=0; i<len; ++i) {
        dp[i] = 1;
        for (int j=0; j<i; ++j) {
            if (nums[i] > nums[j]) {
                dp[i] = std::max(dp[j] + 1, dp[i]);
            }
        }

        ans = std::max(ans, dp[i]);
    }

    return ans;
}
```
