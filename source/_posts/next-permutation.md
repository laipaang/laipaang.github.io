---
title: 下一个排列
date: 2021-09-16 23:26:50
categories: LeetCode
tags:
---

### 题目
[31. 下一个排列](https://leetcode-cn.com/problems/next-permutation/)
实现获取`下一个排列`的函数，算法需要将给定数字序列重新排列成字典序中下一个更大的排列（即，组合出下一个更大的整数）。

<!-- more -->
如果不存在下一个更大的排列，则将数字重新排列成最小的排列（即升序排列）。

必须`原地`修改，只允许使用额外常数空间。

### 思路
首先，考虑如何变换出比当前更大的排列：由于十进制数从右往左数位逐渐变大，所以将一个大数和一个在它左侧且比它小的数交换即可。
其次，考虑如何是下一个更大的排列（也就是尽可能的小），同样由于十进制数从右往左数位逐渐变大，所以我们尽可能将靠近右侧的符合要求的数交换。

那我们从右往左找拐点（由大变小的那个大数），拐点变小的那个数我们要交换到右边一个比它大的数（且尽可能小），交换后，再将拐点右侧的数调整成升序（尽可能小）

### 实现
``` cpp
void nextPermutation(std::vector<int>& nums) {
    // 找拐点
    auto l_iter = std::is_sorted_until(nums.rbegin(), nums.rend());
    // 不存在拐点则已经是最大的排列，按题目要求升序
    if (l_iter == nums.rend()) {
        std::reverse(nums.begin(), nums.end());
        return;
    }

    // 找右尽可能小且大于l_iter的数和l_iter进行交换
    auto r_iter = std::upper_bound(nums.rbegin(), l_iter, *l_iter);
    std::iter_swap(l_iter, r_iter);

    // base() refers to the element that is next of l_iter pointing to
    std::sort(l_iter.base(), nums.end());
}

```
