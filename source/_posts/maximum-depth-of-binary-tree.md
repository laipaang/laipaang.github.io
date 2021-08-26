---
title: LeetCode 104. 二叉树的最大深度
date: 2021-09-22 14:17:55
categories: LeetCode
tags:
- 深度优先
- 递归
---

### 题目
[104. 二叉树的最大深度](https://leetcode-cn.com/problems/maximum-depth-of-binary-tree/)
给定一个二叉树，找出其最大深度。
<!-- more -->
二叉树的深度为根节点到最远叶子节点的最长路径上的节点数。

说明: 叶子节点是指没有子节点的节点。

### 思路
两种思路：

- 深度优先，通过递归实现（本文实现）
- 广度优先，参考[102. 二叉树的层序遍历](/posts/binary-tree-level-order-traversal/)

### 实现
``` cpp
int maxDepth(TreeNode* root) {
    if (!root) {
        return 0;
    }
    
    return std::max(maxDepth(root->left), maxDepth(root->right)) + 1;
}
```
