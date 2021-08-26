---
title: LeetCode 21. 合并两个有序链表
date: 2021-10-08 20:02:29
categories: LeetCode
tags:
- 链表
- 链表合并
---

### 题目
[21. 合并两个有序链表](https://leetcode-cn.com/problems/merge-two-sorted-lists/)
难度: <span style="color: rgba(90, 183, 38, 1);">简单</span>

将两个升序链表合并为一个新的 `升序` 链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。
<!-- more -->

### 思路
不断来回在两条链表挑选小的节点插入合并后的链表尾。为方便第一次插入，合并前创建一个空的头结点，返回前需要将该空的头结点删除。

### 实现
``` cpp
ListNode* mergeTwoLists(ListNode* l1, ListNode* l2) {
    // 方便第一次插入
    ListNode* head = new ListNode();
    ListNode* cur = head;

    while (l1 && l2) {
        while (l1 && l2) {
            auto& l = l1->val < l2->val ? l1 : l2;
            cur->next = l;
            cur = l;
            l = l->next;
        }
    }
    // 剩余接在后面
    cur->next = l1 ? l1 : l2;
    
    // 删除head空节点
    auto tmp = head;
    head = head->next;
    delete tmp;

    return head;
}
```
