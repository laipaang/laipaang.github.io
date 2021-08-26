---
title: LeetCode 46. 全排列
date: 2021-09-22 10:09:04
categories: LeetCode
tags:
---

### 题目
[46. 全排列](https://leetcode-cn.com/problems/permutations/)
给定一个不含重复数字的数组 nums ，返回其 所有可能的全排列 。你可以 按任意顺序 返回答案。
<!-- more -->

### 思路
c++ algorithm库函数next_permutation，其可能实现参考[31. 下一个排列](/posts/next-permutation/)

### 实现
``` cpp
vector<vector<int>> permute(vector<int>& nums) {
    std::vector<std::vector<int>> all;
    std::sort(nums.begin(), nums.end());
    do {
        all.push_back(nums);
    } while (std::next_permutation(nums.begin(), nums.end()));

    return all;
}
```
