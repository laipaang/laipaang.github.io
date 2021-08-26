---
title: LeetCode 155. 最小栈
date: 2021-09-23 00:33:31
categories: LeetCode
tags:
- 栈
- 单调栈
- stack
---

### 题目
[155. 最小栈](https://leetcode-cn.com/problems/min-stack/)
设计一个支持 push ，pop ，top 操作，并能在常数时间内检索到最小元素的栈。
<!-- more -->

- push(x) —— 将元素 x 推入栈中。
- pop() —— 删除栈顶的元素。
- top() —— 获取栈顶元素。
- getMin() —— 检索栈中的最小元素。

### 思路
由于栈是LIFO，维护一个元素和它底部的比较最小值的结构即可，它上部的值不影响这个元素处的最小值。

### 实现
``` cpp
class MinStack {
public:
    /** initialize your data structure here. */
    MinStack() {
        min_.push(std::numeric_limits<int>::max());
    }
    
    void push(int val) {
        s_.push(val);
        min_.push(std::min(val, min_.top()));
    }
    
    void pop() {
        s_.pop();
        min_.pop();
    }
    
    int top() {
        return s_.top();
    }
    
    int getMin() {
        return min_.top();
    }

private:
    std::stack<int> s_;
    std::stack<int> min_;
};
```
