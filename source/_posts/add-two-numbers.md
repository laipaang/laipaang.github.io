---
title: LeetCode 2. 两数相加
date: 2022-03-03 00:03:24
categories: LeetCode
tags:
---

### 题目
[2. 两数相加](https://leetcode-cn.com/problems/add-two-numbers/)
难度: <span style="color: rgba(255, 161, 25, 1);">中等</span>

给你两个 非空 的链表，表示两个非负的整数。它们每位数字都是按照 逆序 的方式存储的，并且每个节点只能存储 一位 数字。

请你将两个数相加，并以相同形式返回一个表示和的链表。
<!-- more -->

你可以假设除了数字 0 之外，这两个数都不会以 0 开头。

### 题解
``` cpp
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
public:
    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
        ListNode head;
        ListNode* p = &head;

        int carry = 0;
        while (l1 || l2) {
            p->next = new ListNode();
            int val1 = l1 ? l1->val : 0;
            int val2 = l2 ? l2->val : 0;
            int x = val1 + val2 + carry;
            
            p->next->val = x % 10;
            carry = x / 10;

            p = p->next;
            l1 = l1 ? l1->next : nullptr;
            l2 = l2 ? l2->next : nullptr;
        }

        if (carry) {
            p->next = new ListNode(carry);
        }

        return head.next;
    }
};
```
