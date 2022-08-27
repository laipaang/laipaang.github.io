---
title: LeetCode 100. 相同的树
date: 2022-08-28 00:46:58
categories: LeetCode
tags:
- 树
---

### 题目
[100. 相同的树](https://leetcode.cn/problems/same-tree/)
{% codelevel easy %}

给你两棵二叉树的根节点 `p` 和 `q` ，编写一个函数来检验这两棵树是否相同。

如果两个树在结构上相同，并且节点具有相同的值，则认为它们是相同的。
<!-- more -->

### 题解
``` cpp
bool isSameTree(TreeNode* p, TreeNode* q) {
    if (!p || !q) {
        return  p ==  q;
    }

    return p->val == q->val && isSameTree(p->left, q->left) && isSameTree(p->right, q->right);
}
```
