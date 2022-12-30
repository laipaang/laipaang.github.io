---
title: LeetCode 25. K 个一组翻转链表
date: 2022-12-30 23:18:18
categories: LeetCode
tags:
- 链表
---

### 题目
[25. K 个一组翻转链表](https://leetcode.cn/problems/reverse-nodes-in-k-group/)
{% codelevel hard %}

给你链表的头节点 head ，每 k 个节点一组进行翻转，请你返回修改后的链表。

k 是一个正整数，它的值小于或等于链表的长度。如果节点总数不是 k 的整数倍，那么请将最后剩余的节点保持原有顺序。

你不能只是单纯的改变节点内部的值，而是需要实际进行节点交换。
<!-- more -->

### 题解
``` cpp
ListNode* reverseKGroup(ListNode* head, int k) {
    ListNode h;
    h.next = head;

    // 链表反转
    auto reverse = [](ListNode* h) {
        if (!h) {
            return;
        }

        ListNode* p = h->next;
        h->next = nullptr; // 需要将h->next置空，才能保证翻转后的链表尾部指向空
        while (p) {
            ListNode* t = p;
            p = p->next;

            t->next = h->next;
            h->next = t;
        }
    };

    int l = 0;
    ListNode* s = &h;
    ListNode* e = s->next; // s -> 1 -> 2 -> e -> ... -> null
    while (e) {
        ++l;

        if (l == k) {
            ListNode* t = s->next; // 记录当前翻转尾部
            ListNode* n = e->next; // 记录下个翻转起始
            e->next = nullptr; // 置空，保证reverse正常

            reverse(s);
            t->next = n; // 拼接后面部分

            s = t;
            e = s->next;
            l = 0;
        } else {
            e = e->next;
        }
    }

    return h.next;
}
```
