---
title: LeetCode 739. 每日温度
date: 2021-10-10 23:29:04
categories: LeetCode
tags:
- 栈
- 单调栈
---

### 题目
[739. 每日温度](https://leetcode-cn.com/problems/daily-temperatures/)
难度: <span style="color: rgba(255, 161, 25, 1);">中等</span>

请根据每日 `气温` 列表 `temperatures` ，请计算在每一天需要等几天才会有更高的温度。如果气温在这之后都不会升高，请在该位置用 `0` 来代替。
<!-- more -->

### 思路
#### 暴力搜
对于每个元素，向后搜索第一个比它大的值，计算两者的距离。时间复杂度 O(n^2)

#### 单调栈
维护一个存放下标的栈，栈底到栈顶对应的温度单调递减。我们从后向前遍历元素，对于每个元素：

- 如果栈不为空，不断弹出栈中的值，直到对应的温度大于当前值，两者距离即是该元素的解
- 如果栈为空，那么说明原数组中它后面不存在比它高的温度，元素解为 `0`
- 当前元素入栈

由于，我们弹出的是比当前元素小的值，不用担心后面遍历元素的解被弹出。

### 实现
``` cpp
vector<int> dailyTemperatures(vector<int>& temperatures) {
    std::vector<int> ans(temperatures.size(), 0);

    std::stack<int> s;
    for (int i=temperatures.size()-1; i>=0; --i) {
        while (!s.empty() && temperatures[s.top()] <= temperatures[i]) {
            s.pop();
        }
        ans[i] = s.empty() ? 0 : s.top() - i;

        s.push(i);
    }
    
    return ans;
}
```
