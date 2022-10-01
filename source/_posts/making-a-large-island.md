---
title: LeetCode 827. 最大人工岛
date: 2022-10-01 16:25:55
categories: LeetCode
tags:
- dfs
---

### 题目
[827. 最大人工岛](https://leetcode.cn/problems/making-a-large-island/)
{% codelevel hard %}

给你一个大小为 `n x n` 二进制矩阵 `grid` 。*最多* 只能将一格 `0` 变成 `1` 。

返回执行此操作后，`grid` 中最大的岛屿面积是多少？
<!-- more -->

岛屿 由一组上、下、左、右四个方向相连的 `1` 形成。


### 题解
``` cpp
class Solution {
public:
    void dfs(std::vector<std::vector<int>>& grid, int i, int j, int id, int& size) {
    if (i<0 || j<0 || i>=grid.size() || j>=grid.size() || grid[i][j] != 1) {
        return;
    }

    grid[i][j] = id;
    ++size;

    dfs(grid, i+1, j, id, size);
    dfs(grid, i-1, j, id, size);
    dfs(grid, i, j-1, id, size);
    dfs(grid, i, j+1, id, size);
}

int largestIsland(std::vector<std::vector<int>>& grid) {
    int island_id = 2;
    std::vector<int> island2size = {0, 0};

    int n = grid.size();
    for (int i=0; i<n; ++i) {
        for (int j=0; j<n; ++j) {
            int size = 0;
            dfs(grid, i, j, island_id, size);
            if (size > 0) {
                island2size.push_back(size);
                ++island_id;
            }
        }
    }

    int m = 0;
    for (int i=0; i<n; ++i) {
        for (int j=0; j<n; ++j) {
            if (grid[i][j] == 0) {
                std::unordered_set<int> uniq;
                if (i+1 < n && grid[i+1][j] > 0) {
                    uniq.insert(grid[i+1][j]);
                }
                if (i-1 >= 0 && grid[i-1][j] > 0) {
                    uniq.insert(grid[i-1][j]);
                }
                if (j-1>=0 && grid[i][j-1] > 0) {
                    uniq.insert(grid[i][j-1]);
                }
                if (j+1<n && grid[i][j+1] > 0) {
                    uniq.insert(grid[i][j+1]);
                }

                int s = 0;
                for (auto k : uniq) {
                    s += island2size[k];
                }

                m = std::max(m, s+1);
            } else {
                m = std::max(m, island2size[grid[i][j]]);
            }
        }
    }

    return m;
}

};
```
