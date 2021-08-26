---
title: LeetCode 5. 最长回文子串
date: 2022-03-02 22:39:57
categories: LeetCode
tags:
---

### 题目
[5. 最长回文子串](https://leetcode-cn.com/problems/longest-palindromic-substring/)
难度: <span style="color: rgba(255, 161, 25, 1);">中等</span>

给你一个字符串 s，找到 s 中最长的回文子串。
<!-- more -->

### 题解
``` cpp
string longestPalindrome(string s) {
    int pos = 0;
    int len = 0;

    // ababa -> a#b#a#b#a
    for (int i=0; i<s.size()*2-1; ++i) {
        int l = i/2;
        int r = i/2 + i%2;
        int x = 0;

        while (l>=0 && r<s.size() && s[l] == s[r]) {
            ++x;
            --l;
            ++r;
        }

        x = x*2 + i%2 - 1;
        if (x > len) {
            len = x;
            pos = i/2-(len-1)/2;
        }
    }

    return s.substr(pos, len);
}
```
