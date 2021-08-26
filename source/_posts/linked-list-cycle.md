---
title: LeetCode 141. 环形链表
date: 2021-09-22 20:11:42
categories: LeetCode
tags:
- 快慢指针
---

### 题目
[141. 环形链表](https://leetcode-cn.com/problems/linked-list-cycle/)
给定一个链表，判断链表中是否有环。
<!-- more -->

如果链表中有某个节点，可以通过连续跟踪 next 指针再次到达，则链表中存在环。 为了表示给定链表中的环，我们使用整数 pos 来表示链表尾连接到链表中的位置（索引从 0 开始）。 如果 pos 是 -1，则在该链表中没有环。注意：pos 不作为参数进行传递，仅仅是为了标识链表的实际情况。

如果链表中存在环，则返回 true 。 否则，返回 false 。

### 思路
快慢指针，快指针一次跳过2个节点，慢指针一次跳过1个节点。

- 如果不存在环，则快指针先到达nullptr节点与慢指针不相等。
- 如果存在环，则快慢指针会在环上相遇，指向相同的节点。

由于存在环，两者都会走到环上。假设两者第一次同时在环上，快指针距离慢指针的节点数为n，那么2n步后两者一定相遇

### 实现
``` cpp
bool hasCycle(ListNode *head) {
    if (!head || !head->next) {
        return false;
    }

    ListNode* fast = head;
    ListNode* slow = head;

    do {
        fast = fast->next->next;
        slow = slow->next;
    } while (fast && fast->next && fast!=slow);

    return fast == slow;
}
```
