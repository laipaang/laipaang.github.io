---
title: LeetCode 326. 3的幂
date: 2021-09-23 22:58:59
categories: LeetCode
tags:
mathjax: true
---

### 题目
[326. 3的幂](https://leetcode-cn.com/problems/power-of-three/)

给定一个整数，写一个函数来判断它是否是 3 的幂次方。如果是，返回 true ；否则，返回 false 。  
<!-- more -->
整数 $n$ 是 3 的幂次方需满足：存在整数 $x$ 使得 $n==3^x$

### 思路
#### 解法一
任何整数的0次幂都为1，对0做特殊处理。  
整数 $n$ 是 3 的幂次方满足两个条件：

- 不断可以整除3
- 最后剩余1

#### 解法二
参考LeetCode官方一种取巧的思路

> 在题目给定的 3232 位有符号整数的范围内，最大的 3 的幂为 $3^{19} = 11622614673$。我们只需要判断 n 是否是 $3^{19}$ 的约数即可。

### 实现
``` cpp
bool isPowerOfThree(int n) {
    if (n == 0) {
        return false;
    }

    while (n % 3 == 0) {
        n /= 3;
    }

    return n == 1;
}
```
