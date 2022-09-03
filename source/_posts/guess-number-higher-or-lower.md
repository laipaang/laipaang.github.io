---
title: LeetCode 374. 猜数字大小
date: 2022-09-03 20:02:37
categories: LeetCode
tags:
- 二分搜索
---

### 题目
[374. 猜数字大小](https://leetcode.cn/problems/guess-number-higher-or-lower/)
{% codelevel easy %}

猜数字游戏的规则如下：

每轮游戏，我都会从 1 到 n 随机选择一个数字。 请你猜选出的是哪个数字。
如果你猜错了，我会告诉你，你猜测的数字比我选出的数字是大了还是小了。
你可以通过调用一个预先定义好的接口 int guess(int num) 来获取猜测结果，返回值一共有 3 种可能的情况（-1，1 或 0）：
<!-- more -->

-1：我选出的数字比你猜的数字小 pick < num
1：我选出的数字比你猜的数字大 pick > num
0：我选出的数字和你猜的数字一样。恭喜！你猜对了！pick == num
返回我选出的数字。

### 题解
看到了16年的[提交记录](https://leetcode.cn/submissions/detail/181487193/)，当时用java写的，真的蹩脚

``` cpp
int guessNumber(int n) {
    int l = 1;
    int r = n;
    while (l <= r) {
        int m = l + (r - l) / 2;
        int g = guess(m);
        if (g == 0) {
            return m;
        } else if (g > 0) {
            l = m + 1;
        } else {
            r = m - 1;
        }
    }

    return -1;
}
```
