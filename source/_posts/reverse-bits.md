---
title: LeetCode 190. 颠倒二进制位
date: 2022-08-31 21:03:21
categories: LeetCode
tags: 位运算
---

### 题目
[190. 颠倒二进制位](https://leetcode.cn/problems/reverse-bits/)
{% codelevel easy %}

颠倒给定的 32 位无符号整数的二进制位。
<!-- more -->

### 题解
``` cpp
uint32_t reverseBits(uint32_t n) {
    uint32_t ans = 0;
    for (int i=0; i<32; ++i) {
        uint32_t bit = (n >> i) & 1;
        ans |= bit << (31-i);
    }

    return ans;
}
```
