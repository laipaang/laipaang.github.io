---
title: LeetCode 343.整数拆分
date: 2021-11-21 23:41:42
categories: LeetCode
tags:
- 动态规划
mathjax: true
---

### 题目
[343.整数拆分](https://leetcode-cn.com/problems/integer-break/)
{% codelevel medium %}

给定一个正整数`n`，将其拆分为至少两个正整数的和，并使这些整数的乘积最大化。 返回你可以获得的最大乘积。
<!-- more -->

### 思路
动态规划
$$
\begin{equation}
	F(i)=\max\limits_{1\leq j\leq i/2} \{\max(j, dp[j])*max(i-j, dp[i-j])\}
\end{equation}
$$
时间复杂度：$O(n^2)$，空间复杂度：$O(n)$

### 实现
``` cpp
int integerBreak(int n) {
    std::vector<int> dp(n+1, 0);
    dp[1] = 1;

    for (int i=2; i<=n; ++i) {
        for (int j=1; j<=i/2; ++j) {
            dp[i] = std::max(dp[i], std::max(j, dp[j]) * std::max(i-j, dp[i-j]));
        }
    }

    return dp[n];
}

// 数学方法
int integerBreak(int n) {
    if (n <= 3) {
        return n - 1;
    }
    int quotient = n / 3;
    int remainder = n % 3;
    if (remainder == 0) {
        return (int)pow(3, quotient);
    } else if (remainder == 1) {
        return (int)pow(3, quotient - 1) * 4;
    } else {
        return (int)pow(3, quotient) * 2;
    }
}
```
