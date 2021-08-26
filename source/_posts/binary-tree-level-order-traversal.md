---
title: LeetCode 102. 二叉树的层序遍历
date: 2021-09-22 11:40:09
categories: LeetCode
tags:
- 二叉树
- 广度优先搜索
- 队列
---

### 题目
[102. 二叉树的层序遍历](https://leetcode-cn.com/problems/binary-tree-level-order-traversal/)
给你一个二叉树，请你返回其按 层序遍历 得到的节点值。 （即逐层地，从左到右访问所有节点）。
<!-- more -->

### 思路
广度优先搜索即可，其中关键点如何区分不同层，有两种方法：

- 两个队列区分，一个当前的层，一个接下来的层
- 记录当前层的节点个数n，不断按n遍历（本文实现）

c++有三种容器适配器：std::stack、std::queue、std::priority_queue
std::queue队列适配器，FIFO。方法有：  
empty()  
size()  
front()  
back()  
push(const T& obj)  
push(T&& obj)  
emplace()  
pop()  
满足条件的基础容器有std::dequeue、std::list。默认使用的基础容器std::dequeue。

### 实现
``` cpp
vector<vector<int>> levelOrder(TreeNode* root) {
    std::vector<std::vector<int>> vv;
    std::queue<TreeNode*> q;
    
    if (root) {
        q.push(root);
    }

    while (!q.empty()) {
        vv.push_back({});
        int size = q.size();
        for (int i=0; i<size; ++i) {
            auto n = q.front();
            vv.back().push_back(n->val);
            if (n->left) {
                q.push(n->left);
            }
            if (n->right) {
                q.push(n->right);
            }
            q.pop();
        }
    }
    
    return vv;
}
```
