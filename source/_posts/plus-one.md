---
title: 加一
date: 2021-09-15 21:40:26
categories: leetcode
tags:
---

[66. 加一](https://leetcode-cn.com/problems/plus-one/)
给定一个由 整数 组成的 非空 数组所表示的非负整数，在该数的基础上加一。

最高位数字存放在数组的首位， 数组中每个元素只存储单个数字。

你可以假设除了整数 0 之外，这个整数不会以零开头。

<!-- more -->

``` cpp
vector<int> plusOne(vector<int>& digits) {
    if (digits.empty()) {
        return {};
    }

    std::vector<int> sums(digits.size(), 0);
    int carry = 1;
    for (int i=digits.size()-1; i>=0; --i) {
        int sum = digits[i] + sums[i] + carry;
        sums[i] =  sum % 10;
        carry = sum / 10;
    }
    if (carry) {
        sums.insert(sums.begin(), 1);
    }
    
    return sums;
}
```
