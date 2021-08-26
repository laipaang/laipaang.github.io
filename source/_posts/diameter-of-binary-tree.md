---
title: LeetCode 543. 二叉树的直径
date: 2021-11-10 08:27:55
categories: LeetCode
tags:
- 递归
---

### 题目
[543. 二叉树的直径](https://leetcode-cn.com/problems/diameter-of-binary-tree/)
难度: <span style="color: rgba(90, 183, 38, 1);">简单</span>

<!-- more -->

### 解法
todo

### 实现
``` cpp
class Solution {
public:
    int depth(TreeNode* root, int& diameter) {
        if (!root) {
            return 0;
        }

        int l = root->left ? depth(root->left, diameter) + 1 : 0;
        int r = root->right ? depth(root->right, diameter) + 1 : 0;

        diameter = std::max(diameter, l + r);

        return std::max(l, r);
    }

    int diameterOfBinaryTree(TreeNode* root) {
        int diameter = std::numeric_limits<int>::min();
        depth(root, diameter);

        return diameter;
    }
};
```
