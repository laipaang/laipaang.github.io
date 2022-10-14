---
title: LeetCode 98. 验证二叉搜索树
date: 2022-10-14 10:31:52
categories: LeetCode
tags:
- 二叉树
---

### 题目
[98. 验证二叉搜索树](https://leetcode.cn/problems/validate-binary-search-tree/)
{% codelevel medium %}

给你一个二叉树的根节点 root ，判断其是否是一个有效的二叉搜索树。
<!-- more -->

有效 二叉搜索树定义如下：

节点的左子树只包含 小于 当前节点的数。
节点的右子树只包含 大于 当前节点的数。
所有左子树和右子树自身必须也是二叉搜索树。

### 题解
``` cpp
class Solution {
public:
    bool isValidBST(TreeNode* root) {
        if (!root) {
            return true;
        }

        if (!isValidBST(root->left)) {
            return false;
        }

        if (root->val <= pre_val) {
            return false;
        }
        pre_val = root->val;

        if (!isValidBST(root->right)) {
            return false;
        }

        return true;
    }

    int64_t pre_val = std::numeric_limits<int64_t>::min();
};
```
