---
title: LeetCode 128. 最长连续序列
date: 2021-10-01 23:18:47
categories: LeetCode
tags:
---

### 题目
[128. 最长连续序列](https://leetcode-cn.com/problems/longest-consecutive-sequence/)
{% codelevel medium %}

给定一个未排序的整数数组 nums ，找出数字连续的最长序列（不要求序列元素在原数组中连续）的长度。
<!-- more -->

请你设计并实现时间复杂度为 O(n) 的算法解决此问题。

### 思路
暴力：遍历nums，对于每一个数x：判断x+1、x+2...是否存在（提前构建hash），直到x+n不存在，那序列长度是n，时间复杂度是O(n^2)。

优化：1.将vector插入一个set去重。2.对于一个存在x-1的元素是没有必要遍历的，降低时间复杂度。每个元素最多遍历2次，时间复杂度O(n)。

### 实现
``` cpp
int longestConsecutive(vector<int>& nums) {
    std::unordered_set<int> s(nums.begin(), nums.end());

    int longest = 0;
    for (auto x: s) {
        if (s.count(x-1)) {
            continue;
        }

        int len = 1;
        while (s.count(++x)) {
            ++len;
        }

        longest = std::max(longest, len);
    }

    return longest;
}
```
