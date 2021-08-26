---
title: LeetCode 139. 单词拆分
date: 2022-02-18 00:31:42
categories: LeetCode
tags:
- dfs
- 动态规划
---

### 题目
[139. 单词拆分](https://leetcode-cn.com/problems/word-break/)
难度: <span style="color: rgba(255, 161, 25, 1);">中等</span>

给你一个字符串 s 和一个字符串列表 wordDict 作为字典。请你判断是否可以利用字典中出现的单词拼接出 s 。

注意：不要求字典中出现的单词全部都使用，并且字典中的单词可以重复使用。

<!-- more -->

### 题解
#### dfs
``` cpp
bool dfs(string& s, std::unordered_set<std::string> set, int pos, int len, std::unordered_map<int, bool>& cache) {
    if (pos + len > s.size()) {
        return false;
    }

    auto it = cache.find(pos << 16 | len);
    if (it != cache.end()) {
        return it->second;
    }

    bool ret = false;
    if (set.count(s.substr(pos, len)) > 0) {
        if (pos+len == s.size()) {
            return true;
        }
        ret = dfs(s, set, pos+len, 1, cache) || dfs(s, set, pos, len+1, cache);
    } else {
        ret = dfs(s, set, pos, len+1, cache);
    }

    cache.insert({pos << 16 | len, ret});

    return ret;
}

bool wordBreak(string s, vector<string>& wordDict) {
    std::unordered_set<std::string> set(wordDict.begin(), wordDict.end());
    std::unordered_map<int, bool> cache;

    return dfs(s, set, 0, 1, cache);
}
```

#### 动态规划
``` cpp
bool wordBreak(string s, vector<string>& wordDict) {
    std::unordered_set<std::string> set(wordDict.begin(), wordDict.end());

    std::vector<int> dp(s.size()+1, 0);
    dp[0] = 1;

    for (int i=1; i<=s.size(); ++i) {
        for (int j=0; j<i; ++j) {
            if (dp[j] == 1 && set.count(s.substr(j, i-j)) > 0) {
                dp[i] = 1;
                break;
            }
        }
    }

    return dp[s.size()];
}
```
