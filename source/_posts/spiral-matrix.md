---
title: LeetCode 54. 螺旋矩阵
date: 2022-10-18 22:57:37
categories: LeetCode
tags:
- 模拟
---

### 题目
[54. 螺旋矩阵](https://leetcode.cn/problems/spiral-matrix/)
{% codelevel medium %}

给你一个 m 行 n 列的矩阵 matrix ，请按照 顺时针螺旋顺序 ，返回矩阵中的所有元素。
<!-- more -->

### 题解
``` cpp
vector<int> spiralOrder(vector<vector<int>>& matrix) {
    std::vector<int> ans;
    if (matrix.empty()) {
        return ans;
    }

    int bottom = 0;
    int top = matrix.size() - 1;
    int left = 0;
    int right = matrix[0].size() - 1;

    while (true) {
        for (int i=left; i<=right; ++i) {
            ans.push_back(matrix[bottom][i]);
        }
        if (++bottom > top) {
            break;
        }
        for (int i=bottom; i<=top; ++i) {
            ans.push_back(matrix[i][right]);
        }
        if (--right < left) {
            break;
        }
        for (int i=right; i>=left; --i) {
            ans.push_back(matrix[top][i]);
        }
        if (--top < bottom) {
            break;
        }
        for (int i=top; i>=bottom; --i) {
            ans.push_back(matrix[i][left]);
        }
        if (++left > right) {
            break;
        }
    }

    return ans;
}

vector<int> spiralOrder(vector<vector<int>>& matrix) {
    std::vector<int> ans;
    if (matrix.empty()) {
        return ans;
    }

    int bottom = 0;
    int top = matrix.size() - 1;
    int left = 0;
    int right = matrix[0].size() - 1;

    while (bottom <= top || left <= right) {
        for (int i=left; i<=right && bottom <= top; ++i) {
            ans.push_back(matrix[bottom][i]);
        }
        bottom += 1;
        for (int i=bottom; i<=top && left<=right; ++i) {
            ans.push_back(matrix[i][right]);
        }
        right -= 1;
        for (int i=right; i>=left && bottom <= top; --i) {
            ans.push_back(matrix[top][i]);
        }
        top -= 1;
        for (int i=top; i>=bottom && left <= right; --i) {
            ans.push_back(matrix[i][left]);
        }
        left += 1;
    }

    return ans;
}
```
