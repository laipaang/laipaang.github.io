---
title: LeetCode 195. 第十行
date: 2022-08-27 11:27:25
categories: LeetCode
tags:
- Shell
---

### 题目
[195. 第十行](https://leetcode.cn/problems/tenth-line/)
{% codelevel easy %}

给定一个文本文件 file.txt，请只打印这个文件中的第十行。
<!-- more -->

### 题解
#### 方法1
`sed -n 10p file.txt`

#### 方法2
`awk NR==10 file.txt`

#### 方法3
`tail -n+10 file.txt | head -n 1`
