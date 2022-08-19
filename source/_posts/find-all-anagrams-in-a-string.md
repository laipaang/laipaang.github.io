---
title: LeetCode 438. 找到字符串中所有字母异位词
date: 2021-12-23 21:35:23
categories: LeetCode
tags:
- 哈希表
- 滑动窗口
---

### 题目
[LeetCode 438. 找到字符串中所有字母异位词](https://leetcode-cn.com/problems/find-all-anagrams-in-a-string/)
{% codelevel medium %}

给定两个字符串 `s` 和 `p`，找到 `s` 中所有 `p` 的 `异位词` 的子串，返回这些子串的起始索引。不考虑答案输出的顺序。
<!-- more -->
`异位词` 指由相同字母重排列形成的字符串（包括相同的字符串）。

### 思路
- 将目标词和候选词按字母顺序排序，和目标词相等的候选词即是异位词
- 如字符串仅由26个小写字母组成，构建 int[26] hash；若目标词和候选词互为异位词，两者包含的各字符计数值相同。

在实现时注意使用滑动窗口思想：下一个候选词相当于当前候选词，删除第一个字符，后面追加一个字符，只用修改两个统计值，而不是全部重新统计。

### 实现
``` cpp
std::vector<int> findAnagrams(std::string s, std::string p) {
    if (s.size() < p.size()) {
        return {};
    }
    
    // 异位词查找：1.将目标词和候选词按字母顺序排序，和目标词相等的候选词即是异位词；2.如字符串仅由26个小写字母组成，构建 int[26] hash；若目标词和候选词互为异位词，两者包含的各字符计数值相同。
    std::vector<int> count_p(26, 0);
    std::vector<int> count_s(26, 0);
    int len = p.size();
    for (int i=0; i<len; ++i) {
        ++count_p[p[i]-'a'];
        ++count_s[s[i]-'a'];
    }

    std::vector<int> ans;
    for (int i=0;;) {
        if (count_p == count_s) {
            ans.push_back(i);
        }

        --count_s[s[i]-'a'];
        ++i;
        if (i+len<=s.size()) {
            ++count_s[s[i+len-1]-'a'];
        } else {
            break;
        }
    }

    return ans;
}
```
