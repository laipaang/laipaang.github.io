---
title: LeetCode 1143. 最长公共子序列
date: 2021-11-17 23:36:01
categories: LeetCode
tags:
- 动态规划
mathjax: true
---

### 题目
[1143. 最长公共子序列](https://leetcode-cn.com/problems/longest-common-subsequence/)
{% codelevel medium %}

给定两个字符串 `text1` 和 `text2`，返回这两个字符串的最长 `公共子序列` 的长度。如果不存在 `公共子序列` ，返回 `0` 。
<!-- more -->

一个字符串的 子序列 是指这样一个新的字符串：它是由原字符串在不改变字符的相对顺序的情况下删除某些字符（也可以不删除任何字符）后组成的新字符串。

例如，`"ace"` 是 `"abcde"` 的子序列，但 `"aec"` 不是 `"abcde"` 的子序列。
两个字符串的 公共子序列 是这两个字符串所共同拥有的子序列。

### 思路
动态规划
\begin{equation}
	F_{a,b}(i,j)=\begin{cases}
	0 &  \text{if }min(i,j) = 0, \\
	\\
	max\begin{cases}
	F_{a,b}(i-1,j) \\
	F_{a,b}(i,j-1) \\
	F_{a,b}(i-1,j-1) + 1_{a_i == b_j} 
	\end{cases}
	&  \text{otherwise}.
	\end{cases}
\end{equation}

### 实现
``` cpp
int longestCommonSubsequence(string text1, string text2) {
    int len1 = text1.length() + 1;
    int len2 = text2.length() + 1;
    std::vector<std::vector<int>> dp(len1, std::vector<int>(len2, 0));
    
    for (int i=1; i<len1; ++i) {
        for (int j=1; j<len2; ++j) {
            int len = text1[i-1] == text2[j-1] ? 1 : 0;
            dp[i][j] = std::max({dp[i-1][j], dp[i][j-1], dp[i-1][j-1]+len});
        }
    }

    return dp[len1-1][len2-1];
}
```
