---
title: LeetCode 16. 三数之和
date: 2022-08-30 08:29:44
categories: LeetCode
tags:
- 排序
- 双指针
---

### 题目
[16. 三数之和](https://leetcode.cn/problems/3sum/)
{% codelevel medium %}

给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？请你找出所有和为 0 且不重复的三元组。

注意：答案中不可以包含重复的三元组。
<!-- more -->

### 题解
``` cpp
vector<vector<int>> threeSum(vector<int>& nums) {
    std::sort(nums.begin(), nums.end()); // O(nlog(n))

    std::vector<std::vector<int>> ans;
    for (int i=0; i<nums.size(); ++i) { // O(n^2)
        if (i > 0 && nums[i] == nums[i-1]) { // avoid duplicate
            continue;
        }

        int target = -nums[i];
        int j = i + 1;
        int k = nums.size() - 1;

        while (j < k) {
            if (j > i+1 && nums[j] == nums[j-1]) { avoid duplicate
                ++j;
                continue;
            }

            int sum = nums[j] + nums[k];
            if (sum < target) {
                ++j;
            } else if (sum > target) {
                --k;
            } else {
                ans.push_back({nums[i], nums[j], nums[k]});

                ++j;
                --k;
            }
        }
    }

    return ans;
}
```
