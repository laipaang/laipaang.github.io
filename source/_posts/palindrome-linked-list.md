---
title: LeetCode 234. 回文链表
date: 2021-11-15 17:18:39
categories: LeetCode
tags:
- 链表
- 双指针
---

### 题目
[234. 回文链表](https://leetcode-cn.com/problems/palindrome-linked-list/)
难度: <span style="color: rgba(90, 183, 38, 1);">简单</span>

给你一个单链表的头节点 head ，请你判断该链表是否为回文链表。如果是，返回 true ；否则，返回 false 。

<!-- more -->

### 思路
todo

### 实现
``` cpp
bool isPalindrome(ListNode* head) {
    if (!head) {
        return true;
    }

    auto reverseList = [](ListNode* head) {
        ListNode l;

        ListNode* n = head;
        ListNode* t = nullptr;
        while (n) {
            t = n->next;
            n->next = l.next;
            l.next = n;
            n = t;
        }
        
        return l.next;
    };

    /*
    // 通过记数法找到一般的位置
    int len = 0;
    ListNode* p1 = head;
    while (p1) {
        ++len;
        p1 = p1->next;
    }

    p1 = head;
    len = (len + 1) / 2;
    while (len > 0) {
        --len;
        p1 = p1->next;
    }
    p1 = reverseList(p1);
    */

    // 通过快慢指针找到一半的位置
    ListNode* fast = head;
    ListNode* slow = head;
    while (fast->next && fast->next->next) {
        slow = slow->next;
        fast = fast->next->next;
    }
    ListNode* p1 = slow->next;
    p1 = reverseList(p1);

    ListNode* p0 = head;
    while (p1) {
        if (p0->val != p1->val) {
            break;
        }

        p1 = p1->next;
        p0 = p0->next;
    }

    return p1 == nullptr;
}
```
