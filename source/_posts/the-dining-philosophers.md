---
title: LeetCode 1226. 哲学家进餐
date: 2022-09-03 11:45:15
categories: LeetCode
tags:
- 多线程
---

### 题目
[1226. 哲学家进餐](https://leetcode.cn/problems/the-dining-philosophers/)
{% codelevel medium %}

5 个沉默寡言的哲学家围坐在圆桌前，每人面前一盘意面。叉子放在哲学家之间的桌面上。（5 个哲学家，5 根叉子）

所有的哲学家都只会在思考和进餐两种行为间交替。哲学家只有同时拿到左边和右边的叉子才能吃到面，而同一根叉子在同一时间只能被一个哲学家使用。每个哲学家吃完面后都需要把叉子放回桌面以供其他哲学家吃面。只要条件允许，哲学家可以拿起左边或者右边的叉子，但在没有同时拿到左右叉子时不能进食。
<!-- more -->

假设面的数量没有限制，哲学家也能随便吃，不需要考虑吃不吃得下。

设计一个进餐规则（并行算法）使得每个哲学家都不会挨饿；也就是说，在没有人知道别人什么时候想吃东西或思考的情况下，每个哲学家都可以在吃饭和思考之间一直交替下去。

### 题解
破坏环路等待条件

``` cpp
class DiningPhilosophers {
public:
    DiningPhilosophers() {
    }

    void wantsToEat(int philosopher,
                    function<void()> pickLeftFork,
                    function<void()> pickRightFork,
                    function<void()> eat,
                    function<void()> putLeftFork,
                    function<void()> putRightFork) {
        int l_fork = philosopher;
        int r_fork = (philosopher + 1) % 5;

        if (l_fork == 0) {
            std::swap(l_fork, r_fork);
        }

        std::lock_guard<std::mutex> l1(_mutex[l_fork]);
        std::lock_guard<std::mutex> l2(_mutex[r_fork]);
        pickRightFork();
        pickLeftFork();
        eat();
        putLeftFork();
        putRightFork();
    }

private:
    std::vector<std::mutex> _mutex = std::vector<std::mutex>(5);
};
```

