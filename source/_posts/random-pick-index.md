---
title: LeetCode 398. 随机数索引
date: 2022-09-16 22:12:36
categories: LeetCode
tags:
- 蓄水池采样
---

### 题目
[398. 随机数索引](https://leetcode.cn/problems/random-pick-index/)
{% codelevel medium %}

给你一个可能含有 重复元素 的整数数组 nums ，请你随机输出给定的目标数字 target 的索引。你可以假设给定的数字一定存在于数组中。
<!-- more -->

实现 `Solution` 类：

- `Solution(int[] nums)` 用数组 `nums` 初始化对象。
- `int pick(int target)` 从 `nums` 中选出一个满足 `nums[i] == target` 的随机索引 `i` 。如果存在多个有效的索引，则每个索引的返回概率应当相等。

### 题解
一、哈希表统计
``` cpp
class Solution {
public:
    Solution(std::vector<int>& nums) : e(rd()) {
        for (int i=0; i<nums.size(); ++i) {
            num2index[nums[i]].push_back(i);
        }
    }

    int pick(int target) {
        auto it = num2index.find(target);
        if (it == num2index.end()) {
            return -1;
        }

        return it->second[u(e) % it->second.size()];
    }

protected:
    std::random_device rd;
    std::default_random_engine e;
    std::uniform_int_distribution<int> u;

    std::unordered_map<int, std::vector<int>> num2index;
};
```

二、蓄水池采样
``` cpp
class Solution {
public:
    Solution(std::vector<int>& nums) : nums(nums), e(rd()) {
    }

    int pick(int target) {
        int ans = 0;
        int cnt = 0;
        for (int i = 0; i < nums.size(); i++) {
            if (nums[i] == target) {
                ++cnt;
                if (u(e) % cnt == 0) {
                    ans = i;
                }
            }
        }

        return ans;
    }

protected:
    std::vector<int>& nums;

    std::random_device rd;
    std::default_random_engine e;
    std::uniform_int_distribution<int> u;
};
```
