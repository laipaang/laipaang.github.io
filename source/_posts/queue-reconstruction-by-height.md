---
title: LeetCode 406. 根据身高重建队列
date: 2021-11-26 22:24:40
categories: LeetCode
tags:
---

### 题目
[406. 根据身高重建队列](https://leetcode-cn.com/problems/queue-reconstruction-by-height/)
难度: <span style="color: rgba(255, 161, 25, 1);">中等</span>

假设有打乱顺序的一群人站成一个队列，数组 `people` 表示队列中一些人的属性（不一定按顺序）。每个 `people[i] = [hi, ki]` 表示第 `i` 个人的身高为 `hi` ，前面 `正好` 有 `ki` 个身高大于或等于 `hi` 的人。
<!-- more -->

请你重新构造并返回输入数组 `people` 所表示的队列。返回的队列应该格式化为数组 `queue` ，其中 `queue[j] = [hj, kj]` 是队列中第 `j` 个人的属性（`queue[0]` 是排在队列前面的人）。

### 解法
直觉告诉我们应该将其按照身高进行排序以简化复杂性。排序后我们可以由高到低，也可以由低到高进行分析。

#### 一、由高到低
这种思路就是预先固定高的人的位置，因为低的人不会影响已经固定的高的人间相对顺序。需要注意的是：同样高度的，`比自己高的个数`小的先固定。在实现中由于后处理的元素要在处理过的序列中找到合适位置（足够多个大于等于它），存在插入操作，另外为了减少排序耗时，构造一个link，同时作为一个符号表，对其进行排序和删除插入，最后再映射回原始数据。

``` cpp
std::vector<std::vector<int>> resort(std::vector<std::vector<int>>& people) {
    // 构造链表link，方便插入删除，也充当symbol table角色
    std::list<int> link(people.size());
    int num = 0;
    for (auto& n: link) {
        n = num++;
    }

    // 排序：第一维由大->小  第二维由小-大
    link.sort([&people](int i, int j) {
        auto u = people[i];
        auto v = people[j];
        return u[0] > v[0] || (u[0] == v[0] && u[1] < v[1]);
    });

    auto it = link.begin();
    while (it != link.end()) {
        num = people[*it][1];
        if (num == 0) {
            ++it;
            continue;
        }

        auto bound = it;
        do {
            --bound;
        } while (--num > 0);
        
        link.insert(bound, *it);
        it = link.erase(it);
    }

    // 对link进行reverse即是答案
    num = 0;
    std::vector<std::vector<int>> ans(people.size());
    std::for_each(link.rbegin(), link.rend(), [&people, &ans, &num](int& n) {
        ans[num++] = people[n];
    });

    return ans;
}
```

#### 二、由低到高
从矮个子处理，为每个矮个前预留高个的个数 以确定矮个具体位置。

``` cpp
std::vector<std::vector<int>> resort2(std::vector<std::vector<int>>& people) {
    std::sort(people.begin(), people.end(), [](std::vector<int>& u, std::vector<int>& v) {
        return u[0] < v[0] || (u[0] == v[0] && u[1] > v[1]);
    });

    std::vector<std::vector<int>> ans(people.size());
    for (auto& u: people) {
        int i = 0; // 从头遍历
        int j = 0; // 预留个数
        while (j < u[1] || !ans[i].empty()) {
            if (ans[i].empty()) {
                ++j;
            }
            ++i;
        }
        ans[i] = u;
    }

    return ans;
}
```

