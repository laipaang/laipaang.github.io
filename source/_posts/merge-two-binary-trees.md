---
title: LeetCode 617. 合并二叉树
date: 2021-09-25 23:16:12
categories: LeetCode
tags:
- tree
- 递归
---

### 题目
[617. 合并二叉树](https://leetcode-cn.com/problems/merge-two-binary-trees/)
给定两个二叉树，想象当你将它们中的一个覆盖到另一个上时，两个二叉树的一些节点便会重叠。

<!-- more -->
你需要将他们合并为一个新的二叉树。合并的规则是如果两个节点重叠，那么将他们的值相加作为节点合并后的新值，否则不为 NULL 的节点将直接作为新二叉树的节点。

### 思路
递归处理每一节点即可

### 实现
``` cpp
TreeNode* mergeTrees(TreeNode* root1, TreeNode* root2) {
    if (!root1 && !root2) {
        return nullptr;
    }
    TreeNode* n = new TreeNode();
    TreeNode* l1 = nullptr;
    TreeNode* r1 = nullptr;
    TreeNode* l2 = nullptr;
    TreeNode* r2 = nullptr;
    if (root1) {
        l1 = root1->left;
        r1 = root1->right;
        n->val += root1->val;
    }
    if (root2) {
        l2 = root2->left;
        r2 = root2->right;
        n->val += root2->val;
    }

    n->left = mergeTrees(l1, l2);
    n->right = mergeTrees(r1, r2);
    
    return n;
}
```
