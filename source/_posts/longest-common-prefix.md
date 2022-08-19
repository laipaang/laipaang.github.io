---
title: LeetCode 14. 最长公共前缀
date: 2021-11-17 22:39:18
categories: LeetCode
tags:
---

### 题目
[14. 最长公共前缀](https://leetcode-cn.com/problems/longest-common-prefix/)
{% codelevel easy %}

编写一个函数来查找字符串数组中的最长公共前缀。

如果不存在公共前缀，返回空字符串 `""`。

<!-- more -->

### 思路
todo

### 实现
``` cpp
string longestCommonPrefix(vector<string>& strs) {
    if (strs.empty()) {
        return "";
    }

    size_t len = std::numeric_limits<int>::max();
    for (auto& str: strs) {
        len = std::min(len, str.length());
    }

    for (int i=0; i<len; ++i) {
        for (int j=1; j<strs.size(); ++j) {
            if (strs[0][i] != strs[j][i]) {
                return strs[0].substr(0, i);;
            }
        }
    }

    return strs[0].substr(0, len);
}
```
