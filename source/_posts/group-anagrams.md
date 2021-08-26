---
title: LeetCode 49. 字母异位词分组
date: 2021-09-29 00:16:20
categories: LeetCode
tags:
- 字典
- hash
---

### 题目
[49. 字母异位词分组](https://leetcode-cn.com/problems/group-anagrams/) `中等`

给你一个字符串数组，请你将 `字母异位词` 组合在一起。可以按任意顺序返回结果列表。
<!-- more -->

`字母异位词` 是由重新排列源单词的字母得到的一个新单词，所有源单词中的字母都恰好只用一次。

### 思路
字母异位词在排序后对应相同的词，利用这个性质将排序后的词作为`key`构建字典，字典`value`是异位词的列表

### 实现
``` cpp
vector<vector<string>> groupAnagrams(vector<string>& strs) {
    std::unordered_map<std::string, std::vector<std::string>> dict;
    for (auto& str: strs) {
        auto key = str;
        std::sort(key.begin(), key.end());

        auto it = dict.find(key);
        if (it == dict.end()) {
            dict.insert({key, {str}});
        } else {
            it->second.push_back(str);
        }
    }

    std::vector<std::vector<std::string>> ans;
    for (auto& kv: dict) {
        ans.push_back(kv.second);
    }

    return ans;
}
```
