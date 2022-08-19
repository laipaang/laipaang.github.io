---
title: LeetCode 494. 目标和
date: 2022-01-11 23:26:40
categories: LeetCode
tags:
- dfs
- 动态规划
---

### 题目
[LeetCode 494. 目标和](https://leetcode-cn.com/problems/target-sum/)
{% codelevel medium %}

给你一个整数数组 nums 和一个整数 target 。
<!-- more -->

向数组中的每个整数前添加 '+' 或 '-' ，然后串联起所有整数，可以构造一个 表达式 ：

例如，nums = [2, 1] ，可以在 2 之前添加 '+' ，在 1 之前添加 '-' ，然后串联起来得到表达式 "+2-1" 。
返回可以通过上述方法构造的、运算结果等于 target 的不同 表达式 的数目。

### 思路
#### 深度优先
根据题目描述直接遍历，从左往右，后一步骤是在前一步的基础上，每个步骤分为两种情况。本质是一棵二叉树的遍历，采用深度优先遍历到叶子节点如果路径和为target，则数目增1。

- 时间复杂度O(2^n)。二叉树的深度为数组长度n，所有节点都需要遍历，因此节点数代表了时间复杂度。
- 空间复杂度O(n)。空间复杂度取决于递归调用的栈空间，栈深度为数组长度n。

``` cpp
void dfs(std::vector<int>& nums, int target, int index, int& count) {
    if (index >= nums.size()) {
        if (target == 0) {
            ++count;
        }

        return;
    }

    dfs(nums, target+nums[index], index+1, count);
    dfs(nums, target-nums[index], index+1, count);
}

int findTargetSumWays(vector<int>& nums, int target) {
    int count = 0;
    dfs(nums,  -target, 0, count);

    return count;
}
```

#### 动态规划
