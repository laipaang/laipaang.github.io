---
title: LeetCode 75. 颜色分类
date: 2022-10-13 23:22:03
categories: LeetCode
tags:
- 统计排序
- 双指针
---

### 题目
[75. 颜色分类](https://leetcode.cn/problems/sort-colors/)
{% codelevel medium %}

给定一个包含红色、白色和蓝色、共 n 个元素的数组 nums ，原地对它们进行排序，使得相同颜色的元素相邻，并按照红色、白色、蓝色顺序排列。

我们使用整数 0、 1 和 2 分别表示红色、白色和蓝色。

必须在不使用库的sort函数的情况下解决这个问题。
<!-- more -->

### 题解
``` cpp
// 统计排序
void sortColors(vector<int>& nums) {
    int cnt[3] = {0};
    for (int i=0; i<nums.size(); ++i) {
        ++cnt[nums[i]];
    }

    int r_end = cnt[0];
    int w_end = cnt[0] + cnt[1];
    for (int i=0; i<nums.size(); ++i) {
        if (i < r_end) {
            nums[i] = 0;
        } else if (i < w_end) {
            nums[i] = 1;
        } else {
            nums[i] = 2;
        }
    }
}

// 双指针
void sortColors(vector<int>& nums) {
    int s = 0;
    int e = nums.size() - 1;
    for (int i=0; i<=e;) {
        if (nums[i] == 2) { // 2交换时不需要更新i，因为交换过来的可能是0
            std::swap(nums[i], nums[e--]);
        } else {
            if (nums[i] == 0) {
                std::swap(nums[i], nums[s++]);
            }
            ++i;
        }
    }
}
```
