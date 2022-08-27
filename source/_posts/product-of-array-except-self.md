---
title: LeetCode 238. 除自身以外数组的乘积
date: 2022-08-27 16:07:54
categories: LeetCode
tags:
- 前缀和
---

### 题目
[238. 除自身以外数组的乘积](https://leetcode.cn/problems/product-of-array-except-self/)
{% codelevel medium %}

给你一个整数数组 nums，返回 数组 answer ，其中 answer[i] 等于 nums 中除 nums[i] 之外其余各元素的乘积 。
<!-- more -->

题目数据 保证 数组 nums之中任意元素的全部前缀元素和后缀的乘积都在  32 位 整数范围内。

请不要使用除法，且在 O(n) 时间复杂度内完成此题。

### 题解
如果使用除法，一次求得所有元素乘积P，answer[i] = P / nums[i]即可，但题目要求不用除法。

一、分别求前缀和后缀积，额外的空间复杂度 O(n)
``` cpp
vector<int> productExceptSelf(vector<int>& nums) {
    int size = nums.size();

    std::vector<int> forward_p(size+2, 1);
    std::vector<int> backward_p(size+2, 1);

    // 1, size
    for (int i=0; i<size; ++i) {
        forward_p[i+1] = forward_p[i] * nums[i];
        backward_p[size-i] = backward_p[size-i+1] * nums[size-i-1];
    }

    // forward_p可以优化掉
    std::vector<int> ans(size, 0);
    for (int i=0; i<size; ++i) {
        ans[i] = forward_p[i] * backward_p[i+2];
    }

    return ans;
}
```

进阶：你可以在 O(1) 的额外空间复杂度内完成这个题目吗？（ 出于对空间复杂度分析的目的，输出数组不被视为额外空间。）

二、在（方法一）forward_p可以优化，再利用输出数组
``` cpp
vector<int> productExceptSelf(vector<int>& nums) {
    std::vector<int> prod(nums.size(), 1);
    
    // 由前往后遍历，前缀可以逐步计算
    // 后缀存储在prod

    for (int i=nums.size()-2; i>=0; i--) {
        prod[i] = prod[i+1] * nums[i+1];
    }

    int l_prod = 1;
    for (int i=0; i<nums.size(); ++i) {
        prod[i] = l_prod * prod[i];
        l_prod = l_prod * nums[i];
    }

    return prod;
}
```
