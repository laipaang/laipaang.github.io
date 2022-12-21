---
title: LeetCode 10. 正则表达式匹配
date: 2022-12-21 20:46:25
categories: LeetCode
tags:
- 动态规划
mathjax: true
---

### 题目
[10. 正则表达式匹配](https://leetcode.cn/problems/regular-expression-matching)
{% codelevel hard %}

给你一个字符串 s 和一个字符规律 p，请你来实现一个支持 '.' 和 '*' 的正则表达式匹配。

'.' 匹配任意单个字符
'*' 匹配零个或多个前面的那一个元素
所谓匹配，是要涵盖 整个 字符串 s的，而不是部分字符串。
<!-- more -->

### 题解
**初始化dp**

- 2个都为空，是可以匹配的
- p为空时，s不为空不能匹配
- s为空时，p不为空，只有第j个是'*'时，dp[0][j] == dp[0][j-2]

**状态转移方程**
$$
f(i,j)=\begin{cases}
f(i,j-2) \mid (f(i-1,j) \land match(i,j-1)),& p_{j-1}=* \\
f(i-1,j-1) \land match(i,j),&otherwise
\end{cases}
$$

$$
match(i,j)=\{p_{j-1} = . \lor s_{i-1} = p_{j-1}\}
$$
``` cpp
bool isMatch(string s, string p) {
    int m = s.size();
    int n = p.size();

    std::vector<std::vector<int>> dp(m+1, std::vector<int>(n+1, 0));
    // 2个都为空，是可以匹配的
    dp[0][0] = 1; 
    // p为空时，s不为空不能匹配
    // s为空时，p不为空，只有p[j-1] == '*' 时，dp[0][j] == dp[0][j-2]
    for (int j=1; j<=n; ++j) {
        if (p[j-1] == '*') {
            dp[0][j] = dp[0][j-2];
        }
    }

    auto match = [&s, &p](int i, int j) { // 第i个，第j个 转换为字符串下标时需要减1
        return p[j-1] == '.' || s[i-1] == p[j-1];
    };

    for (int i=1; i<=m; ++i) {
        for (int j=1; j<=n; ++j) {
            if (p[j-1] == '*') {
                dp[i][j] = dp[i][j-2] || (dp[i-1][j] && match(i, j-1));
            } else {
                dp[i][j] = dp[i-1][j-1] && match(i, j);
            }
        }
    }

    return dp[m][n];
}
```

