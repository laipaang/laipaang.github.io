---
title: LeetCode 1796. 字符串中第二大的数字
date: 2023-03-05 20:05:24
categories: LeetCode
tags:
- 双指针
---

### 题目
[1796. 字符串中第二大的数字](https://leetcode.cn/problems/second-largest-digit-in-a-string/description/)
{% codelevel easy %}

给你一个混合字符串 s ，请你返回 s 中 第二大 的数字，如果不存在第二大的数字，请你返回 -1 。

混合字符串 由小写英文字母和数字组成。
<!-- more -->

### 题解
``` cpp
int secondHighest(string s) {
    int top1 = -1;
    int top2 = -1;
    for (int i=0; i<s.size(); ++i) {
        if (s[i] >= '0' && s[i] <= '9') {
            int n = s[i] - '0';
            if (n > top1) {
                top2 = top1;
                top1 = n;
            }
            else if (n != top1 && n > top2) {
                top2 = n;
            }
        }
    }

    return top2;
}
```
