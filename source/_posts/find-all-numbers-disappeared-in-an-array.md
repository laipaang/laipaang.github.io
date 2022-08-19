---
title: LeetCode 448. 找到所有数组中消失的数字
date: 2021-10-08 16:12:58
categories: LeetCode
tags:
- 分桶
mathjax: true
---

### 题目
[448. 找到所有数组中消失的数字](https://leetcode-cn.com/problems/find-all-numbers-disappeared-in-an-array/)
{% codelevel easy %}

给你一个含 `n` 个整数的数组 `nums` ，其中 `nums[i]` 在区间 `[1, n]` 内。请你找出所有在 `[1, n]` 范围内但没有出现在 `nums` 中的数字，并以数组的形式返回结果。
<!-- more -->

**进阶**：你能在不使用额外空间且时间复杂度为 `O(n)` 的情况下解决这个问题吗? 你可以假定返回的数组不算在额外空间内。

### 思路
将 `nums` 作为 `hash` 表，将每个元素 `num` 放在 `num-1` 位置。那么，`nums` 空出的位置对应的就是消失的数字。通过不断交换，将每个元素 `num` 放在 `num-1` 索引处，对于空出来的位置填 `0`。

**官方原地修改的解法**

> 第一次遍历对于每个元素`num`，对于`num-1`位置元素加 `n`（模`n`防止溢出），再次遍历时那些小于等于 `n` 的元素位置对应的就是消失的数字

### 实现
``` cpp
vector<int> findDisappearedNumbers(vector<int>& nums) {
    std::vector<int> ans;

    for (int i=0; i<nums.size();) {
        if (nums[i] == i+1 || nums[i] == 0) { // 不需要调整
            ++i;
            continue;
        }
        int j = nums[i] - 1;
        if (nums[i] == nums[j]) { // 再次遇到置为0
            nums[i] = 0;
            ++i;
        } else {
            std::swap(nums[i], nums[j]);
        }
    }

    for (int i=0; i<nums.size(); ++i) {
        if (nums[i] == 0) {
            ans.push_back(i+1);
        }
    }

    return ans;
}
```
