---
title: LeetCode 151. 反转字符串中的单词
date: 2022-10-21 00:08:35
categories: LeetCode
tags:
- 字符串
---

### 题目
[151. 反转字符串中的单词](https://leetcode.cn/problems/reverse-words-in-a-string/)
{% codelevel medium %}

给你一个字符串 s ，请你反转字符串中 单词 的顺序。
<!-- more -->

单词 是由非空格字符组成的字符串。s 中使用至少一个空格将字符串中的 单词 分隔开。

返回 单词 顺序颠倒且 单词 之间用单个空格连接的结果字符串。

注意：输入字符串 s中可能会存在前导空格、尾随空格或者单词间的多个空格。返回的结果字符串中，单词间应当仅用单个空格分隔，且不包含任何额外的空格。

### 题解
``` cpp
string reverseWords(string s) {
    if (s.empty()) {
        return s;
    }

    int n = s.size();
    // reverse sentence, std::revers(s.begin(), s.end())
    for (int i=0; i<n/2; ++i) {
        std::swap(s[i], s[n-1-i]);
    }

    // reverse word
    int i = 0; // start
    int j = 0; // end
    int l = 0; // space count
    while (i < n) {
        j = i + 1;
        l = 0;
        while (j < n) {
            if (s[j-1] != ' ' && s[j] == ' ') { // "  abc "
                break;
            }

            if (s[j-1] == ' ') {
                ++l;
            }

            ++j;
        }

        // will reverse space to the end same time
        std::reverse(s.begin() + i, s.begin() + j);
        i = j - l + 1; // +1 for space
    }

    // strip space
    while (s[--n] == ' ') {
    }
    s.resize(n+1);

    return s;
}
```
