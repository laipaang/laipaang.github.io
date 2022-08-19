---
title: LeetCode 160. 相交链表
date: 2021-10-07 22:34:47
categories: LeetCode
tags:
- 双指针
- 链表
mathjax: true
---

### 题目
[160. 相交链表](https://leetcode-cn.com/problems/intersection-of-two-linked-lists/)
{% codelevel easy %}

给你两个单链表的头节点 `headA` 和 `headB` ，请你找出并返回两个单链表相交的起始节点。如果两个链表没有交点，返回 `null` 。
<!-- more -->

**注意**，函数返回结果后，链表必须 **保持其原始结构**。

### 思路
两个单链表相交形状为 `Y` 。假设其中一条链表 `A` 长度为$l_1$，另一条链表 `B` 长度为$l_2$，$l_1 >= l_2$，若 `A` 先走$l_1-l_2$步，`B` 再和 `A` 一起走，两者第一次指向相同节点：不为 `null` 必然在交点，为 `null` 则说明两者不相交。其中，通过分别遍历一遍获取两个链表的长度。

以上逻辑需要的几个步骤：

- 分别遍历
- 判断长短链表
- 长链表先走
- 同时走直到相等

#### 一种简捷的思路
$l_1+l_2 == l_2+l_1$，两个指针分别走 $l_1$、$l_2$ 和 $l_2$、$l_1$，如果两者相交：第一次指向相同节点必然在交点处。

### 实现
``` cpp
ListNode *getIntersectionNode(ListNode *headA, ListNode *headB) {
    ListNode* p1 = headA;
    ListNode* p2 = headB;
    while (p1 != p2) {
        p1 = p1 ? p1->next : headB;
        p2 = p2 ? p2->next : headA;
    }

    return p1;
}
```
