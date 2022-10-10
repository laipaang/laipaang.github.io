---
title: LeetCode 394. 字符串解码
date: 2022-10-10 23:01:35
categories: LeetCode
tags:
- 字符串
---

### 题目
[394. 字符串解码](https://leetcode.cn/problems/decode-string/)
{% codelevel medium %}

给定一个经过编码的字符串，返回它解码后的字符串。

编码规则为: k[encoded_string]，表示其中方括号内部的 encoded_string 正好重复 k 次。注意 k 保证为正整数。
<!-- more -->

你可以认为输入字符串总是有效的；输入字符串中没有额外的空格，且输入的方括号总是符合格式要求的。

此外，你可以认为原始数据不包含数字，所有的数字只表示重复的次数 k ，例如不会出现像 3a 或 2[4] 的输入。

### 题解
``` cpp
class Solution {
public:
    void expand(char* str, char** endstr, int& len, char* buff) {
        int k = 0;
        int n = 0;

        while (*str) {
            if (*str == ']') {
                ++str; // skip ']'
                break;
            }

            if (std::isdigit(*str)) {
                k = std::strtol(str, &str, 10);
                ++str; // skip '['

                // 1. 将括号中的展开，buff
                n = 0;
                expand(str, endstr, n, buff);

                // 2. 重复k-1次括号中的内容，步骤1中展开已经有1次了
                for (int i=0; i<k-1; ++i) {
                    std::memcpy(buff+n, buff, n);
                    buff += n;
                }
                buff += n;

                len += k*n;
                str = *endstr;
            } else { // just copy
                *buff++ = *str++;
                ++len;
            }
        }

        *endstr = str;
    }

    string decodeString(string s) {
        int n = 0;
        char buff[4096] = {0};
        char* str = const_cast<char*>(s.c_str());
        char* endstr = nullptr;

        expand(str, &endstr, n, buf);

        return std::string(buf);
    }
};
```
