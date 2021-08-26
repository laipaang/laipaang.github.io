---
title: LeetCode 142. 环形链表II
date: 2021-09-22 21:35:53
categories: LeetCode
tags:
- 快慢指针
mathjax: true
---

### 题目
[142. 环形链表II](https://leetcode-cn.com/problems/linked-list-cycle-ii/)
给定一个链表，返回链表开始入环的第一个节点。 如果链表无环，则返回 null。
<!-- more -->

为了表示给定链表中的环，我们使用整数 pos 来表示链表尾连接到链表中的位置（索引从 0 开始）。 如果 pos 是 -1，则在该链表中没有环。注意，pos 仅仅是用于标识环的情况，并不会作为参数传递到函数中。

说明：不允许修改给定的链表。

### 思路
判断是否有环，解法见[141. 环形链表](/posts/linked-list-cycle/)
这里讨论如果存在环如何找到入环处？将带环链表抽象为如下几何形状
![](https://z3.ax1x.com/2021/10/10/5E5O7d.png)
*假设* 两个指针在环上$P$点相遇，在相遇时 慢指针在环上走了$m$圈，快指针在环上走了$n$圈（$m$和$n$都为自然数。且$m=0||m=1$，$n{\geq}m$）：  
链表直线长度记作: $x$   
链表环形周长记作: $c$  
弧$AP$长度记作: $y$

存在:  
$$\begin{equation}
\begin{aligned}
2*(x + m*c + y) &= x + n*c + y \\
x &= (n-m)*c -y \\
\end{aligned}
\end{equation}$$

所以，此时快指针移动到起点，慢指针从$P$点，两者步长都为1，再次相遇时在$A$

### 实现
``` cpp
ListNode *detectCycle(ListNode *head) {
    if (!head || !head->next) {
        return nullptr;
    }

    ListNode* fast = head;
    ListNode* slow = head;

    do {
        fast = fast->next->next;
        slow = slow->next;
    } while (fast && fast->next && fast!=slow);

    if (fast != slow) {
        return nullptr;
    }

    // 查找入环处
    fast = head;
    while (fast != slow) {
        fast = fast->next;
        slow = slow->next;
    }

    return fast;
}
```
