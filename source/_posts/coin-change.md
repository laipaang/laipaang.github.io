---
title: LeetCode 322. 零钱兑换
date: 2021-11-18 23:43:17
categories: LeetCode
tags:
- 动态规划
- 背包问题
- 完全背包
mathjax: true
---

### 题目
[322. 零钱兑换](https://leetcode-cn.com/problems/coin-change/)
{% codelevel medium %}

给你一个整数数组 `coins` ，表示不同面额的硬币；以及一个整数 `amount` ，表示总金额。
<!-- more -->
计算并返回可以凑成总金额所需的 `最少的硬币个数` 。如果没有任何一种硬币组合能组成总金额，返回 `-1` 。

你可以认为每种硬币的数量是无限的。

### 思路
动态规划
$$
\begin{equation}
	F(i)=\min\limits_{j=0...n-1} F(i-c_j)_{(i-c_j)\geq0} +1
\end{equation}
$$

### 实现
``` cpp
int coinChange(std::vector<int>& coins, int amount) {
    std::vector<int> dp(amount + 1, -1);

    dp[0] = 0;
    for (int i=1; i<dp.size(); ++i) {
        for (int j=0; j<coins.size(); ++j) {
            int k = i - coins[j];
            if (k<0 || dp[k]<0) {
                continue;
            }

            if (dp[i] < 0) {
                dp[i] = dp[k];
            } else {
                dp[i] = std::min(dp[i], dp[k]);
            }
        }
        if (dp[i] != -1) {
            dp[i] += 1;
        }
    }

    return dp[amount];
}
```

