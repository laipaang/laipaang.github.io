---
title: LeetCode 338. 比特位计数
date: 2021-11-10 22:19:40
categories: LeetCode
tags:
- 位运算
---

### 题目
[543. 二叉树的直径](https://leetcode-cn.com/problems/counting-bits/)
{% codelevel easy %}

<!-- more -->

### 思路
todo

### 实现
``` cpp
vector<int> countBits(int n) {
    std::vector<int> ans;

    for (int i=0; i<=n; ++i) {
        int c = 0;
        int x = i;
        while (x > 0) {
            x = x & (x-1);
            ++c;
        }

        ans.push_back(c);
    }

    return ans;
}

vector<int> countBits(int n) {
    std::vector<int> ans(n+1, 0);

    for (int i=1; i<=n; ++i) {
        ans[i] = ans[i & (i-1)] + 1;
    }

    return ans;
}
```
