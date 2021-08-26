---
title: 不同路径
date: 2021-08-24 17:33:00
tags: 动态规划
categories: leetcode
---

``` cpp
#include <iostream>
#include <vector>

int uniquePaths(int m, int n) {
    if (m < 1 || n < 1) {
        return 0;
    }

    std::vector<std::vector<int>> dp(m);
    for (size_t i=0; i<m; ++i) {
        dp[i].resize(n);
        dp[i][0] = 1;
    }
    for (size_t i=0; i<n; ++i) {
        dp[0][i] = 1;
    }

    for (size_t i=1; i<m; ++i) {
        for(size_t j=1; j<n; ++j) {
            dp[i][j] = dp[i-1][j] + dp[i][j-1];
        }
    }

    return dp[m-1][n-1];
}

int main() {
    std::cout << uniquePaths(3,2);

    return 0;
}
```
