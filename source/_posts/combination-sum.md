---
title: LeetCode 39. 组合总和
date: 2021-09-28 23:45:33
categories: LeetCode
tags:
- 深度优先搜索
- dfs
- 回溯
---

### 题目
[39. 组合总和](https://leetcode-cn.com/problems/combination-sum/) `中等`

给定一个**无重复元素**的正整数数组 `candidates` 和一个正整数 `target` ，找出 `candidates` 中所有可以使数字和为目标数`target` 的唯一组合。
<!-- more -->

`candidates` 中的数字可以无限制重复被选取。如果至少一个所选数字数量不同，则两种组合是唯一的。 

对于给定的输入，保证和为 `target` 的唯一组合数少于 `150` 个。

### 思路
深度优先搜索，可在某些情况下剪枝

### 实现
``` cpp
void dfs(std::vector<int>& candidates, int target, int pos, std::vector<int> combs,std::vector<std::vector<int>>& ans) {
    if (target == 0) {
        ans.push_back(combs);
        return;
    }

    combs.push_back(0);
    for (int i=pos; i<candidates.size(); ++i) {
        // 剪枝
        if (target < candidates[i]) {
            break;
        }
        
        combs.back() = candidates[i];
        dfs(candidates, target - candidates[i], i, combs, ans);
    }
}

std::vector<std::vector<int>> combinationSum(std::vector<int>& candidates, int target) {
    std::vector<std::vector<int>> ans;

    std::sort(candidates.begin(), candidates.end()); // 可剪枝的前置条件
    for (int i=0; i<candidates.size(); ++i) {
        if (target < candidates[i]) {
            break;
        }

        dfs(candidates, target - candidates[i], i, {candidates[i]}, ans);
    }

    return ans;
}
```
