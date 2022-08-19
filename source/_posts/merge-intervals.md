---
title: LeetCode 56. 合并区间
date: 2021-10-09 23:13:28
categories: LeetCode
tags:
- 数组
- 排序
mathjax: true
---

### 题目
[56. 合并区间](https://leetcode-cn.com/problems/merge-intervals/)
{% codelevel medium %}

以数组 `intervals` 表示若干个区间的集合，其中单个区间为 `intervals[i] = [starti, endi]` 。请你合并所有重叠的区间，并返回一个不重叠的区间数组，该数组需恰好覆盖输入中的所有区间。
<!-- more -->

### 思路
首先按区间下界对所有区间排序，时间复杂度 $O(n\log n)$。再从前往后遍历，对于有重叠的区间选择更大的上界，未重叠说明上一个区间合并结束。

### 实现
``` cpp
vector<vector<int>> merge(vector<vector<int>>& intervals) {
    if (intervals.size() < 2) {
        return intervals;
    }
    
    std::sort(intervals.begin(), intervals.end());

    std::vector<std::vector<int>> ans;
    std::vector<int> cur = intervals[0];
    for (int i=1; i<intervals.size(); ++i) {
        // 不和cur相交，cur合并结束
        if (intervals[i][0] > cur[1]) {
            ans.push_back(cur);
            cur = intervals[i];
            continue;
        }

        // 重叠则选择更大的上界
        if (intervals[i][1] > cur[1]) {
            cur[1] = intervals[i][1];
        }
    }
    // 循环外需要把最后一个区间添加到ans
    ans.push_back(cur);

    return ans;
}
```
