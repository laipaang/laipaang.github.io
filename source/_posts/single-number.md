---
title: LeetCode 136. 只出现一次的数字
date: 2021-10-08 09:13:31
categories: LeetCode
tags:
- 位运算
mathjax: true
---

### 题目
[136. 只出现一次的数字](https://leetcode-cn.com/problems/single-number/)
{% codelevel easy %}

给定一个非空整数数组，除了某个元素只出现一次以外，其余每个元素均出现两次。找出那个只出现了一次的元素。

<!-- more -->
**说明：**

你的算法应该具有线性时间复杂度。 你可以不使用额外空间来实现吗？

### 思路
#### 哈希表
遍历中 `std::unordered_map` 统计每个元素出现的次数，再遍历一遍统计出现一次的元素。时间复杂度 $O(1)$，空间复杂度 $O(n)$

#### 差值
遍历一次求和 `sum_v`，并插入到`std::unordered_set` `s`，对 `s` 求和 `sum_s`。那么，出现一次的元素为：$sum_s*2-sum_v$

#### 位运算
那些出现2次元素每一位二进制位1的个数是偶数个，所以按位异或后为0，剩下的就是出现一次的元素。

### 实现
``` cpp
int singleNumber(vector<int>& nums) {
    int ans = 0;
    std::for_each(nums.begin(), nums.end(), [&](const int& n) {
        ans ^= n;
    });

    return ans;
}
```

### 知识
**std::for_each**  
Unlike the rest of the parallel algorithms, for_each **is not allowed to make copies** of the elements in the sequence even if they are trivially copyable.
