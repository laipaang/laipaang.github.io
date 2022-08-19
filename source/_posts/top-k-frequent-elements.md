---
title: LeetCode 347. 前 K 个高频元素
date: 2021-11-16 00:09:01
categories: LeetCode
tags:
- 快排
- 堆
- hash
---

### 题目
[347. 前 K 个高频元素](https://leetcode-cn.com/problems/top-k-frequent-elements/)
{% codelevel medium %}

<!-- more -->

### 思路
todo
[QuickSelect](https://algs4.cs.princeton.edu/lectures/demo/23DemoQuickSelect.pdf)

### 实现
``` cpp
class Solution {
public:
    int partition(std::vector<std::pair<int, int>>& nums, int l, int r) {
        // 可随机选择基准，以使得每次尽量均分
        int lower_bound = l;
        for (int i=l; i<r; ++i) {
            if (nums[i].second < nums[r].second) {
                std::swap(nums[i], nums[lower_bound]);
                ++lower_bound;
            }
        }

        std::swap(nums[lower_bound], nums[r]);

        return lower_bound;
    }

    void quick_select(std::vector<std::pair<int, int>>& nums, int l, int r, int t) {
        if (l >= r) {
            return;
        }

        int m = partition(nums, l, r);
        if (m == t) {
            return;
        } else if (m < t) {
            quick_select(nums, m+1, r, t);
        } else {
            quick_select(nums, l, m-1, t);
        }
    }

    vector<int> topKFrequent(vector<int>& nums, int k) {
        std::unordered_map<int, int> cnt;
        for (auto num: nums) {
            auto it = cnt.find(num);
            if (it == cnt.end()) {
                cnt.insert({num, 1});
            } else {
                ++it->second;
            }
        }

        std::vector<std::pair<int, int>> pairs;
        for (auto kv: cnt) {
            pairs.push_back({kv.first, kv.second});
        }

        quick_select(pairs, 0, pairs.size()-1, pairs.size()-k);

        std::vector<int> ans;
        for (int i=pairs.size()-k; i<pairs.size(); ++i) {
            ans.push_back(pairs[i].first);
        }

        return ans;
    }
};
```
