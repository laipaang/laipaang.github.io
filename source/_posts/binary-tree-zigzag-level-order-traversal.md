---
title: LeetCode 103. 二叉树的锯齿形层序遍历
date: 2022-03-12 21:30:28
categories: LeetCode
tags:
- 二叉树
- 栈
---

### 题目
[103. 二叉树的锯齿形层序遍历](https://leetcode-cn.com/problems/binary-tree-zigzag-level-order-traversal/)
难度: <span style="color: rgba(255, 161, 25, 1);">中等</span>

给你二叉树的根节点 root ，返回其节点值的 锯齿形层序遍历 。（即先从左往右，再从右往左进行下一层遍历，以此类推，层与层之间交替进行）。
<!-- more -->

### 题解
``` cpp
vector<vector<int>> zigzagLevelOrder(TreeNode* root) {
    std::vector<std::vector<int>> ans;

    std::queue<TreeNode*> q;
    if (root) {
        q.push(root);
    }
    bool toggle = true;

    while (!q.empty()) {
        std::vector<int> v;
        for (int i=q.size(); i>0; --i) {
            TreeNode* p = q.front();
            q.pop();
            v.push_back(p->val);

            if (toggle) {
                if (p->right) q.push(p->right);
                if (p->left) q.push(p->left);
            } else {
                if (p->left) q.push(p->left);
                if (p->right) q.push(p->right);
            }
        }

        ans.emplace_back(std::move(v));
        toggle = !toggle;
    }

    return ans;
}
```
