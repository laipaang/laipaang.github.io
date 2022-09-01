---
title: LeetCode 137. 只出现一次的数字 II
date: 2022-08-31 20:51:44
categories: LeetCode
tags: 位运算
---

### 题目
[137. 只出现一次的数字 II](https://leetcode.cn/problems/single-number-ii/)
{% codelevel medium %}

给你一个整数数组 nums ，除某个元素仅出现 一次 外，其余每个元素都恰出现 三次 。请你找出并返回那个只出现了一次的元素。
<!-- more -->

### 题解
``` cpp
int singleNumber(vector<int>& nums) {
    int ans = 0;
    for (int i=0; i<32; ++i) {
        int cnt = 0;
        for (int num: nums) {
            cnt += (num >> i) & 1;
        }

        if (cnt % 3 == 1) {
            ans = ans | (1 << i);
        }
    }

    return ans;
}
```
