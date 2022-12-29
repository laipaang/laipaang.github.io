---
title: LeetCode 202. 快乐数
date: 2022-12-29 20:45:53
categories: LeetCode
tags:
---

### 题目
[202. 快乐数](https://leetcode.cn/problems/happy-number/)
{% codelevel easy %}

编写一个算法来判断一个数 n 是不是快乐数。

「快乐数」 定义为：

对于一个正整数，每一次将该数替换为它每个位置上的数字的平方和。
然后重复这个过程直到这个数变为 1，也可能是 无限循环 但始终变不到 1。
如果这个过程 结果为 1，那么这个数就是快乐数。
如果 n 是 快乐数 就返回 true ；不是，则返回 false 。
<!-- more -->

### 题解
``` cpp
bool isHappy(int n) {
    auto next = [](int x) {
        int y = 0;
        while (x) {
            y += std::pow(x % 10, 2);
            x /= 10;
        }

        return y;
    };

    std::unordered_set<int> hit;
    while (n!=1 && !hit.count(n)) {
        hit.insert(n);
        n = next(n);
    };

    return n == 1;
}
```
