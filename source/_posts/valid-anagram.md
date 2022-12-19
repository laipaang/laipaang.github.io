---
title: LeetCode 242. 有效的字母异位词
date: 2022-12-19 23:35:53
categories: LeetCode
tags:
- 字符串
---

### 题目
[242. 有效的字母异位词](https://leetcode.cn/problems/valid-anagram/description/)
{% codelevel easy %}

给定两个字符串 s 和 t ，编写一个函数来判断 t 是否是 s 的字母异位词。

注意：若 s 和 t 中每个字符出现的次数都相同，则称 s 和 t 互为字母异位词。
<!-- more -->

### 题解
``` cpp
bool isAnagram(string s, string t) {
    if (s.size() != t.size()) {
        return false;
    }

    std::vector<int> s_cnt(26, 0);
    std::vector<int> t_cnt(26, 0);
    for (int i=0; i<s.size(); ++i) {
        s_cnt[s[i]-'a'] += 1;
        t_cnt[t[i]-'a'] += 1;
    }

    return s_cnt == t_cnt;
}
```
