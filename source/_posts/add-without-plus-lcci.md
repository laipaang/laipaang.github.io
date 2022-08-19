---
title: LeetCode 面试题 17.01. 不用加号的加法
date: 2022-08-20 02:21:56
categories: LeetCode
tags:
- 位运算
---

### 题目
[面试题 17.01. 不用加号的加法](https://leetcode.cn/problems/add-without-plus-lcci/)
{% codelevel easy %}

设计一个函数把两个数字相加。不得使用 + 或者其他算术运算符。
<!-- more -->

### 思路
`a ^ b` 无进位加  
`a & b` 进位位置1

在计算机中负数是以补码的形式表示的：  
1.解决0的符号问题  
2.减法转换为加法运算

### 题解
``` cpp
int add(int a, int b) {
    while (b) {
        uint32_t carry = a & b;
        a = a ^ b;
        b = carry << 1;
    }

    return a;
}
```
