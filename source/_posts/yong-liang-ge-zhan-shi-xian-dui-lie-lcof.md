---
title: 剑指 Offer 09. 用两个栈实现队列
date: 2022-12-29 23:44:12
categories: 剑指 Offer
tags:
- 队列
- 栈
---

### 题目
[09. 用两个栈实现队列](https://leetcode.cn/problems/yong-liang-ge-zhan-shi-xian-dui-lie-lcof/)
{% codelevel easy %}

用两个栈实现一个队列。队列的声明如下，请实现它的两个函数 appendTail 和 deleteHead ，分别完成在队列尾部插入整数和在队列头部删除整数的功能。(若队列中没有元素，deleteHead 操作返回 -1 )
<!-- more -->

### 实现
``` cpp
class CQueue {
public:
    CQueue() {
    }
    
    void appendTail(int value) {
        in.push(value);
    }
    
    int deleteHead() {
        if (in.empty() && out.empty()) {
            return -1;
        }

        if (out.empty()) {
            if (in.empty()) {
                return -1;
            }

            while (!in.empty()) {
                out.push(in.top());
                in.pop();
            }
        }

        int x = out.top();
        out.pop();

        return x;
    }

private:
    std::stack<int> in;
    std::stack<int> out;
};
```
