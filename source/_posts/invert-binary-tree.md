---
title: LeetCode 226. 反转二叉树
date: 2021-10-10 11:39:18
categories: LeetCode
tags:
- 树
- 递归
- 二叉树
- 深度优先
- 前序遍历
---

### 题目
[226. 翻转二叉树](https://leetcode-cn.com/problems/invert-binary-tree/)
难度: <span style="color: rgba(90, 183, 38, 1);">简单</span>

翻转一棵二叉树。
<!-- more -->

### 思路
前序遍历，对于每个节点交换左右子树，递归处理左、右子树。

### 实现
``` cpp
TreeNode* invertTree(TreeNode* root) {
    if (!root) {
        return nullptr;
    }

    std::swap(root->left, root->right);
    invertTree(root->left);
    invertTree(root->right);

    return root;
}
```
