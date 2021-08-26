---
title: LeetCode 121. 买卖股票的最佳时机
date: 2021-09-30 00:50:47
categories: LeetCode
tags:
- 买卖股票
---

### 题目
[121. 买卖股票的最佳时机](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock/) `简单`

给定一个数组 `prices` ，它的第 `i` 个元素 `prices[i]` 表示一支给定股票第 `i` 天的价格。
<!-- more -->

你只能选择 **某一天** 买入这只股票，并选择在 **未来的某一个不同的日子** 卖出该股票。设计一个算法来计算你所能获取的最大利润。

返回你可以从这笔交易中获取的最大利润。如果你不能获取任何利润，返回 `0` 。


### 思路
从左往右扫描，不断更新最低价格、最大收益

### 实现
``` cpp
int maxProfit(vector<int>& prices) {
    if (prices.empty()) {
        return 0;
    }

    int low = prices[0];
    int pro = 0;
    for (int i=0; i<prices.size(); ++ i) {
        low = std::min(low, prices[i]);
        pro = std::max(pro, prices[i] - low);
    }

    return pro;
}
```
