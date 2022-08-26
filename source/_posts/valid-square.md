---
title: LeetCode 593. 有效的正方形
date: 2022-08-26 21:27:53
categories: LeetCode
tags:
---

### 题目
[593. 有效的正方形](https://leetcode.cn/problems/valid-square/)
{% codelevel medium %}

给定2D空间中四个点的坐标 p1, p2, p3 和 p4，如果这四个点构成一个正方形，则返回 true 。
<!-- more -->

点的坐标 pi 表示为 [xi, yi] 。 输入没有任何顺序 。

一个 有效的正方形 有四条等边和四个等角(90度角)。

### 题解
``` cpp
bool validSquare(vector<int>& p1, vector<int>& p2, vector<int>& p3, vector<int>& p4) {
    auto len = [](vector<int>& p1, vector<int>& p2) {
        int d1 = p1[0] - p2[0];
        int d2 = p1[1] - p2[1];

        return d1 * d1 + d2 * d2;
    };

    std::unordered_set<int> lens{
        len(p1, p2),
        len(p1, p3),
        len(p1, p4),
        len(p2, p3),
        len(p2, p4),
        len(p3, p4)};

    return lens.size() == 2 && lens.find(0) == lens.end();
}
```
