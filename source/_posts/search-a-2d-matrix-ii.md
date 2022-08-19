---
title: LeetCode 240. 搜索二维矩阵 II
date: 2021-11-19 22:37:41
categories: LeetCode
tags:
- 二分查找
---

### 题目
[240. 搜索二维矩阵 II](https://leetcode-cn.com/problems/search-a-2d-matrix-ii/)
{% codelevel medium %}

编写一个高效的算法来搜索 `m x n` 矩阵 `matrix` 中的一个目标值 `target` 。该矩阵具有以下特性：

- 每行的元素从左到右升序排列。
- 每列的元素从上到下升序排列。
<!-- more -->

### 思路
**一、Z形搜索**
我们从矩阵右上角开始搜索，如果大于target向左走，如果小于target向下走，存在target最多m+n步就可以搜索到，任意方向走出边界说明target不存在。

**二、类二分查找**
观察矩阵从左向右递增，从上向下底层，很容易想到二分查找。由于是矩阵，所以每次会将矩阵从中心分成4分，一定能够排除其中的一份。在现实需要注意边界条件。

### 实现
**Z形搜索**
``` cpp
bool searchMatrix(std::vector<std::vector<int>>& matrix, int target) {
    if (matrix.empty()) {
        return false;
    }

    int i = 0;
    int j = matrix[0].size() - 1;
    while (i < matrix.size() && j >= 0) {
        if (target == matrix[i][j]) {
            return true;
        } else if (target < matrix[i][j]) {
            --j;
        } else {
            ++i;
        }
    }

    return false;
}
```

**类二分查找** 
``` cpp
bool b_search(std::vector<std::vector<int>>& matrix, int x1, int y1, int x2,
              int y2, int target) {
    if (target < matrix[x1][y1] || target > matrix[x2][y2]) {
        return false;
    }

    int xm = (x2 + x1) / 2;
    int ym = (y2 + y1) / 2;
    if (target == matrix[xm][ym]) {
        return true;
    }

    /* 分成的4个矩阵边界处不要有重叠，否则死循环，y2>ym就是避免重叠的。
    比如：
        1 2
        3 4
    后三种情况不要b_search前的条件，对角1,4这个矩形就不断迭代，因为第四部分又是和输入是一个矩形
    */
    if (b_search(matrix, x1, y1, xm, ym, target) ||
        (y2>ym && b_search(matrix, x1, ym+1, xm, y2, target)) ||
        (x2>xm && b_search(matrix, xm+1, y1, x2, ym, target)) ||
        (x2>xm && y2>ym && b_search(matrix, xm+1, ym+1, x2, y2, target))) {
        return true;
    }

    return false;
}

bool searchMatrix(std::vector<std::vector<int>>& matrix, int target) {
    if (matrix.empty()) {
        return false;
    }

    int x = matrix.size() - 1;
    int y = matrix[0].size() - 1;
    return b_search(matrix, 0, 0, x, y, target);
}
```
