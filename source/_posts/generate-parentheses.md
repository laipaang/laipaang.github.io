---
title: 括号生成
date: 2021-08-26 23:54:02
categories: leetcode
tags:
- dfs
- 深度优先
- 递归
---
[22. 括号生成](https://leetcode-cn.com/problems/generate-parentheses/)
数字 n 代表生成括号的对数，请你设计一个函数，用于能够生成所有可能的并且 有效的 括号组合。
有效括号组合需满足：左括号必须以正确的顺序闭合。

<!-- more -->

``` cpp
#include <iostream>
#include <string>
#include <vector>

void dfs(int l, int r, int n, std::string str, std::vector<std::string>& ret) {
    if (l == n && r == n) {
        ret.push_back(str);
        return;
    }

    if (r < l) {
        if (l<n) {
            dfs(l+1, r, n, str+"(", ret);
        }
        if (r<n) {
            dfs(l, r+1, n, str+")", ret);
        }
    } else {
        dfs(l+1, r, n, str+"(", ret);
    }
}

std::vector<std::string> generateParenthesis(int n) {
    std::vector<std::string> ret;
    dfs(0, 0, n, "", ret);

    return ret;
}

int main() {
    auto v = generateParenthesis(3);
    for (auto _: v) {
        std::cout << _ << std::endl;
    }

    return 0;
}
```
