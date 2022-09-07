---
title: LeetCode 538. 把二叉搜索树转换为累加树
date: 2022-09-07 23:45:13
categories: LeetCode
tags:
- 二叉树
- 二叉树遍历
---

### 题目
[538. 把二叉搜索树转换为累加树](https://leetcode.cn/problems/convert-bst-to-greater-tree/)
{% codelevel medium %}

给出二叉 搜索 树的根节点，该树的节点值各不相同，请你将其转换为累加树（Greater Sum Tree），使每个节点 node 的新值等于原树中大于或等于 node.val 的值之和。
<!-- more -->

提醒一下，二叉搜索树满足下列约束条件：

节点的左子树仅包含键 小于 节点键的节点。
节点的右子树仅包含键 大于 节点键的节点。
左右子树也必须是二叉搜索树。

### 题解
``` cpp
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
class Solution {
public:
    void right_to_left(TreeNode* root, int& acc) {
        if (root == nullptr) {
            return;
        }

        right_to_left(root->right, acc);
        acc += root->val;
        root->val = acc;
        right_to_left(root->left, acc);
    }

    TreeNode* convertBST(TreeNode* root) {
        int acc = 0;
        right_to_left(root, acc);

        return root;
    }
};
```
