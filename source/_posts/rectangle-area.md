---
title: LeetCode 223. 矩形面积
date: 2021-10-07 10:15:09
categories: LeetCode
tags:
mathjax: true
---

### 题目
[223. 矩形面积](https://leetcode-cn.com/problems/rectangle-area/)
难度: <span style="color: rgba(255, 161, 25, 1);">中等</span>

给你 二维 平面上两个 由直线构成的 矩形，请你计算并返回两个矩形覆盖的总面积。
<!-- more -->

每个矩形由其 `左下` 顶点和 `右上` 顶点坐标表示：

- 第一个矩形由其左下顶点 $(ax1, ay1)$ 和右上顶点 $(ax2, ay2)$ 定义。
- 第二个矩形由其左下顶点 $(bx1, by1)$ 和右上顶点 $(bx2, by2)$ 定义。

### 思路
两个矩形覆盖的面积等于：两个矩形面积的和减去重叠面积。如何计算重叠面积？

#### 情况判断
$x$轴重叠长度乘$y$轴重叠长度。如何计算重叠长度？
考虑$x$轴，存在以下几种情况：

![](https://z3.ax1x.com/2021/10/10/5E5jAA.png)
其中②③④⑥场景存在重叠。

$y$轴同理。

#### 规律总结
$ax2$和$bx2$较小者记为$top$

$ax1$和$bx1$较大者记为$bottom$

$bottom$到$top$的正向距离即是重叠长度。

### 实现
``` cpp
int computeArea(int ax1, int ay1, int ax2, int ay2, int bx1, int by1, int bx2, int by2) {
    auto overlap = [](int ax1, int ax2, int bx1, int bx2) {
        /*
         * 情况判断
         * if (bx2>=ax2 && ax2>=bx1 && bx1>=ax1) {
         *     return ax2 - bx1;
         * }
         * if (ax2>=bx2 && bx1>=ax1) {
         *     return bx2 - bx1;
         * }
         * if (bx2>=ax2 && ax1>=bx1) {
         *     return ax2 - ax1;
         * }
         * if (ax2>=bx2 && bx2>=ax1 && ax1>=bx1) {
         *     return bx2 - ax1;
         * }
         *
         * return 0;
        **/

        // 规律总结
        int top = std::min(ax2, bx2);
        int bottom = std::max(ax1, bx1);
        if (top < bottom) {
            return 0;
        }

        return top - bottom;
    };

    int w = overlap(ax1, ax2, bx1, bx2);
    int h = overlap(ay1, ay2, by1, by2);

    return (ax2-ax1) * (ay2-ay1) + (bx2-bx1) * (by2-by1) - w * h;
}
```

