---
title: LeetCode 11. 盛水最多的容器
date: 2021-09-27 07:24:51
categories: LeetCode
tags:
- 双指针
---

### 题目
[11. 盛水最多的容器](https://leetcode-cn.com/problems/container-with-most-water/) `中等`

给你 n 个非负整数 a1，a2，...，an，每个数代表坐标中的一个点 (i, ai) 。在坐标内画 n 条垂直线，垂直线 i 的两个端点分别为 (i, ai) 和 (i, 0) 。
<!-- more -->
找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。

说明：你不能倾斜容器。

### 思路
双指针，分别指向首尾，向中间遍历，每次移动数值小的索引

### 实现
``` cpp
int maxArea(vector<int>& height) {
    int max_area = 0;
    int l = 0;
    int r = height.size() - 1;
    while (r > l) {
        int cur_area = std::min(height[l], height[r]) * (r - l);
        max_area = std::max(max_area, cur_area);
        if (height[l] > height[r]) {
            --r;
        } else {
            ++l;
        }
    }

    return max_area;
}
```
