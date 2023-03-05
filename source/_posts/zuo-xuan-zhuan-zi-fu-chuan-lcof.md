---
title: 剑指 Offer 58 - II. 左旋转字符串
date: 2023-01-05 13:37:41
categories: 剑指 Offer
tags:
- 字符串
---

### 题目
[58 - II. 左旋转字符串](https://leetcode.cn/problems/zuo-xuan-zhuan-zi-fu-chuan-lcof/description/)
{% codelevel easy %}

字符串的左旋转操作是把字符串前面的若干个字符转移到字符串的尾部。请定义一个函数实现字符串左旋转操作的功能。比如，输入字符串"abcdefg"和数字2，该函数将返回左旋转两位得到的结果"cdefgab"。
<!-- more -->

### 题解
一、
``` cpp
string reverseLeftWords(string s, int n) {
    std::string r = s;
    int l = s.size();

    for (int i=0; i<s.size(); ++i) {
        n = n % l;

        int j = i-n>=0 ? i-n : l-(n-i);
        r[j] = s[i];
    }

    return r;
}
```

二、
``` cpp
string reverseLeftWords(string s, int n) {
    return s.substr(n) + s.substr(0, n);
}
```
