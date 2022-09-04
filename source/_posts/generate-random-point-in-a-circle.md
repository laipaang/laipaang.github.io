---
title: LeetCode 478. 在圆内随机生成点
date: 2022-09-04 17:38:33
categories: LeetCode
tags:
- 拒绝采样
---

### 题目
[478. 在圆内随机生成点](https://leetcode.cn/problems/generate-random-point-in-a-circle/)
{% codelevel medium %}

给定圆的半径和圆心的位置，实现函数 randPoint ，在圆中产生均匀随机点。
<!-- more -->

实现 Solution 类:

Solution(double radius, double x_center, double y_center) 用圆的半径 radius 和圆心的位置 (x_center, y_center) 初始化对象
randPoint() 返回圆内的一个随机点。圆周上的一点被认为在圆内。答案作为数组返回 [x, y] 。

### 题解

解法一、拒绝采样
``` cpp
class Solution {
public:
    Solution(double radius, double x_center, double y_center) {
        _radius = radius;
        _x_center = x_center;
        _y_center = y_center;
    }

    vector<double> randPoint() {
        std::random_device rd;
        std::default_random_engine e(rd());
        std::uniform_real_distribution<double> u(-_radius, _radius);

        while (true) {
            double x = _x_center + u(e);
            double y = _y_center + u(e);

            if (std::pow(x-_x_center, 2) + std::pow(y-_y_center, 2) < std::pow(_radius, 2)) {
                return {x, y};
            }
        }
    }

private:
    double _radius;
    double _x_center;
    double _y_center;
};

/**
 * Your Solution object will be instantiated and called as such:
 * Solution* obj = new Solution(radius, x_center, y_center);
 * vector<double> param_1 = obj->randPoint();
 */
```

解法二、极坐标
``` cpp
class Solution {
public:
    Solution(double radius, double x_center, double y_center) {
        _radius = radius;
        _x_center = x_center;
        _y_center = y_center;

        
        std::random_device rd;
        e = std::default_random_engine(rd());
        u_r = std::uniform_real_distribution<double>(0, _radius * _radius); // 保证距离和面积比例一致
        u_theta = std::uniform_real_distribution<double>(0, 2 * M_PI);
    }

    vector<double> randPoint() {
        // 极坐标
        // 半径 [0, radius]
        // 角度 [0, 2π]

        double r = sqrt(u_r(e));
        double theta = u_theta(e);

        double x = r * cos(theta);
        double y = r * sin(theta);

        return {_x_center + x, _y_center + y};
    }

private:
    double _radius;
    double _x_center;
    double _y_center;

    std::default_random_engine e;
    std::uniform_real_distribution<double> u_r;
    std::uniform_real_distribution<double> u_theta;
};

/**
 * Your Solution object will be instantiated and called as such:
 * Solution* obj = new Solution(radius, x_center, y_center);
 * vector<double> param_1 = obj->randPoint();
 */
```
