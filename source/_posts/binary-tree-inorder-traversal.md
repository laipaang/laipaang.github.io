---
title: LeetCode 94. 二叉树的中序遍历
date: 2022-03-08 08:32:27
categories: LeetCode
tags:
- 二叉树遍历
---

### 题目
[94. 二叉树的中序遍历](https://leetcode-cn.com/problems/binary-tree-inorder-traversal/)
难度: <span style="color: rgba(255, 161, 25, 1);">中等</span>

给定一个二叉树的根节点 root ，返回它的 中序 遍历。
<!-- more -->

### 题解
``` cpp
void inorderTraversal(TreeNode* root, std::vector<int>& ans) {
    if (!root) {
        return;
    }

    inorderTraversal(root->left, ans);
    ans.push_back(root->val);
    inorderTraversal(root->right, ans);
}

vector<int> inorderTraversal(TreeNode* root) {
    std::vector<int> ans;

    inorderTraversal(root, ans);

    return ans;
}
```
