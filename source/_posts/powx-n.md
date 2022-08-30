---
title: LeetCode 50. Pow(x, n)
date: 2022-08-29 23:17:06
categories: LeetCode
tags:
- 递归
---

### 题目
[50. Pow(x, n)](https://leetcode.cn/problems/powx-n/)
{% codelevel medium %}

实现 `pow(x, n)` ，即计算 `x` 的整数 `n` 次幂函数（即，`x^n` ）。
<!-- more -->

### 题解
``` cpp
double myPow(double x, int n) {
    long long N = n;
    if (N < 0) {
        return 1 / quickMul(x, -N);
    } else {
        return quickMul(x, N);
    }
}
```

一、递归
``` cpp
double quickMul(double x, long long n) {
    if (n == 0) {
        return 1;
    }

    double y = quickMul(x, n/2);
    if (n % 2 == 0) {
        return y*y;
    } else {
        return y*y*x;
    }
}
```

二、迭代
``` cpp
double quickMul(double x, long long n) {
    long long N =  n;

    double y = 1;
    while (N) {
        if (N & 1) {
            y *= x;
        }
        x *= x;
        N = N >> 1;
    }

    return y;
}
```
