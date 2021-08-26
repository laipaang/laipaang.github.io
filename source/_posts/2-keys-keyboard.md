---
title: LeetCode 650. 只有两个键的键盘
date: 2021-09-23 23:57:12
categories: LeetCode
tags:
mathjax: true
---

### 题目
[650. 只有两个键的键盘](https://leetcode-cn.com/problems/2-keys-keyboard/)

最初记事本上只有一个字符 'A' 。你每次可以对这个记事本进行两种操作：  
<!-- more -->
Copy All（复制全部）：复制这个记事本中的所有字符（不允许仅复制部分字符）。  
Paste（粘贴）：粘贴 上一次 复制的字符。  
给你一个数字 n ，你需要使用最少的操作次数，在记事本上输出 恰好 n 个 'A' 。返回能够打印出 n 个 'A' 的最少操作次数。

### 思路
1个 次数0  
2个 次数2（复制 粘贴）  
3个 次数3 (复制 粘贴 粘贴)
4个 次数4 (复制 粘贴*3) 或 (复制 粘贴 复制 粘贴)  
...  
以直觉来看，我们复制粘贴时基数约大，速度越快（次数越少），同时由于不能复制部分，所以需要考虑整除  
这道题成为因子分解题

### 实现
``` cpp
int minSteps(int n) {
    if (n < 2) {
        return 0;
    }

    for (int i=2; i*i<=n; ++i) {
        if (n % i == 0) {
            // 第一个i是minSteps(i)，由于i已经不能分解minStep(i) == i
            return i + minSteps(n/i);
        }
    }

    return n;
}
```
