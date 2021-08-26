---
title: LeetCode 416. 分隔等和子集
date: 2022-01-13 21:22:35
categories: LeetCode
tags:
- dfs
- 动态规划
---

### 题目
[LeetCode 416. 分隔等和子集](https://leetcode-cn.com/problems/partition-equal-subset-sum/)
难度: <span style="color: rgba(255, 161, 25, 1);">中等</span>

给你一个 只包含正整数 的 非空 数组 nums 。请你判断是否可以将这个数组分割成两个子集，使得两个子集的元素和相等。
<!-- more -->

### 思路
#### 深度优先
和[141. 环形链表](/posts/target-sum/)同样的思路。

- 时间复杂度O(2^n)。二叉树的深度为数组长度n，所有节点都需要遍历，因此节点数代表了时间复杂度。
- 空间复杂度O(n)。空间复杂度取决于递归调用的栈空间，栈深度为数组长度n。

提交结果 `超出时间限制`。二叉树搜索的过程中我们加上缓存，将步骤index和目标targe作为key，如果之前在同样的步骤遇到过这种target，可以直接返回。

index和target同时作为key，对于std::unordered_map需要提供专门的hash函数，为了省事有两种方法：

- std::vector<std::unordered_map<int, bool>>，其中，数组下标是步骤，hash表的key是target
- 由于nums和nums[i]都比较小，所以可以用一个int做hash的key，高16位存步骤，低16位存target

``` cpp
bool dfs(std::vector<int>& nums, std::unordered_map<int, bool>& cache, int index, int target) {
    if (index >= nums.size()) {
        if (target == 0) {
            return true;
        }

        return false;
    }
    
    auto it = cache.find(index << 16 | target);
    if (it != cache.end()) {
        return it->second;
    }
    
    bool ret = dfs(nums, cache, index+1, target+nums[index]) || dfs(nums, cache, index+1, target);
    cache.insert({index << 16 | target, ret});

    return ret;
}

bool canPartition(std::vector<int>& nums) {
    int sum = std::accumulate(nums.begin(), nums.end(), 0);
    if (sum % 2 != 0) {
        return false;
    }

    std::unordered_map<int, bool> cache;

    return dfs(nums, cache, 0, -sum / 2);   
}
```

#### 动态规划
