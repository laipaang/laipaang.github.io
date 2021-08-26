---
title: LeetCode 73. 矩阵置零
date: 2022-03-01 00:09:04
categories: LeetCode
tags:
- 矩阵
---

### 题目
[73. 矩阵置零](https://leetcode-cn.com/problems/set-matrix-zeroes/)
难度: <span style="color: rgba(255, 161, 25, 1);">中等</span>

给定一个 m x n 的矩阵，如果一个元素为 0 ，则将其所在行和列的所有元素都设为 0 。请使用 原地 算法。
<!-- more -->

### 题解
``` cpp
void setZeroes(vector<vector<int>>& matrix) {
    int m = matrix.size();
    int n = matrix[0].size();

    int row0 = 0;
    for (int j=0; j<n; ++j) {
        if (matrix[0][j] == 0) {
            row0 = 1;
        }
    }

    for (int i=1; i<m; ++i) {
        if (matrix[i][0] == 0) {
            matrix[0][0] = 0;
        }
        for (int j=1; j<n; ++j) {
            if (matrix[i][j] == 0) {
                matrix[i][0] = 0;
                matrix[0][j] = 0;
            }
        }
    }

    for (int i=m-1; i>0; --i) {
        for (int j=n-1; j>0; --j) {
            if (matrix[i][0] == 0 || matrix[0][j] == 0) {
                matrix[i][j] = 0;
            }
        }
    }

    if (matrix[0][0] == 0) {
        for (int i=0; i<m; ++i) {
            matrix[i][0] = 0;
        }
    }
    if (row0) {
        for (int j=0; j<n; ++j) {
            matrix[0][j] = 0;
        }
    }
}
```
