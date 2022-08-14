---
title: LeetCode 88. 合并两个有序数组
date: 2022-07-28 11:59:45
categories: LeetCode
tags: 双指针
---

### 题目
[88. 合并两个有序数组](https://leetcode.cn/problems/merge-sorted-array/)
难度: <span style="color: rgba(90, 183, 38, 1);">简单</span>

给你两个按 非递减顺序 排列的整数数组 nums1 和 nums2，另有两个整数 m 和 n ，分别表示 nums1 和 nums2 中的元素数目。

请你 合并 nums2 到 nums1 中，使合并后的数组同样按 非递减顺序 排列。
<!-- more -->

注意：最终，合并后数组不应由函数返回，而是存储在数组 nums1 中。为了应对这种情况，nums1 的初始长度为 m + n，其中前 m 个元素表示应合并的元素，后 n 个元素为 0 ，应忽略。nums2 的长度为 n 。

### 题解
``` cpp
void merge(vector<int>& a, int a_len, vector<int>& b, int b_len) {
    int i = a_len + b_len - 1;
    int j = a_len - 1;
    int k = b_len - 1;
    int t = 0;
    while (k >= 0) {
        if (j >= 0) {
            if (a[j] > b[k]) {
                t = a[j--];
            } else {
                t = b[k--];
            }
        } else {
            t = b[k--];
        }

        a[i--] = t;
    }
}
```
