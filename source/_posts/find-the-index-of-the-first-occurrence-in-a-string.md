---
title: LeetCode 28. 找出字符串中第一个匹配项的下标
date: 2022-10-14 23:45:56
categories: LeetCode
tags:
- dfs
- KMP
- 字符串查找
---

### 题目
[28. 找出字符串中第一个匹配项的下标](https://leetcode.cn/problems/find-the-index-of-the-first-occurrence-in-a-string/)
{% codelevel medium %}

给你两个字符串 haystack 和 needle ，请你在 haystack 字符串中找出 needle 字符串的第一个匹配项的下标（下标从 0 开始）。如果 needle 不是 haystack 的一部分，则返回  -1 。
<!-- more -->

### 题解
一、深度优先搜索
``` cpp
class Solution {
public:
    int dfs(std::string& haystack, int i, std::string& needle, int j) {
        if (j >= needle.size()) {
            return 0;
        }

        if (i >= haystack.size()) {
            return -1;
        }

        if (haystack[i] != needle[j]) {
            return -1;
        }

        return dfs(haystack, i+1, needle, j+1);
    }

    int strStr(string haystack, string needle) {
        for (int i=0; i<haystack.size(); ++i) {
            if (dfs(haystack, i, needle, 0) >= 0) {
                return i;
            }
        }

        return -1;
    }
};
```
二、顺序匹配
``` cpp
int strStr(string haystack, string needle) {
    for (int i=0; i+needle.size()<=haystack.size(); ++i) {
        int j = 0;
        for (; j<needle.size(); ++j) {
            if (haystack[i+j] != needle[j]) {
                break;
            }
        }

        if (j == needle.size()) {
            return i;
        }
    }

    return -1;
}
```
