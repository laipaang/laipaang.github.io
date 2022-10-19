---
title: LeetCode 337. 打家劫舍 III
date: 2022-10-19 22:32:52
categories: LeetCode
tags:
- 状态机
- 回溯
- 递归
- 深度优先遍历
---

### 题目
[337. 打家劫舍 III](https://leetcode.cn/problems/house-robber-iii/)
{% codelevel medium %}

小偷又发现了一个新的可行窃的地区。这个地区只有一个入口，我们称之为 root 。

除了 root 之外，每栋房子有且只有一个“父“房子与之相连。一番侦察之后，聪明的小偷意识到“这个地方的所有房屋的排列类似于一棵二叉树”。 如果 两个直接相连的房子在同一天晚上被打劫 ，房屋将自动报警。
<!-- more -->

给定二叉树的 root 。返回 在不触动警报的情况下 ，小偷能够盗取的最高金额 。


### 题解
类似[198. 打家劫舍](/posts/house-robber/)，树的dfs+状态转移，但有2点需要注意：

1. 状态转移时存在左右子树的叠加，而非自上而下的通路
2. 基于第一点，dfs遍历时先处理子节点，再处理当前节点[后序遍历]

``` cpp
void dfs(TreeNode* root, int& n, int& y) {
    if (!root) {
        n = 0;
        y = 0;
        return;
    }

    // 由于当前节点的状态依赖子节点[抢和不抢的值分别是多少]
    // 因此，递归处理子节点，回溯时处理当前节点[后序遍历]
    int l_n = 0;
    int l_y = 0;
    int r_n = 0;
    int r_y = 0;

    dfs(root->left, l_n, l_y);
    dfs(root->right, r_n, r_y);

    n = std::max(l_n, l_y) + std::max(r_n, r_y);
    y = l_n + r_n + root->val;
}

int rob(TreeNode* root) {
    int n = 0; // Not robbing the node
    int y = 0; // Robbing the node

    dfs(root, n, y);

    return std::max(n, y);
}
```
