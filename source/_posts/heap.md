---
title: 堆
date: 2021-08-22 01:05:34
categories: 排序算法
tags: 
- 数据结构
- 排序算法
- 堆排序
---

对一个完全二叉树来说，所有父节点值都大于（小于）其左右子节点值，就是大堆（小堆）

<!-- more -->

``` cpp
/**
 * before
 *          1
 *      /      \
 *     3        5
 *  /    \     /  \
 *  4      6   13  10
 * / \    / \
 *    8  15 17
 * 
 * after
 *         17
 *      /      \
 *     15       13
 *  /    \     /  \
 *  4      9   5  10
 * / \    / \
 *    3  6   8
 */

#include <iostream>
#include <vector>

void adjustNode(int* arr, int len, int cur) {
    int l = cur * 2 + 1;
    int r = cur * 2 + 2;

    int latest = cur;
    if (l < len && arr[l] > arr[latest]) {
        latest = l;
    }
    if (r < len && arr[r] > arr[latest]) {
        latest = r;
    }
    if (latest != cur) {
        std::swap(arr[latest], arr[cur]);
        adjustNode(arr, len, latest);
    }
}

void buildHeap(int* arr, int len) {
    for (int cur=len / 2 - 1; cur>=0; --cur) {
        adjustNode(arr, len, cur);
    }
}

void HeapSort(int* arr, int len) {
    buildHeap(arr, len);

    for (int i=len-1; i>0; --i) {
        std::swap(arr[i], arr[0]);
        adjustNode(arr, i, 0);
    }
}

int main() {
    int arr[] = {1,3,5,4,6,13,10,9,8,15,17};
    for (auto _: arr) {
        std::cout << _  << " ";
    }
    std::cout << std::endl;

    //buildHeap(a, 11);
    HeapSort(arr, 11);

    for (auto _: arr) {
        std::cout << _  << " ";
    }
    std::cout << std::endl;

    return 0;
}
```
