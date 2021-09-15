---
title: 反转链表
date: 2021-08-26 22:37:00
categories: leetcode
tags:
- 链表
---

[206. 反转链表](https://leetcode-cn.com/problems/reverse-linked-list/)
给你单链表的头节点 head ，请你反转链表，并返回反转后的链表。

<!-- more -->

``` cpp
#include <iostream>
#include <vector>

struct ListNode {
    int val;
    ListNode* next;
    
    ListNode() : val(0), next(nullptr) {}
    ListNode(int value) : val(value), next(nullptr) {}
};

ListNode* reverseLink(ListNode* head) {
    if (!head) {
        return nullptr;
    }

    // A -> B -> C -> D
    // p1: B -> ...  p2: A -> C -> D
    ListNode* p1 = head;
    ListNode* p2 = head->next;
    p1->next = nullptr;
    while (p2) {
        ListNode* tmp = p2->next;
        p2->next = p1;
        p1 = p2;
        p2 = tmp;
    }

    return p1;
}

int main() {
    std::vector<ListNode> v = {4,2,3,6,7};

    ListNode* head = nullptr;
    for (size_t i=0; i<v.size(); ++i) {
        if (i==0) {
            head = &v[0];
        } else {
            v[i-1].next = &v[i];
        }
    }

    head = reverseLink(head);
    while(head) {
        std::cout << head->val << " ";
        head = head->next;
    }
    std::cout << std::endl;

    return 0;
}
```
