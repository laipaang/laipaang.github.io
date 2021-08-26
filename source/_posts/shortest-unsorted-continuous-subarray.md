---
title: LeetCode 581. 最短无序连续子数组
date: 2021-11-05 12:18:55
categories: LeetCode
tags:
- 动态规划
---

### 题目
[581. 最短无序连续子数组](https://leetcode-cn.com/problems/shortest-unsorted-continuous-subarray/)
难度: <span style="color: rgba(255, 161, 25, 1);">中等</span>

<!-- more -->

### 思路
todo

### 实现
``` cpp
int findUnsortedSubarray(vector<int>& nums) {
    auto o = nums;
    std::sort(o.begin(), o.end());

    int l = 0;
    for (; l<o.size(); ++l) {
        if (o[l] != nums[l]) {
            break;
        }
    }

    int r = o.size() - 1;
    for (; r>=0; --r) {
        if (o[r] != nums[r]) {
            break;
        }
    }

    return r < l ? 0: r - l + 1;
}
```

``` cpp
int findUnsortedSubarray(vector<int>& nums) {
    int n = nums.size();

    int l = 0;
    int r = -1;
    int mn = nums[n-1];
    int mx = nums[0];
    for (int i=0; i<n; ++i) {
        if (nums[i] >= mx) {
            mx = nums[i];
        } else {
            r = i;
        }

        if (nums[n-1-i] <= mn) {
            mn = nums[n-1-i];
        } else {
            l = n - 1 - i;
        }
    }

    return r - l + 1;
}
```
