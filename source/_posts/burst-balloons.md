---
title: LeetCode 312. 戳气球
date: 2021-10-31 23:46:20
categories: LeetCode
tags:
- 回溯
- 递归
- 动态规划
---

### 题目
[312. 戳气球](https://leetcode-cn.com/problems/burst-balloons/)
{% codelevel hard %}

有 `n` 个气球，编号为 `0` 到 `n - 1`，每个气球上都标有一个数字，这些数字存在数组 `nums` 中。
<!-- more -->

现在要求你戳破所有的气球。戳破第 `i` 个气球，你可以获得 `nums[i - 1] * nums[i] * nums[i + 1]` 枚硬币。 这里的 `i - 1` 和 `i + 1` 代表和 `i` 相邻的两个气球的序号。如果 `i - 1` 或 `i + 1` 超出了数组的边界，那么就当它是一个数字为 `1` 的气球。

求所能获得硬币的最大数量。

### 思路
#### 回溯
由于每次戳破一个气球，两个不相邻的气球就会变成相邻，需要维护状态。我们从最终状态，倒放到初始状态，也就是不断的插入气球，直到气球插满。

为了方便，在数组首尾分别添加一个数字为 `1` 的气球。在两个气球 `[i, j]` 间 `k` 插入一个气球，得分 `nums[i] * nums[k] * nums[j]`，todo

#### 动态规划
todo

### 实现
#### 回溯
``` cpp
class Solution {
public:
    int maxCoins(vector<int>& nums) {
        int n = nums.size();
        std::vector<int> padded_nums(n + 2, 1);
        for (int i=0; i<n; ++i) {
            padded_nums[i+1] = nums[i];
        }
        
        std::vector<std::vector<int>> sovled(n+2, std::vector<int>(n+2, -1));

        sovle(padded_nums, sovled, 0, n+1);

        return sovled[0][n+1];
    }

    int sovle(std::vector<int>& nums, std::vector<std::vector<int>>& sovled, int i, int j) {
        if (i + 1 >= j) {
            return 0;
        }
        if (sovled[i][j] != -1) {
            return sovled[i][j];
        }

        for (int k=i+1; k<j; ++k) {
            int sum = nums[i] * nums[k] * nums[j];
            sum = sovle(nums, sovled, i, k) + sum + sovle(nums, sovled, k, j);
            sovled[i][j] = std::max(sovled[i][j], sum);
        }

        return sovled[i][j];
    }
};
```

#### 动态规划
``` cpp
int maxCoins(vector<int>& nums) {
    int n = nums.size();
    std::vector<int> padded_nums(n + 2, 1);
    for (int i=0; i<n; ++i) {
        padded_nums[i+1] = nums[i];
    }
    
    std::vector<std::vector<int>> dp(n+2, std::vector<int>(n+2, 0));

    for (int i=n-1; i>=0; --i) {
        for (int j=i+2; j<n+2; ++j) {
            for (int k=i+1; k<j; ++k) {
                int s = dp[i][k] + padded_nums[i] * padded_nums[k] * padded_nums[j] + dp[k][j];
                dp[i][j] = std::max(dp[i][j], s);
            }
        }
    }

    return dp[0][n+1];
}
```
