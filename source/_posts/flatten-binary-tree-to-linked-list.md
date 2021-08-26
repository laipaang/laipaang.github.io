---
title: LeetCode 114. 二叉树展开为链表
date: 2021-10-08 11:19:01
categories: LeetCode
tags:
- 二叉树
- 前序遍历
- 链表
mathjax: true
---

### 题目
[114. 二叉树展开为链表](https://leetcode-cn.com/problems/flatten-binary-tree-to-linked-list/)
难度: <span style="color: rgba(255, 161, 25, 1);">中等</span>

给你二叉树的根结点 `root` ，请你将它展开为一个单链表：
<!-- more -->

展开后的单链表应该同样使用 `TreeNode` ，其中 `right` 子指针指向链表中下一个结点，而左子指针始终为 `null` 。
展开后的单链表应该与二叉树 `先序遍历` 顺序相同。

### 思路
前序遍历即可。其中，需要注意的点：左子树叶子节点的后驱是栈顶元素。

- 时间复杂度：$O(n)$
- 空间复杂度：$O(n)$

**官方空间复杂度 $O(1)$ 的解法：**

> 寻找前驱节点：如果，root不存在左子树，这个子树不需要展开；否则：root右节点的前驱是root的左子树最右的节点，把右子树挂在该前驱下，对该节点进行展开，并继续处理其right节点。

### 实现
``` cpp
void flatten(TreeNode* root) {
    std::stack<TreeNode*> s;

    if (root) {
        s.push(root);
    }
    
    while (!s.empty()) {
        root = s.top();
        s.pop();

        while (root) {
            if (root->right) {
                s.push(root->right);
            }
            if (root->left) {
                root->right = root->left;
                root->left = nullptr;
                root = root->right;
            }
            // 后驱是栈顶元素
            else {
                if (!s.empty()) {
                    root->right = s.top();
                }
                root = nullptr;
            }
        }
    }
}
```
