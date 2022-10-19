---
title: LeetCode 459. 重复的子字符串
date: 2022-10-19 23:32:06
categories: LeetCode
tags:
- 字符串
- KMP
---

### 题目
[459. 重复的子字符串](https://leetcode.cn/problems/repeated-substring-pattern/)
{% codelevel easy %}

给定一个非空的字符串 s ，检查是否可以通过由它的一个子串重复多次构成。
<!-- more -->

### 题解
``` cpp
bool repeatedSubstringPattern(string s) {
    auto isRepeated = [&s](int l) {
        for (int i=0; i<s.size()/l; ++i) {
            for (int j=0; j<l; ++j) {
                if (s[j] != s[i*l+j]) {
                    return false;
                }
            }
        }

        return true;
    };

    for (int l=1; l<=s.size()/2; ++l) {
        if (s.size() % l != 0) {
            continue;
        }

        if (isRepeated(l)) {
            return true;
        }
    }

    return false;
}
```

