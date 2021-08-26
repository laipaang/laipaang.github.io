---
title: LeetCode 148. 排序链表
date: 2021-10-09 16:44:13
categories: LeetCode
tags:
- 排序
- 链表
- 链表合并
mathjax: true
---

### 题目
[148. 排序链表](https://leetcode-cn.com/problems/sort-list/)
难度: <span style="color: rgba(255, 161, 25, 1);">中等</span>

给你链表的头结点 `head` ，请将其按 `升序` 排列并返回 `排序后的链表` 。
<!-- more -->

**进阶：**

你可以在 `O(nlogn)` 时间复杂度和常数级空间复杂度下，对链表进行排序吗？

### 思路
排序中时间复杂度为`O(nlogn)`有：快排、堆排、归并排序。其中，归并排序在链表场景较容易实现。

本文采用非递归2路归并实现，也就是自底向上，依次合并2、4、8、...个元素。在每次合并时，由于链表当前区间存在前驱和后继，合并排序当前区间的首尾节点可能会被打乱。

- 对于首节点，复制一个相同节点参与排序，排序结束替换回原来的，保证前驱不变。
- 对于尾节点，记录其后继，排序结束后赋值给尾节点 `next` 指针。

其中，两个有序链表的合并参考 [21. 合并两个有序链表](/posts/merge-two-sorted-lists/)

### 实现
``` cpp
ListNode* sortList(ListNode* head) {
    auto merge = [this](ListNode* l, int len) {
        // 首尾标记
        ListNode* head = new ListNode(l->val, l->next);
        
        ListNode* tail = head;
        ListNode* l1 = head;
        ListNode* l2 = head;
        int harf = len / 2;
        int i = 1;

        // 前半段尾节点和l2
        while (i++ < harf && tail) {
            tail = tail->next;
        }
        if (tail) {
            auto tmp = tail;
            tail = tail->next;
            tmp->next = nullptr;
        }
        l2 = tail;
        while (i++ < len && tail) {
            tail = tail->next;
        }
        if (tail) {
            auto tmp = tail;
            tail = tail->next;
            tmp->next = nullptr;
        }

        // 用于合并的虚节点
        ListNode dummy;
        ListNode* hand = &dummy;
        ListNode* cur = hand;

        while (l1 && l2) {
            auto& n = l1->val < l2->val ? l1 : l2;
            cur->next = n;
            cur = n;
            n = n->next;
        }
        l1 = l1 ? l1 : l2;
        cur->next = l1;

        // 找到尾节点
        while (cur->next != nullptr) {
            cur = cur->next;
        }

        // 还原首节点和尾节点的后继
        l->val = hand->next->val;
        l->next = hand->next->next;
        cur->next = tail;

        delete hand->next;
        
        return tail;
    };

    // 计算长度
    ListNode* l = head;
    int n = 0;
    while (l) {
        l = l->next;
        ++n;
    }

    // 归并排序
    for (int step=2;; step*=2) {
        l = head;
        while (l) {
            l = merge(l, step);
        }
        if (step >= n) {
            break;
        }
    }

    return head;
}
```
