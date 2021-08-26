---
title: LeetCode 48. 旋转图像
date: 2021-09-25 20:36:52
categories: LeetCode
tags: 数组
mathjax: true
---

### 题目
[48. 旋转图像](https://leetcode-cn.com/problems/rotate-image/)
给定一个 $n×n$ 的二维矩阵 matrix 表示一个图像。请你将图像顺时针旋转$90$度。  
<!-- more -->
你必须在 原地 旋转图像，这意味着你需要直接修改输入的二维矩阵。请不要 使用另一个矩阵来旋转图像。

### 思路
对于$n*n$的矩阵顺时针旋转$90$度，通过模拟的方法，对于每个元素顺时针移动$n$个元素即可。我们逆时针依次进行交换，前$n$个被交换元素在最后一次被交换到正确的位置。由于存在多层，每层4条边，需逐层旋转遍历逻辑。

在二维直角坐标系中将一个坐标$(i,j)$顺时针旋转$90^{\circ}$，可以通过沿$y=x$折叠，再沿$y=0$折叠得到。将旋转转换为两次折叠的好处在于，折叠意味着按顺序交换，避免复杂遍历逻辑。考虑第一象限的坐标

- 坐标$(i,j)$沿$y=x$对折后坐标为$(j,i)$
- 坐标$(i,j)$沿$y=0$对折后坐标为$(i,-j)$

在矩阵中，可以先将其沿主对角线对折，再左右对折。沿主对角线折叠时索引$[i,j]$和$[j,i]$交换。左右对折时，索引$[i,j]$和$[i,n-1-j]$交换

### 实现
``` cpp
void rotate(vector<vector<int>>& matrix) {
    int n = matrix.size();
    // 对角对折
    for (int i=0; i<n-1; ++i) {
        for (int j=1+i; j<n; ++j) {
            std::swap(matrix[i][j], matrix[j][i]);
        }
    }

    // 左右对折
    for (int i=0; i<n; ++i) {
        for (int j=0; j<n/2; ++j) {
            std::swap(matrix[i][j],matrix[i][n-1-j]);
        }
    }
}
```

