---
title: LeetCode 647. 回文子串
date: 2021-10-20 21:20:24
categories: LeetCode
tags:
---

### 题目
[647. 回文子串](https://leetcode-cn.com/problems/palindromic-substrings/)
难度: <span style="color: rgba(255, 161, 25, 1);">中等</span>

给你一个字符串 `s` ，请你统计并返回这个字符串中 `回文子串` 的数目。
<!-- more -->

回文字符串 是正着读和倒过来读一样的字符串。

子字符串 是字符串中的由连续字符组成的一个序列。

具有不同开始位置或结束位置的子串，即使是由相同的字符组成，也会被视作不同的子串。

### 思路
中心展开检查是否满足回文字符，考虑奇数或偶数个字符，中心位置总共有 `2*n-1` 个，分别是：
```
0 0  
0 1  
1 1  
1 0  
...
```
也就是 l = i / 2, r = i/2 + i%2

### 实现
``` cpp
int countSubstrings(string s) {
    int n = s.size();
    int ans = 0;

    for (int i=0; i<n*2-1; ++i) {
        int l = i / 2;
        int r = i / 2 + i % 2;
        while (l>=0 && r<n && s[l] == s[r]) {
            ++ans;
            --l;
            ++r;
        }
    }

    return ans;
}
```
