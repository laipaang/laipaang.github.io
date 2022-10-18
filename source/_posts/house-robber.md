---
title: LeetCode 198. 打家劫舍
date: 2022-10-18 23:27:37
categories: LeetCode
tags:
- 打家劫舍
- 状态机
---

### 题目
[198. 打家劫舍](https://leetcode.cn/problems/house-robber/)
{% codelevel medium %}

你是一个专业的小偷，计划偷窃沿街的房屋。每间房内都藏有一定的现金，影响你偷窃的唯一制约因素就是相邻的房屋装有相互连通的防盗系统，如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警。
<!-- more -->

给定一个代表每个房屋存放金额的非负整数数组，计算你 不触动警报装置的情况下 ，一夜之内能够偷窃到的最高金额。

### 题解
对于每个房屋有两种状态：`不偷盗`与`偷盗`，用两个变量s_skip和s_take表示，每个变量的值表示该状态下的偷盗金额。

从第一个房屋到最后一个房屋依次进行状态转移：s_skip可以来自s_skip或者s_take（两种状态求最大值），但s_take只能来自s_skip

``` cpp
int rob(vector<int>& nums) {
    /* 
     * s_skip: status not rob, can be from `s_skip` or `s_take`
     * s_take: status rob, noly can be from `s_skip`
    **/
    int s_skip = 0;
    int s_take = 0;
    
    for (int i=0; i<nums.size(); ++i) {
        int tmp = s_skip + nums[i];

        s_skip = std::max(s_skip, s_take);;
        s_take = tmp;
        
    }

    return std::max(s_skip, s_take);
}
```
