---
title: LeetCode 309. 最佳买卖股票时机含冷冻期
date: 2022-10-09 16:20:31
categories: LeetCode
tags:
- 买卖股票
- 动态规划
---

### 题目
[309. 最佳买卖股票时机含冷冻期](https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-with-cooldown/)
{% codelevel medium %}

给定一个整数数组prices，其中第  prices[i] 表示第 i 天的股票价格 。​

设计一个算法计算出最大利润。在满足以下约束条件下，你可以尽可能地完成更多的交易（多次买卖一支股票）:
<!-- more -->

卖出股票后，你无法在第二天买入股票 (即冷冻期为 1 天)。
注意：你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。


### 题解
#### 表示
本来应该存在两种状态(status)：未持有股票(s_empty)，持有股票(s_hold)。
<img src="https://s1.ax1x.com/2022/10/09/xJqIzV.png" width="50%">

题目要求存在冷冻期，也就是不允许s_hold → s_empty → s_hold。因此，引入第三种状态s_sell，表示卖出（前一天）未持有（今天）；而s_empty表示当天未持有且前一天也未持有。状态之间的转移关系：
<img src="https://s1.ax1x.com/2022/10/09/xJq5R0.png" width="50%">

``` python
s_empty → s_hold → s_sell → s_empty
s_empty → s_empty
s_hold → s_hold
```

3种状态由3个变量表示：s_empty → s_hold → s_sell，每个变量的值代表这种状态下的收益。

#### 初始
对于第1天：
``` python
s_empy = 0
s_hold = -prices[0]
s_sell = 0
```

#### 迭代
对于第i天：
``` python
new_s_empty = max(s_empty, s_sell)
new_s_hold = max(s_hold, s_empty - prices[i])
new_s_sell = s_hold + prices[i]

s_empty = new_s_empty
s_hold = new_s_hold
s_sell = new_s_sell
```

#### 返回
``` python
max(s_empty, s_sell)
```

### 实现
``` cpp
int maxProfit(vector<int>& prices) {
    if (prices.size() < 1) {
        return 0;
    }

    int s_empty = 0;
    int s_hold = -prices[0];
    int s_sell = 0;
    for (int i=1; i<prices.size(); i++) {
        int new_s_empty = std::max(s_empty, s_sell);
        int new_s_hold = std::max(s_hold, s_empty - prices[i]);
        int new_s_sell = s_hold + prices[i];

        s_empty = new_s_empty;
        s_hold = new_s_hold;
        s_sell = new_s_sell;
    }

    return std::max(s_empty, s_sell);
}
```
