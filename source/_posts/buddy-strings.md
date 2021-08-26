---
title: LeetCode 859. 亲密字符串
date: 2021-11-23 21:25:05
categories: LeetCode
tags:
---

### 题目
[859. 亲密字符串](https://leetcode-cn.com/problems/buddy-strings/)
难度: <span style="color: rgba(90, 183, 38, 1);">简单</span>

给你两个字符串 `s` 和 `goal` ，只要我们可以通过交换 `s` 中的两个字母得到与 `goal` 相等的结果，就返回 `true` ；否则返回 `false` 。
<!-- more -->

交换字母的定义是：取两个下标 `i` 和 `j` （下标从 `0` 开始）且满足 `i != j` ，接着交换 `s[i]` 和 `s[j]` 处的字符。

例如，在 `"abcd"` 中交换下标 `0` 和下标 `2` 的元素可以生成 `"cbad"` 。

### 解法
需要分情况考虑。

一、当两个字符串相等时，只要字符串中存在重复字符，将重复字符交换即符合条件。

二、当两个字符串不相等时，我们只需要找到两个不相等的下标 `i` `j`，两个下标外部分都相等，且 `s[i] == goal[j] && s[j] == goal[i]` 

### 实现
``` cpp
bool buddyStrings(std::string s, std::string goal) {
    if (s.size() != goal.size()) {
        return false;
    }

    if (s == goal) {
        // 由于是26个小写字母 也可通过std::vector<int> h(26, 0)作为哈希表
        std::unordered_set<char> x;
        for (char c : s) {
            x.insert(c);
        }

        if (x.size() != s.size()) {
            return true;
        }

        return false;
    }

    int i = -1;
    int j = -1;
    for (int k = 0; k < s.size(); ++k) {
        if (s[k] != goal[k]) {
            if (i < 0) {
                i = k;
            } else if (j < 0) {
                j = k;
            } else {
                return false;
            }
        }
    }
    if (i < 0 || j < 0) {
        return false;
    }

    if (s[i] != goal[j] || s[j] != goal[i]) {
        return false;
    }

    return true;
}
```
