---
title: LeetCode 437. 路径总和 III
date: 2022-10-12 23:06:51
categories: LeetCode
tags:
- 前缀和
- 双重递归
---

### 题目
[437. 路径总和 III](https://leetcode.cn/problems/path-sum-iii/)
{% codelevel medium %}

给定一个二叉树的根节点 root ，和一个整数 targetSum ，求该二叉树里节点值之和等于 targetSum 的 路径 的数目。

路径 不需要从根节点开始，也不需要在叶子节点结束，但是路径方向必须是向下的（只能从父节点到子节点）。
<!-- more -->

### 题解
#### 前缀和
``` cpp
// 时间复杂度 O(N)
class Solution {
public:
    void dfs(TreeNode* root, int target, long prefixSum, int& cnt) {
        if (root == nullptr) {
            return;
        }

        prefixSum += root->val;
        if (prefixSum == target) {
            ++cnt;
        }
        auto it = prefixSumCount.find(prefixSum - target);
        if (it != prefixSumCount.end()) {
            cnt += it->second;
        }

        ++prefixSumCount[prefixSum];
        dfs(root->left, target, prefixSum, cnt);
        dfs(root->right, target, prefixSum, cnt);
        --prefixSumCount[prefixSum];
    }

    int pathSum(TreeNode* root, int targetSum) {
        int cnt = 0;
        dfs(root, targetSum, 0, cnt);

        return cnt;
    }

protected:
    std::unordered_map<long, int> prefixSumCount;
};
```


#### 双重递归
``` cpp
// 时间复杂度 O(N^2)
void dfs(TreeNode* root, long target, int& cnt) {
    if (root == nullptr) {
        return;
    }

    target -= root->val;
    if (target == 0) {
        ++cnt;
    }

    dfs(root->left, target, cnt);
    dfs(root->right, target, cnt);
}

int pathSum(TreeNode* root, int targetSum) {
    if (root == nullptr) {
        return 0;
    }

    int cnt = 0;
    dfs(root, targetSum, cnt);
    cnt += pathSum(root->left, targetSum);
    cnt += pathSum(root->right, targetSum);

    return cnt;
}
```
