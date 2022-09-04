---
title: LeetCode 470. 用 Rand7() 实现 Rand10()
date: 2022-09-04 16:58:29
categories: LeetCode
tags:
- 拒绝采样
---

### 题目
[470. 用 Rand7() 实现 Rand10()](https://leetcode.cn/problems/implement-rand10-using-rand7/)
{% codelevel medium %}

给定方法 rand7 可生成 [1,7] 范围内的均匀随机整数，试写一个方法 rand10 生成 [1,10] 范围内的均匀随机整数。

你只能调用 rand7() 且不能调用其他方法。请不要使用系统的 Math.random() 方法。

每个测试用例将有一个内部参数 n，即你实现的函数 rand10() 在测试时将被调用的次数。请注意，这不是传递给 rand10() 的参数。
<!-- more -->

### 题解
``` cpp
int rand10() {
    int a = 0;
    int b = 0;
    int r = 0;

    while (true) {
        a = (rand7() - 1) * 7; // [0 - 6] * 7
        b = rand7();           // [1 - 7]
        r = a + b;             // [1 - 49] // 每个组合唯一，概率相等
        if (r <= 40) {
            return r % 10 + 1;
        }

        a = (rand7() - 1) * 9;
        b = r - 40;
        r = a + b;
        if (r <= 60) {
            return r % 10 + 1;
        }

        a = (r -  60 - 1) * 7;
        b = rand7();
        r = a + b;
        if (r <= 20) {
            return r % 10 + 1;
        }
    }
}
```
