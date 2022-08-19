---
title: LeetCode 152. 乘积最大子数组
date: 2021-10-10 10:31:29
categories: LeetCode
tags:
- 子数组
mathjax: true
---

### 题目
[223. 矩形面积](https://leetcode-cn.com/problems/rectangle-area/)
{% codelevel medium %}

给你一个整数数组 `nums` ，请你找出数组中乘积最大的连续子数组（该子数组中至少包含一个数字），并返回该子数组所对应的乘积。
<!-- more -->

### 思路
由前向后遍历，对于元素 $e$，在它之前的最大子数组乘积记作 $PMX$，最小子数组乘积记作 $PMN$，包含 $e$ 的最大子数组乘积 $y$ 分三种情况讨论：

- $e=0$，$y=0$
- $e>0$，如果 $PMX>0$，$y=e*PMX$，否则 $y=e$
- $e<0$，如果 $PMN<0$，$y=e*PMN$，否则 $y=e$

包含 $e$ 的最小子数组乘积 $z$ 计算方式类似：

- $e=0$，$z=0$
- $e>0$，如果 $PMN<0$，$z=e*PMX$，否则 $z=e$
- $e<0$，如果 $PMN>0$，$z=e*PMX$，否则 $z=e$

**换种思路**  
我们并不是在遍历过程中只记录最大值和当前元素积作为最大值，最小值和当前元素积也可能作为最大值，我们只需要 记录 $PMN$ 、$PMX$，每个要素 $e$ 分别和 $PMN$ 、$PMX$ 的乘积，以及 $e$ 三者都有可能是最大值、最小值。 这样逻辑就简单多了。

### 实现
#### 自己繁琐方式
``` cpp
int maxProduct(vector<int>& nums) {
    int PMX = 0;
    int PMN = 0;
    int max = std::numeric_limits<int>::min();

    for (int i=0; i<nums.size(); ++i) {
        if (nums[i] == 0) {
            PMX = 0;
            PMN = 0;
        } else if (nums[i] > 0) {
            if (PMX > 0) {
                PMX *= nums[i];
            } else {
                PMX = nums[i];
            }

            if (PMN < 0) {
                PMN *= nums[i];
            } else {
                PMN = nums[i];
            }
        } else {
            int P_ = PMX;
            if (PMN < 0) {
                PMX = PMN * nums[i];
            } else {
                PMX = nums[i];
            }

            if (P_ > 0) {
                PMN = P_ * nums[i];
            } else {
                PMN = nums[i];
            }
        }

        max = std::max(max, PMX);
        max = std::max(max, PMN);
    }

    return max;
}
```

#### 官方简单方式
``` cpp
int maxProduct(vector<int>& nums) {
    if (nums.empty()) {
        return 0;
    }

    int PMN = nums[0];
    int PMX = nums[0];
    int ans = nums[0];

    for (int i=1; i<nums.size(); ++i) {
        auto p = std::minmax({nums[i], PMN * nums[i], PMX * nums[i]});
        PMN = p.first;
        PMX = p.second;
        ans = std::max(ans, PMX);
    }

    return ans;
}
```
