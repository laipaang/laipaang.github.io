---
title: LeetCode 221. 最大正方形
date: 2021-10-13 00:25:35
categories: LeetCode
tags:
- 动态规划
---

### 题目
[221. 最大正方形](https://leetcode-cn.com/problems/maximal-square/)
难度: <span style="color: rgba(255, 161, 25, 1);">中等</span>

在一个由 `'0'` 和 `'1'` 组成的二维矩阵内，找到只包含 `'1'` 的最大正方形，并返回其面积。
<!-- more -->

### 思路
暴力搜索：
遍历每一个元素，将该元素作为一个正方形的左上角，再不断尝试扩大正方形，直到不满足条件，搜索当前最大正方形面积。这样遍历结束就可以挑选全局正方形最大面积。时间复杂度 `O(m*n*min(m,n)^2)`。

动态规划：
如何才能在后面的遍历中复用前面遍历的结果呢？遍历中可以考察以元素 `(i,j)` 作为右下角的最大正方形面积，这个面积与 `(i-1,j)`、`(i-1,j-1)` 、`(i,j-1)` 有关。

- 如果，解为 `0`。
- 否则，解为 `(i-1,j)`、`(i-1,j-1)` 、`(i,j-1)` 三者解的最小值 + 1。

### 实现
#### 暴力搜索
``` cpp
int maximalSquare(vector<vector<char>>& matrix) {
        if (matrix.empty()) {
            return 0;
        }

        int w = matrix[0].size();
        int h = matrix.size();

        // 以 i,j 为正方形左上角，不断在下方和右侧增加一行一列
        auto search = [&](int i, int j) {
            int x = 0;
            while (i+x<h && j+x<w) {
                // 判断新增行 _|、列是否存在 '0'
                for (int k=0; k<=x; ++k) {
                    if (matrix[i+x][j+k] == '0' || matrix[i+k][j+x] == '0') {
                        return x*x;
                    }
                }
                
                ++x;
            }

            return x*x;
        };

        int ans = 0;
        for (int i=0; i<matrix.size(); ++i) {
            for (int j=0; j<matrix[i].size(); ++j) {
                ans = std::max(ans, search(i, j));
            }
        }

        return ans;
    }
```

#### 动态规划
``` cpp
int maximalSquare(std::vector<std::vector<char>>& matrix) {
    int h = matrix.size();
    int w = matrix[0].size();
    
    std::vector<std::vector<int>> dp(h, std::vector<int>(w, 0));
    int ans = 0;
    
    for (int i=0; i<h; ++i) {
        for (int j=0; j<w; ++j) {
            if (matrix[i][j] == '0') {
                continue;
            }

            if (i==0 || j==0) {
                dp[i][j] = 1;
            } else {
                dp[i][j] = std::min({dp[i-1][j-1], dp[i-1][j], dp[i][j-1]}) + 1;
            }

            ans = std::max(ans, dp[i][j]*dp[i][j]);
        }
    }

    return ans;
}
```
