---
title: 剑指 Offer 21. 调整数组顺序使奇数位于偶数前面
date: 2022-08-13 09:17:51
categories: LeetCode
tags: 双指针
---

### 题目
[剑指 Offer 21. 调整数组顺序使奇数位于偶数前面](https://leetcode.cn/problems/diao-zheng-shu-zu-shun-xu-shi-qi-shu-wei-yu-ou-shu-qian-mian-lcof/)
难度: <span style="color: rgba(90, 183, 38, 1);">简单</span>

输入一个整数数组，实现一个函数来调整该数组中数字的顺序，使得所有奇数在数组的前半部分，所有偶数在数组的后半部分。

<!-- more -->

### 题解
``` cpp
vector<int> exchange(vector<int>& nums) {
    int n = nums.size();
    std::vector<int> ans(n, 0);

    int i = 0;
    int j = n - 1;
    for (int k=0; k<n; ++k) {
        if (nums[k] % 2 == 0) {
            ans[j--] = nums[k];
        } else {
            ans[i++] = nums[k];
        }
    }
    
    return ans;
}
```
