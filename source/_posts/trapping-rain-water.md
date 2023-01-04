---
title: LeetCode 42. 接雨水
date: 2023-01-04 23:24:51
categories: LeetCode
tags:
- 双指针
- 单调栈
---

### 题目
[42. 接雨水](https://leetcode.cn/problems/trapping-rain-water/description/)
{% codelevel hard %}

给定 n 个非负整数表示每个宽度为 1 的柱子的高度图，计算按此排列的柱子，下雨之后能接多少雨水。
<!-- more -->

### 题解
一、
``` cpp
class Solution {
class MaxStack {
public:
    MaxStack(int min=std::numeric_limits<int>::min()) {
        _s.push(min);
    }

    void push(int x) {
        int t = _s.top();
        _s.push(x > t ? x : t);
    }

    void pop() {
        if (_s.size() < 2) {
            return;
        }

        _s.pop();
    }

    int max() {
        return _s.top();
    }

private:
    std::stack<int> _s;
};

public:
    int trap(vector<int>& height) {
        MaxStack ls(0);
        MaxStack rs(0);
        int n = height.size();
        for (int i=n-1; i>=0; --i) {
            rs.push(height[i]);
        }

        int sum = 0;
        for (int i=0; i<n; ++i) {
            rs.pop();

            sum += std::max(std::min(ls.max(), rs.max()) - height[i], 0);

            ls.push(height[i]);
        }

        return sum;
    }
};
```

二、
``` cpp
int trap(vector<int>& height) {
    int n = height.size();
    if (n < 3) {
        return 0;
    }

    int l = 1;
    int r = n - 2;
    int lmax = height[l-1];
    int rmax = height[r+1];
    int sum = 0;
    while (l <= r) {
        if (lmax < rmax) {
            sum += std::max(std::min(lmax, rmax) - height[l], 0);
            lmax = std::max(lmax, height[l]);
            ++l;
        } else {
            sum += std::max(std::min(lmax, rmax) - height[r], 0);
            rmax = std::max(rmax, height[r]);
            --r;
        }
    }

    return sum;
}
```
