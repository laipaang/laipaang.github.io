---
title: LeetCode 207. 课程表
date: 2021-10-12 09:53:38
categories: LeetCode
tags:
- 深度优先
- 广度优先
- 拓补排序
- 图
- 课程表
---

### 题目
[207. 课程表](https://leetcode-cn.com/problems/course-schedule/)
{% codelevel medium %}

你这个学期必须选修 `numCourses` 门课程，记为 `0` 到 `numCourses - 1` 。
<!-- more -->

在选修某些课程之前需要一些先修课程。 先修课程按数组 `prerequisites` 给出，其中 `prerequisites[i] = [ai, bi]` ，表示如果要学习课程 `ai` 则 `必须` 先学习课程  `bi` 。

例如，先修课程对 `[0, 1]` 表示：想要学习课程 `0` ，你需要先完成课程 `1` 。
请你判断是否可能完成所有课程的学习？如果可以，返回 `true` ；否则，返回 `false` 。

### 思路
所有课程是节点，先后课程构成有向边，是一个图问题。明显当图中存在环时不能完成所有课程。判断是否存在环可以通过深度优先遍历，当一个节点回溯前被再次遍历到说明存在环。

这个问题的另一个解法是通过广度优先遍历进行拓扑排序。思路如下：

1. 选择一个入度为0的节点。
2. 将该节点和它连接的边删除。
3. 不断重复1，2，直到找不到入度为0的节点。

结束时，如果存在未遍历的节点，那么一定是存在环的。

### 实现
#### 广度优先遍历
``` cpp
bool canFinish(int numCourses, std::vector<std::vector<int>>& prerequisites) {
    std::vector<std::unordered_set<int>> in_out(numCourses);
    std::vector<int> in_deg(numCourses, 0); // 节点入度统计
    std::queue<int> q;

    for (auto& v: prerequisites) {
        in_out[v[0]].insert(v[1]);
        ++in_deg[v[1]];
    }
    
    for (int i=0; i<numCourses; ++i) {
        if (in_deg[i] == 0) {
            q.push(i);
        }
    }

    // bfs
    int cnt = 0;
    while (!q.empty()) {
        int i = q.front();
        q.pop();

        for (auto j: in_out[i]) {
            if (--in_deg[j] == 0) {
                q.push(j);
            }
        }

        ++cnt;
    }

    return cnt == numCourses;
}
```

#### 深度优先遍历
``` cpp
class Solution {
private:
    std::vector<int> visited; // 0:not visit 1:visiting 2:visited
    std::vector<std::vector<int>> in_out;
    int valid = 1;

public:
    void dfs(int i) {
        // 深度优先遍历到 `遍历中` 的节点说明存在环
        if (visited[i] == 1) {
            valid = 0;
            return;
        }

        if (visited[i] == 2) {
            return;
        }

        visited[i] = 1;
        for (auto j: in_out[i]) {
            dfs(j);
            if (!valid) {
                return;
            }
        }

        visited[i] = 2;
    }
    bool canFinish(int numCourses, std::vector<std::vector<int>>& prerequisites) {
        visited.resize(numCourses, 0);
        in_out.resize(numCourses);
        valid = 1;

        // 构建表
        for (auto& v: prerequisites) {
            in_out[v[0]].push_back(v[1]);
        }

        for (int i=0; i<numCourses; ++i) {
            if (visited[i] == 0) {
                dfs(i);
            }
            if (!valid) {
                break;
            }
        }

        return valid;
    }
};
```
