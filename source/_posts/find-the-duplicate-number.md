---
title: LeetCode 287. 寻找重复数
date: 2022-08-31 08:29:51
categories: LeetCode
tags:
- 二分查找
- 位运算
- floyd判环
---

### 题目
[287. 寻找重复数](https://leetcode.cn/problems/find-the-duplicate-number/)
{% codelevel medium %}

给定一个包含 n + 1 个整数的数组 nums ，其数字都在 [1, n] 范围内（包括 1 和 n），可知至少存在一个重复的整数。
<!-- more -->

假设 nums 只有 一个重复的整数 ，返回 这个重复的数 。

你设计的解决方案必须 不修改 数组 nums 且只用常量级 O(1) 的额外空间。

### 题解
一、二分查找

抽屉原理：10个苹果放9个抽屉，一定有一个抽屉里有两个苹果。1+n个位置，数值范围1-n，一定存在重复的数。从数值范围1-n进行二分查找，每次范围缩小一半，假设切分点是x，如果整个数组小于等于x的个数大于x，重复的数一定出现在x右侧（包括x）。

``` cpp
int findDuplicate(vector<int>& nums) {
    int l = 1;
    int r = nums.size();

    while (l < r) {
        int m = l + (r - l) / 2;
        int c = 0;
        // 抽屉原理：10个苹果放9个抽屉，一定有一个抽屉里有两个苹果
        for (int num: nums) {
            if (num <= m) {
                ++c;
            }
        }
        // 1 1 2
        // 1 2 2
        if (c > m) {
            r = m;
        } else {
            l = m + 1;
        }
    }

    return r;
}
```
