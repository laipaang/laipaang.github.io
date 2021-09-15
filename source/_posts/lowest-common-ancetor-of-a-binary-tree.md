---
title: 二叉树的最近公共祖先
date: 2021-08-25 23:41:32
categories: leetcode
tags:
- 二叉树
---

[236. 二叉树的最近公共祖先](https://leetcode-cn.com/problems/lowest-common-ancestor-of-a-binary-tree/)
给定一棵二叉树，找到该树中给定两个节点的最近公共祖先

<!-- more -->

``` cpp
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode(int x) : val(x), left(NULL), right(NULL) {}
 * };
 */
class Solution {
public:
    TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
        if (root == nullptr) {
            return nullptr;
        }
        if (root == p || root == q) {
            return root;
        }

        TreeNode* left = nullptr;
        TreeNode* right = nullptr;
        if (root->left) {
            left = lowestCommonAncestor(root->left, p, q);
        }
        if (root->right) {
            right = lowestCommonAncestor(root->right, p, q);
        }

        if (left && right) {
            return root;
        }

        return left ? left : right;
    }
};
```
