---
title: LeetCode 560. 和为 K 的子数组
date: 2022-02-20 11:26:01
categories: LeetCode
tags:
- dfs
- hash
---

### 题目
[560. 和为 K 的子数组](https://leetcode-cn.com/problems/subarray-sum-equals-k/)
难度: <span style="color: rgba(255, 161, 25, 1);">中等</span>

给你一个整数数组 nums 和一个整数 k ，请你统计并返回该数组中和为 k 的连续子数组的个数。
<!-- more -->

### 题解
#### dfs
``` cpp
void dfs(std::vector<int>& nums, int sum, int next, int& count) {
    if (sum == 0) {
        ++count;
    }
    if (next >= nums.size()) {
        return;
    }

    dfs(nums, sum+nums[next], next+1, count);
}

int subarraySum(vector<int>& nums, int k) {
    int count = 0;
    for (int i=0; i<nums.size(); ++i) {
        dfs(nums, -k+nums[i], i+1, count);
    }

    return count;
}
```

#### 前缀和
``` cpp
int subarraySum(vector<int>& nums, int k) {
    std::vector<int> sums(nums.size()+1, 0);

    sums[0] = 0;
    for (int i=1; i<sums.size(); ++i) {
        sums[i] = nums[i-1] + sums[i-1];
    }

    int count = 0;
    for (int i=0; i<sums.size(); ++i) {
        for (int j=i+1; j<sums.size(); ++j) {
            if (sums[j] - sums[i] == k) {
                ++count;
            }
        }
    }

    return count;
}
```

#### 前缀和+hash
``` cpp
int subarraySum(vector<int>& nums, int k) {
    std::unordered_map<int, int> sum2count = {{0, 1}};

    int sum = 0;
    int total = 0;
    for (int i=0; i<nums.size(); ++i) {
        sum += nums[i];
        
        auto it = sum2count.find(sum - k);
        if (it != sum2count.end()) {
            total += it->second;
        }

        it = sum2count.find(sum);
        if (it == sum2count.end()) {
            sum2count.insert({sum, 1});
        } else {
            ++it->second;
        }
    }

    return total;
}
```
