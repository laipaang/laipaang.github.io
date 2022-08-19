---
title: LeetCode 169. 多数元素
date: 2021-10-10 14:19:26
categories: LeetCode
tags:
- 计数抵消
- 哈希表
---

### 题目
[169. 多数元素](https://leetcode-cn.com/problems/majority-element/)
{% codelevel easy %}

给定一个大小为 `n` 的数组，找到其中的多数元素。多数元素是指在数组中出现次数 大于 `⌊n/2⌋` 的元素。
<!-- more -->

你可以假设数组是非空的，并且给定的数组总是存在多数元素。

### 思路
一些方法：

- 排序，下标⌊n/2⌋就是多数元素 时间复杂度 O(NlogN)
- 哈希表，统计每个元素出现的次数 时间复杂度 O(N)，需要额外O(N)空间
- 计数抵消，如果两个数不相等就互相抵消，那么最后剩下的一定是多数元素

其中，`计数抵消` 具体实现通过维护一个计数器 `cnt`，假设 `ans` 为要找的多数元素。遍历元素 `e` 和 `ans` 不同时 `cnt--`，否则 `cnt++`。当 `cnt == 0` 时说明 `ans` 已经被抵消完，不可能是多数元素，`ans` 更新为下一个元素。

第一次实现时：`cnt == 0`，我将 `ans` 更新为当前元素（未思考太多）。在写上面的分析逻辑时认为： `ans` 应该更新为下一个元素才对。但之前的代码是 AC 的，是 bad case 没有覆盖到，还是这种写法也对？

仔细分析后发现：`cnt == 0` 时的当前元素 `e` 是否放入后面部分多数元素是没有影响的。

1. 假设之前没遇到多数元素，那明显对多数元素无影响。
2. 假设之前遇到过多数元素，若之前遇到的多数元素个数为 `n`，那也有 `n` 个非多数元素(且不是 `e`，`e`是被非多数元素抵消的)和多数元素抵消，因此剩余的多数元素还是占多数。

### 实现
``` cpp
int majorityElement(vector<int>& nums) {
    if (nums.empty()) {
        return 0;
    }

    int ans= nums[0];
    int cnt = 1;
    for (int i=1; i<nums.size(); ++i) {
        if (nums[i] != ans) {
            --cnt;
        } else {
            ++cnt;
        }

        if (cnt == 0) {
            ans = nums[++i];
            cnt = 1;
        }
    }

    return ans;
}
```
