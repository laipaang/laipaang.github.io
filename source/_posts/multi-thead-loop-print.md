---
title: 多个线程循环打印
date: 2024-02-23 13:54:01
categories:
tags:
- 多线程
---

### 题目
4线程，分别“不停地”不停地输出1、2、3、4。
<!-- more -->

### 题解
``` cpp
#include <cstdio>
#include <vector>
#include <thread>
#include <mutex>

int main() {
    std::mutex mtx;
    int flag = 0;

    auto fun = [&mtx, &flag](int i) {
        while (true) {
            std::lock_guard<std::mutex> l(mtx);
            if (flag % 4 == i) {
                printf("%d\n", i+1);
                ++flag;
            }
        }
    };

    std::vector<std::thread> ts;
    for (int i=0; i<4; ++i) {
      ts.push_back(std::thread(fun, i));
    }

    for (auto& t: ts) {
        t.join();
    }

    return 0;
}
```
