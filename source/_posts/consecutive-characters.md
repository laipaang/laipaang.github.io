---
title: LeetCode 1446. 连续字符
date: 2022-02-15 21:09:17
categories: LeetCode
tags:
---

### 题目
[1446. 连续字符](https://leetcode-cn.com/problems/consecutive-characters/)
难度: <span style="color: rgba(90, 183, 38, 1);">简单</span>

给你一个字符串 s ，字符串的「能量」定义为：只包含一种字符的最长非空子字符串的长度。

请你返回字符串的能量。
<!-- more -->

### 题解
``` cpp
int maxPower(string s) {
    if (s.size() < 2) {
        return s.size();
    }

    int max_len = 1;
    int cnt_len = 1;
    for (int i=1; i<s.size(); ++i) {
        if (s[i] != s[i-1]) {
            max_len = std::max(max_len, cnt_len);
            cnt_len = 1;
        } else {
            ++cnt_len;
        }
    }
    max_len = std::max(max_len, cnt_len);

    return max_len;
}
```
