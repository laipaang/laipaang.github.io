---
title: LeetCode 192. 统计词频
date: 2022-09-07 23:45:00
categories: LeetCode
tags:
- shell
---

### 题目
[192. 统计词频](https://leetcode.cn/problems/word-frequency/)
{% codelevel medium %}

写一个 bash 脚本以统计一个文本文件 words.txt 中每个单词出现的频率。

为了简单起见，你可以假设：

words.txt只包括小写字母和 ' ' 。
每个单词只由小写字母组成。
单词间由一个或多个空格字符分隔。

<!-- more -->

### 题解
``` sh
# Read from the file words.txt and output the word frequency list to stdout.

cat words.txt | tr -s ' ' '\n' | sort | uniq -c | sort -nr | awk '{print $2, $1}'
```
