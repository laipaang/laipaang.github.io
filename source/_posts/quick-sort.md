---
title: 快速排序
date: 2021-10-09 21:32:11
categories: 排序算法
tags:
- 排序算法
- 快排
- 分治
- 递归
mathjax: true
---

[`快速排序`](https://zh.wikipedia.org/wiki/%E5%BF%AB%E9%80%9F%E6%8E%92%E5%BA%8F)（Quicksor）由东尼·霍尔提出。是一种平均时间复杂度为 $O(n\log n)$ 的排序算法。
<!-- more -->

### 原理
`快排` 是分治的思想。对于一个排序问题，将一个元素放在 `正确位置`（大于等于左侧元素，小于等于右侧元素），而该元素将序列拆分为两部分，再在各部分子问题继续求解。

每次将一个元素放在正确位置耗时为 $n$，假设每次拆分都是长度比较接近的两部分，那么拆分的子问题个数为 $\log n$，所以时间复杂度为 $O(n\log n)$；如果每次拆分的一个子问题长度接近 $n$，时间复杂度为 $O(n^2)$。

### 算法
#### Partition
将一个元素放在 `正确位置` 的步骤称为 `Partition`，是快排的核心。这个元素也称为基准（pivot），具体过程：

1. 挑选基准（可随机挑选，避免拆分不均）
2. 分割序列
3. 返回基准

其中，分割序列是将小于基准的元素调整到它的左侧，大于基准的元素调整到它的右侧。假设挑选的基准是序列最右的元素，我们从左往右遍历元素至基准。在遍历过程中，维护一个lower_bound，保证它右侧值都大于等于基准，否则将其和右侧值交换，并将lower_bound++。这样，遍历结束时lower_bound左侧的都小于基准，lower_bound就是基准应该调整到的位置。

#### 递归调用
对于快排来说，就是不断进行 `Partition` ，再递归对左区间和右区间进行排序，直到区间大小为1。

### 实现
``` cpp
int partition(std::vector<int>& vec, int low, int high) {
    // right 基准
    // lower_bound 大于等于基准
    int lower_bound = low;
    for (int i=low; i<high; ++i) {
        if (vec[i] < vec[high]) {
            std::swap(vec[lower_bound], vec[i]);
            ++lower_bound;
        }
    }
    std::swap(vec[lower_bound], vec[high]);

    return lower_bound;
}

void quick_sort(std::vector<int>& vec, int low, int high) {
    if (low >= high) {
        return;
    }

    int bound = partition(vec, low, high);
    quick_sort(vec, low, bound-1);
    quick_sort(vec, bound+1, high);
}
```

``` cpp
int main() {
    std::vector<int> v = {1, 2, 5};

    quick_sort(v, 0, v.size()-1);

    std::for_each(v.begin(), v.end(), [](int& n){
        std::cout << n << " ";
    });
    std::cout << std::endl;

    return 0;
}
```
