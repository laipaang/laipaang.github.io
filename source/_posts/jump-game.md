---
title: LeetCode 55. 跳跃游戏
date: 2021-09-29 23:06:11
categories: LeetCode
tags:
- 贪心
---


### 题目
[55. 跳跃游戏](https://leetcode-cn.com/problems/jump-game/) `中等`

给定一个非负整数数组 `nums` ，你最初位于数组的 **第一个下标** 。
<!-- more -->

数组中的每个元素代表你在该位置可以跳跃的最大长度。

判断你是否能够到达最后一个下标。

### 思路
从左往右扫描，在每处选择当前最优解

### 实现
``` cpp
bool canJump(vector<int>& nums) {
    int stand = 0;
    for (int i=1; i<nums.size(); ++i) {
        // 出现最优解已经到达不了的下标，也就无法达到最后了
        if (i > stand + nums[stand]) {
            return false;
        }

        // 贪心，不断选择当前能走更远的下标
        if(i + nums[i] > stand + nums[stand]) {
            stand = i;
        }
    }

    return true;
}
```
