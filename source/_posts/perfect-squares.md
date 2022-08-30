---
title: LeetCode 279. 完全平方数
date: 2022-08-29 23:06:51
categories: LeetCode
tags: 动态规划
---

### 题目
[279. 完全平方数](https://leetcode.cn/problems/perfect-squares/)
{% codelevel medium %}

给你一个整数 n ，返回 和为 n 的完全平方数的最少数量 。
<!-- more -->

完全平方数 是一个整数，其值等于另一个整数的平方；换句话说，其值等于一个整数自乘的积。例如，1、4、9 和 16 都是完全平方数，而 3 和 11 不是。

### 题解
``` cpp
int numSquares(int n) {
    std::vector<int> dp(n+1, 0);
    for (int i=1; i<=n; ++i) {
        int min = std::numeric_limits<int>::max();
        for (int j=1; j*j<=i; ++j) {
            min = std::min(min, dp[i-j*j]);
        }
        dp[i] = 1 + min;
    }

    return dp[n];
}
```
