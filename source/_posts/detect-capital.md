---
title: LeetCode 520. 检测大写字母
date: 2022-01-20 22:35:07
categories: LeetCode
tags:
---

### 题目
[520. 检测大写字母](https://leetcode-cn.com/problems/detect-capital/)
难度: <span style="color: rgba(90, 183, 38, 1);">简单</span>

我们定义，在以下情况时，单词的大写用法是正确的：
<!-- more -->

全部字母都是大写，比如 "USA" 。
单词中所有字母都不是大写，比如 "leetcode" 。
如果单词不只含有一个字母，只有首字母大写， 比如 "Google" 。
给你一个字符串 word 。如果大写用法正确，返回 true ；否则，返回 false 。

### 解法
``` cpp
bool detectCapitalUse(string word) {
    size_t up_len = 0;
    size_t lo_len = 0;

    for (int i=0; i<word.size(); ++i) {
        char c = word[i];
        if (c < 'a') {
            ++up_len;
        } else {
            ++lo_len;
        }
    }

    // std::cout << "up_len: " << up_len << std::endl;
    // std::cout << "lo_len: " << lo_len << std::endl;
    
    return up_len == word.size() || lo_len == word.size() || (up_len == 1 && word[0] < 'a');
}
```
