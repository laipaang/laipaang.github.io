---
title: LeetCode 122. 买卖股票的最佳时机II
date: 2021-09-30 10:42:54
categories: LeetCode
tags:
- 买卖股票
---

### 题目
[122. 买卖股票的最佳时机II](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-ii/) `中等`

给定一个数组 `prices` ，它的第 `i` 个元素 `prices[i]` 表示一支给定股票第 `i` 天的价格。
<!-- more -->

设计一个算法来计算你所能获取的最大利润。你可以尽可能地完成更多的交易（多次买卖一支股票）。

**注意**：你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。

### 思路
低买入、高抛出

### 实现
``` cpp
int maxProfit(std::vector<int>& prices) {
    auto h = prices.begin();
    int sum = 0;

    while (true) {
        // 低买
        auto l = std::is_sorted_until(h, prices.end(), [](int a, int b) {
            return a > b;
        });
        if (l == prices.end()) {
            return sum;
        }

        // 高抛
        h = std::is_sorted_until(l, prices.end());

        // 利润
        sum += *(h-1) - *(l-1); // 注意l和h都是实际低点和高点的后一位
        h -= 1;
    }

    return sum;
}
```
