---
title: LeetCode 34. 在排序数组中查找元素的第一个和最后一个位置
date: 2021-09-27 08:04:04
categories: LeetCode
tags:
- 二分查找
---

### 题目
[34. 在排序数组中查找元素的第一个和最后一个位置](https://leetcode-cn.com/problems/find-first-and-last-position-of-element-in-sorted-array/) `中等`

给定一个按照升序排列的整数数组 nums，和一个目标值 target。找出给定目标值在数组中的开始位置和结束位置。

<!-- more -->
如果数组中不存在目标值 target，返回 [-1, -1]。

**进阶：**

你可以设计并实现时间复杂度为 O(log n) 的算法解决此问题吗？

### 思路
二分查找，`<algorithm>`提供的函数有：
`std::equal_range`

#### Possible implementation
``` cpp
template<class ForwardIt, class T, class Compare>
std::pair<ForwardIt,ForwardIt> 
    equal_range(ForwardIt first, ForwardIt last,
                const T& value, Compare comp)
{
    return std::make_pair(std::lower_bound(first, last, value, comp),
                          std::upper_bound(first, last, value, comp));
}
```

``` cpp
// greater or equal to
ForwardIt lower_bound(ForwardIt first, ForwardIt last, const T& value, Compare comp)
// greater than
ForwardIt upper_bound(ForwardIt first, ForwardIt last, const T& value, Compare comp)
// equal
bool binary_search(ForwardIt first, ForwardIt last, const T& value)
```

### 实现
#### equal_range
``` cpp
vector<int> searchRange(vector<int>& nums, int target) {
    auto pair = std::equal_range(nums.begin(), nums.end(), target);
    if (pair.first == nums.end() || *pair.first != target) {
        return {-1, -1};
    }

    return { int(pair.first - nums.begin()), int(pair.second-nums.begin()-1) };
}
```

#### bound函数
``` cpp
vector<int> searchRange(vector<int>& nums, int target) {
    auto l = std::lower_bound(nums.begin(), nums.end(), target);
    if (l == nums.end() || *l!=target) {
        return {-1, -1};
    }

    auto r = std::upper_bound(nums.begin(), nums.end(), target);

    return { int(l - nums.begin()), int(r-nums.begin()-1) };
}
```
