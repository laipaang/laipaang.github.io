---
title: LeetCode 200. 岛屿数量
date: 2021-10-10 13:40:13
categories: LeetCode
tags:
- 矩阵
- dfs
- 深度优先
- 并查集
---

### 题目
[200. 岛屿数量](https://leetcode-cn.com/problems/number-of-islands/)
难度: <span style="color: rgba(255, 161, 25, 1);">中等</span>

给你一个由 `'1'`（陆地）和 `'0'`（水）组成的的二维网格，请你计算网格中岛屿的数量。
<!-- more -->

岛屿总是被水包围，并且每座岛屿只能由水平方向和/或竖直方向上相邻的陆地连接形成。

此外，你可以假设该网格的四条边均被水包围。

### 思路
遍历每一个节点：

- 如果该节不是 `1` 退出遍历 岛屿数 `+0`。
- 否则，将该点置为 `2`（避免再次遍历），递归遍历其上、下、左、右节点，和这个节点相连的都会被置为 `2`。遍历结束 岛屿数 `+1`。

### 实现
``` cpp
int dfs(vector<vector<char>>& grid, int i, int j) {
    if (i >= 0 && j >= 0 && i < grid.size() && j < grid[i].size() && grid[i][j] == '1') {
        grid[i][j] = '2';
        dfs(grid, i-1, j);
        dfs(grid, i+1, j);
        dfs(grid, i, j-1);
        dfs(grid, i, j+1);

        return 1;
    }

    return 0;
}

int numIslands(vector<vector<char>>& grid) {
    int ans = 0;
    for (int i=0; i<grid.size(); ++i) {
        for (int j=0; j<grid[i].size(); ++j) {
            ans += dfs(grid, i, j);
        }
    }
    
    return ans;
}
```
