---
title: LeetCode 208. 实现 Trie (前缀树)
date: 2022-08-28 00:23:15
categories: LeetCode
tags:
- 字典树
- 前缀树
- Trie
---

### 题目
[208. 实现 Trie (前缀树)](https://leetcode.cn/problems/implement-trie-prefix-tree/)
{% codelevel medium %}

`Trie`（发音类似 "try"）或者说 *`前缀树`* 是一种树形数据结构，用于高效地存储和检索字符串数据集中的键。这一数据结构有相当多的应用情景，例如自动补完和拼写检查。
<!-- more -->

请你实现 Trie 类：

- `Trie()` 初始化前缀树对象。
- `void insert(String word)` 向前缀树中插入字符串 `word` 。
- `boolean search(String word)` 如果字符串 `word` 在前缀树中，返回 `true`（即，在检索之前已经插入）；否则，返回 `false` 。
- `boolean startsWith(String prefix)` 如果之前已经插入的字符串 `word` 的前缀之一为 `prefix` ，返回 `true` ；否则，返回 `false` 。

### 题解
``` cpp
class Trie {
private:
    Trie* next[26] = {0};
    bool is_word = false;

public:
    Trie() {
    }
    
    void insert(string word) {
        Trie* node = this;
        for (auto c: word) {
            if (!node->next[c-'a']) {
                node->next[c-'a'] = new Trie();
            }

            node = node->next[c-'a'];
        }
        node->is_word = true;
    }
    
    bool search(string word) {
        Trie* node = this;
        for (auto c: word) {
            node = node->next[c-'a'];
            if (!node) {
                return false;
            }
        }

        return node->is_word;
    }
    
    bool startsWith(string prefix) {
        Trie* node = this;
        for (auto c: prefix) {
            node = node->next[c-'a'];
            if (!node) {
                return false;
            }
        }

        return true;
    }
};

/**
 * Your Trie object will be instantiated and called as such:
 * Trie* obj = new Trie();
 * obj->insert(word);
 * bool param_2 = obj->search(word);
 * bool param_3 = obj->startsWith(prefix);
 */
```
