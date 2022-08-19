---
title: LeetCode 397. 整数替换
date: 2021-11-19 22:38:59
categories: LeetCode
tags:
---

### 题目
[397. 整数替换](https://leetcode-cn.com/problems/integer-replacement/)
{% codelevel medium %}

给定一个正整数 `n` ，你可以做如下操作：

如果 `n` 是偶数，则用 n / 2替换 `n` 。
如果 `n` 是奇数，则可以用 n + 1或n - 1替换 `n` 。
`n` 变为 `1` 所需的最小替换次数是多少？

<!-- more -->

### 思路
由于昨天刚写了一道动态规划的题目[322. 零钱兑换](https://leetcode-cn.com/problems/coin-change/)，从1到n自底向上，自然就求出解了。其中，由于n与n+1有关，将n+1转换成(n+1)/2+2就可以了。提交结果：**超出时间限制**，Badcase是200000000

如果我们按上面的思路需要200000000次，但直觉告诉我们，直接除以2，一半时间都省了。那方案就是自顶向下，每次到偶数都会降低一半的问题空间，时间复杂度O(logn)

### 实现
``` cpp
int integerReplacement(int n) {
    if (n == 1) {
        return 0;
    }

    if (n % 2 == 0) {
        return integerReplacement(n / 2) + 1;
    }

    return std::min(integerReplacement(n - 1) + 1, integerReplacement(n / 2 + 1) + 2);
}
```
