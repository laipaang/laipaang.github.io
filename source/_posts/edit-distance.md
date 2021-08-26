---
title: LeetCode 72. 编辑距离
date: 2021-11-17 00:33:41
categories: LeetCode
tags:
- 动态规划
- 编辑距离
- 莱文斯坦（Levenshtein）距离
mathjax: true
---

### 题目
[72. 编辑距离](https://leetcode-cn.com/problems/edit-distance/)
难度: <span style="color: rgba(255, 161, 25, 1);">中等</span>

给你两个单词 `word1` 和 `word2`，请你计算出将 `word1` 转换成 `word2` 所使用的最少操作数 。

<!-- more -->

你可以对一个单词进行如下三种操作：

- 插入一个字符
- 删除一个字符
- 替换一个字符

### 思路
动态规划
$$
\begin{equation}
	lev_{a,b}(i,j)=\begin{cases}
	max(i,j) &  \text{if }min(i,j) = 0, \\
    \\
	min\begin{cases}
	lev_{a,b}(i-1,j) + 1 \\
	lev_{a,b}(i,j-1) + 1 \\
	lev_{a,b}(i-1,j-1) + 1_{a_i \neq b_j} 
	\end{cases}
	&  \text{otherwise}.
	\end{cases}
\end{equation}
$$
其中，$0\le i\le|a|,\text{ } 0\le j\le|b|$

todo

### 实现
``` cpp
int minDistance(std::string word1, std::string word2) {
    int len1 = word1.size();
    int len2 = word2.size();
    if (len1*len2 == 0) {
        return len1 + len2;
    }
    
    std::vector<std::vector<int>> dp(len1+1, std::vector<int>(len2+1, 0));
    for (int i=0; i<=len1; ++i) {
        for (int j=0; j<=len2; ++j) {
            if (std::min(i, j) == 0) {
                dp[i][j] = std::max(i, j);
            } else {
                // 注意i和j转成字符下标需要减1
                int d = word1[i-1] != word2[j-1] ? 1 : 0;
                dp[i][j] = std::min({dp[i-1][j]+1, dp[i][j-1]+1, dp[i-1][j-1]+d});
            }
        }
    }

    return dp[len1][len2];
}
```


