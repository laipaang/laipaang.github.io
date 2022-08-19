---
title: LeetCode 92. 反转链表 II
date: 2022-08-15 23:07:12
categories: LeetCode
tags:
- 链表
---

### 题目
[92. 反转链表 II](https://leetcode.cn/problems/reverse-linked-list-ii/)
给你单链表的头指针 head 和两个整数 left 和 right ，其中 left <= right 。请你反转从位置 left 到位置 right 的链表节点，返回 反转后的链表 。

<!-- more -->
### 题解
``` cpp
ListNode* reverseBetween(ListNode* head, int left, int right) {
    ListNode l(0, head);
    head = &l;
    int len = right - left + 1;

    while (left-- > 1) {
        head = head->next;
    }

    ListNode* p = head->next;
    ListNode* e = p;
    ListNode* t;
    while (len-- > 0) {
        t = p->next;
        p->next = head->next;
        head->next = p;
        p = t;
    }
    e->next = p;

    return l.next;
}
```
