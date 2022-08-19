---
title: LeetCode 328. 奇偶链表
date: 2022-03-05 09:07:53
categories: LeetCode
tags: 链表
---

### 题目
[328. 奇偶链表](https://leetcode-cn.com/problems/odd-even-linked-list/)
{% codelevel medium %}

给定单链表的头节点 head ，将所有索引为奇数的节点和索引为偶数的节点分别组合在一起，然后返回重新排序的列表。
<!-- more -->

第一个节点的索引被认为是 奇数 ， 第二个节点的索引为 偶数 ，以此类推。

请注意，偶数组和奇数组内部的相对顺序应该与输入时保持一致。

你必须在 O(1) 的额外空间复杂度和 O(n) 的时间复杂度下解决这个问题。

### 题解
``` cpp
ListNode* oddEvenList(ListNode* head) {
    ListNode odd;
    ListNode even;
    ListNode* op = &odd;
    ListNode* ep = &even;

    int i = 0;
    while (head) {
        if (++i % 2) {
            ep->next = head;
            head = head->next;
            ep = ep->next;
        } else {
            op->next = head;
            head = head->next;
            op = op->next;
        }
    }

    op->next = nullptr;
    ep->next = odd.next;

    return even.next;
}
```
