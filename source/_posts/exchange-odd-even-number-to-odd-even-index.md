---
title: 牛客 奇数下标都是奇数或者偶数下标都是偶数
date: 2022-08-13 00:36:10
categories: 
tags: 双指针
---

### 题目
[牛客 奇数下标都是奇数或者偶数下标都是偶数](https://www.nowcoder.com/questionTerminal/335823db14b945ab95241a74cfcf1ae7)
难度: <span style="color: rgba(90, 183, 38, 1);">简单</span>

给定一个长度不小于2的数组arr，实现一个函数调整arr，要么让所有的偶数下标都是偶数，要么让所有的奇数下标都是奇数
<!-- more -->

**[要求]**
时间复杂度为O(n)，额外空间复杂度为O(1)

### 题解

``` cpp
#include<iostream>
#include<vector>

void exchange(std::vector<int>& nums) {
    int i = 0;
    int j = 1;
    while (i < nums.size() && j < nums.size()) {
        if (nums[i] % 2 == 0) {
            i += 2;
            continue;
        }
        if (nums[j] % 2 != 0) {
            j += 2;
            continue;
        }
        
        std::swap(nums[i], nums[j]);
    }
}

int main() {
    int n = 0;
    std::cin >> n;
    
    std::vector<int> nums(n, 0);
    for (int i=0; i<n; ++i) {
        std::cin >> nums[i];
    }
    
    exchange(nums);
    for (int num: nums) {
        std::cout << num << " ";
    }

    return 0;
}
```
