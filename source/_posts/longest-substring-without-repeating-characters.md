---
title: 无重复的最长子串
date: 2021-09-15 21:02:28
categories: leetcode
tags: 滑动窗口
---

[3. 无重复的最长子串](https://leetcode-cn.com/problems/longest-substring-without-repeating-characters/)
给定一个字符串 s ，请你找出其中不含有重复字符的 最长子串 的长度。

<!-- more -->

``` cpp
int lengthOfLongestSubstring(std::string s) {
    std::vector<int> last_pos(128, -1);
    int max_len = 0;
    int cur_len = 0; // 当前窗口（不含重复字符）大小

    for (int i=0; i<s.size(); ++i) {
        // 以当前字符为参考对象，分两种情况：
        // 1.未出现过
        if (last_pos[s[i]] < 0) {
            last_pos[s[i]] = i;
            ++cur_len;
        }
        // 2.出现过的
        else {
            // 且出现在当前窗口中
            if (i - last_pos[s[i]] <= cur_len) {
                max_len = std::max(cur_len, max_len);
                cur_len = i - last_pos[s[i]]; // 重置窗口
            } else {
                ++cur_len;
            }
 
            last_pos[s[i]] = i;
        }
    }

    return std::max(cur_len, max_len);
}
```
