---
title: LeetCode 621. 任务调度器
date: 2021-10-14 08:20:49
categories: LeetCode
comments: true
tags:
- 贪心
- 抵消法
- 哈希表
---
### 题目
[621. 任务调度器](https://leetcode-cn.com/problems/task-scheduler/)
{% codelevel medium %}

给你一个用字符数组 `tasks` 表示的 `CPU` 需要执行的任务列表。其中每个字母表示一种不同种类的任务。任务可以以任意顺序执行，并且每个任务都可以在 `1` 个单位时间内执行完。在任何一个单位时间，CPU 可以完成一个任务，或者处于待命状态。
<!-- more -->

然而，两个 `相同种类` 的任务之间必须有长度为整数 `n` 的冷却时间，因此至少有连续 `n` 个单位时间内 `CPU` 在执行不同的任务，或者在待命状态。

你需要计算完成所有任务所需要的 `最短时间` 。

### 思路
统计每种任务个数。其中，最多任务个数记作 `i`，大于等于 `i` 的任务种类有 `j` 个。

如果，任务个数少于 `(i-1）* (n+1)`。构建一个 `(i-1) * (n+1)` 的矩阵，矩阵的 `1 ~ j` 列排任务数等于 `i` 的 `j` 个任务，第 `i` 行排 `j` 个任务，这样总的时间是 `(i-1) * (n+1) + j`。

如果，任务个数大于 `(i-1）* (n+1)`。将 `(i-1）* (n+1)` 还是按上面的排，对于另外的任务直接排列在i-1行的任意行后面即可，这样总的时间是 任务的个数。

### 实现
``` cpp
int leastInterval(vector<char>& tasks, int n) {
    // 统计每种任务数，其中最大任务数为i，>=i的任务数有j个
    // 构建矩阵 (i-1) * (n+1)
    // a = (i-1) * (n+1) + j，没有排满矩阵
    // b = tasks.size()，排满矩阵，在i-1行后面插入其他任务
    // std::max(a, b)，选择a说明有间隙, 选择b说明没有间隙
    int cnt = 0;

    std::vector<int> m(26, 0);
    int i = 0;
    for (auto c: tasks) {
        int k = c - 'A';
        i = std::max(i, ++m[k]);
    }

    int j = 0;
    for (auto v: m) {
        if (v == i) {
            ++j;
        }
    }

    int a = (i-1) * (n+1) + j;
    int b = tasks.size();

    return std::max(a, b);
}
```
