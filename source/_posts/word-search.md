---
title: LeetCode 79. 单词搜索
date: 2022-10-14 23:02:04
categories: LeetCode
tags:
- dfs
---

### 题目
[79. 单词搜索](https://leetcode.cn/problems/word-search/)
{% codelevel medium %}

给定一个 m x n 二维字符网格 board 和一个字符串单词 word 。如果 word 存在于网格中，返回 true ；否则，返回 false 。

单词必须按照字母顺序，通过相邻的单元格内的字母构成，其中“相邻”单元格是那些水平相邻或垂直相邻的单元格。同一个单元格内的字母不允许被重复使用。
<!-- more -->


### 题解
``` cpp
class Solution {
public:
    bool dfs(vector<vector<char>>& board, int i, int j, std::string& word, int k) {
        // k遍历完说明 已经找到所有字符
        if (k >= word.size()) {
            return true;
        }

        // 边界条件
        if (i>=board.size() || j>=board[i].size()) {
            return false;
        }

        // 遍历过的，不能重复使用
        if (board[i][j] < 0) {
            return false;
        }

        // 遇到不符合的
        if (board[i][j] != word[k]) {
            return false;
        }

        // 状态标记为遍历过
        board[i][j] = -board[i][j];

        // 4个方向深度遍历
        ++k;
        bool x = dfs(board, i-1, j, word, k) || dfs(board, i+1, j, word, k) \
            || dfs(board, i, j-1, word, k) || dfs(board, i, j+1, word, k);

        // 回溯时恢复状态
        board[i][j] = -board[i][j];

        return x;
    }

    bool exist(vector<vector<char>>& board, string word) {
        for (int i=0; i<board.size(); ++i) {
            for (int j=0; j<board[i].size(); ++j) {
                if (dfs(board, i, j, word, 0)) {
                    return true;
                }
            }
        }
        
        return false;
    }
};
```
