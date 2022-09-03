---
title: LeetCode 1117. H2O 生成
date: 2022-09-03 19:39:23
categories: LeetCode
tags:
- 多线程
---

### 题目
[1117. H2O 生成](https://leetcode.cn/problems/building-h2o/)
{% codelevel medium %}

现在有两种线程，氧 oxygen 和氢 hydrogen，你的目标是组织这两种线程来产生水分子。

存在一个屏障（barrier）使得每个线程必须等候直到一个完整水分子能够被产生出来。
<!-- more -->

氢和氧线程会被分别给予 releaseHydrogen 和 releaseOxygen 方法来允许它们突破屏障。

这些线程应该三三成组突破屏障并能立即组合产生一个水分子。

你必须保证产生一个水分子所需线程的结合必须发生在下一个水分子产生之前。

换句话说:

如果一个氧线程到达屏障时没有氢线程到达，它必须等候直到两个氢线程到达。
如果一个氢线程到达屏障时没有其它线程到达，它必须等候直到一个氧线程和另一个氢线程到达。
书写满足这些限制条件的氢、氧线程同步代码。

### 题解
不知道对不对，反正AC了，先放在这儿吧，以后回过头再看看。

``` cpp
class H2O {
public:
    H2O() {
        
    }

    void hydrogen(function<void()> releaseHydrogen) {
        {
            std::unique_lock<std::mutex> l(h_m);
            h_cv.wait(l, [this]() {
                return h_c < 2;
            });

            ++h_c;
        }

        releaseHydrogen();

        std::lock_guard<std::mutex> lw(w_m);
        if (h_c + o_c == 3) {
            h_c = 0;
            o_c = 0;
            o_cv.notify_all();
            h_cv.notify_all();
        }
    }

    void oxygen(function<void()> releaseOxygen) {
        {
            std::unique_lock<std::mutex> l(o_m);
            o_cv.wait(l, [this]() {
                return o_c < 1;
            });

            ++o_c;
        }

        releaseOxygen();

        {
            std::lock_guard<std::mutex> lw(w_m);
            if (h_c + o_c == 3) {
                h_c = 0;
                o_c = 0;
                o_cv.notify_all();
                h_cv.notify_all();
            }
        }
    }
private:
    int h_c = 0;
    int o_c = 0;

    std::condition_variable h_cv;
    std::condition_variable o_cv;

    std::mutex h_m;
    std::mutex o_m;
    std::mutex w_m;
};
```
