---
title: LRU
date: 2021-08-23 12:06:31
tags: 数据结构
categories: LeetCode
---

双端队列实现LRU

<!-- more -->

``` cpp
#include <unordered_map>
#include <iostream>
#include <string>
#include <vector>

struct DLinkNode {
    int key;
    int val;
    DLinkNode* pre = nullptr;
    DLinkNode* next = nullptr;
};

class LRUCache {
public:
    LRUCache(int capacity) : capacity_(capacity), size_(0) {
        // dummy
        head_ = new DLinkNode();
        tail_ = new DLinkNode();
        head_->next = tail_;
        tail_->pre = head_;
        head_->val= -99;
        tail_->val = -99;
    }

    ~LRUCache() {
        delete head_;
        delete tail_;
    }
    
    int get(int key) {
        auto it = hash_table_.find(key);
        if (it == hash_table_.end()) {
            return -1;
        }

        DLinkNode* p = it->second;
        // remove
        p->pre->next = p->next;
        p->next->pre = p->pre;
        // insert
        p->next = head_->next;
        head_->next = p;
        p->next->pre = p;
        p->pre = head_;
        
        return p->val;
    }
    
    void put(int key, int value) {
        auto it = hash_table_.find(key);
        if (it == hash_table_.end()) {
            //std::cout << "not find: " << key << std::endl;
            DLinkNode* p = new DLinkNode();
            p->val = value;
            p->key = key;

            p->next = head_->next;
            head_->next = p;
            p->next->pre = p;
            p->pre = head_;

            hash_table_.insert({key, p});

            if (++size_ > capacity_) {
                // remove
                 p = tail_->pre;
                 p->pre->next = tail_;
                 tail_->pre = p->pre;
                 hash_table_.erase(p->key);
                 //std::cout << "rm element" << p->key << std::endl;
                 delete p;
                size_ = capacity_;
            }

            return;
        }

        DLinkNode* p = it->second;
        // remove
        p->pre->next = p->next;
        p->next->pre = p->pre;
        // insert
        p->next = head_->next;
        head_->next = p;
        p->next->pre = p;
        p->pre = head_;

        p->val = value;
    }
protected:
    DLinkNode* head_;
    DLinkNode* tail_;
    size_t capacity_;
    size_t size_;

    std::unordered_map<int, DLinkNode*> hash_table_;
};

//["LRUCache","put","put","get","put","get","put","get","get","get"]
//[[2],[1,1],[2,2],[1],[3,3],[2],[4,4],[1],[3],[4]]

/*
["LRUCache","put","put","get","put","put","get"]
[[2],[2,1],[2,2],[2],[1,1],[4,1],[2]]
*/
```
