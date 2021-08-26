---
title: 并查集
date: 2021-11-22 23:37:37
categories: Algorithm
tags:
- 并查集
---

并查集（Disjoint-set data structure）是一种数据结构，可高效对关系集合进行查询、合并。
<!-- more -->

### 算法
#### 表示
每个集合用一棵树表示，每个节点保存父节点引用，根节点的引用是自己，初始化时所有节点都引用自己。可以用数组来表示树结构。

#### 查找
不断的查找父节点引用，直到根节点。接口：```int find(int i);```

##### 路径压缩
查找的时间复杂度取决于树的深度，可以把树的深度进行压缩。在查找中将子节点挂在`父节点的父节点`以实现压缩。

#### 合并
调用接口 ```void unions(int i, int j);``` 进行合并。只需要查找到`i`的根节点`p`，`j`的根节点`q`，将`p`的根节点更新为`q`即可完成合并。

##### 带权重路径
上面的合并方法可能使得合并后的树极其不均衡，增大树深度，从而增加查询的耗时。我们可以在合并时选择较小树挂在较大树的根节点，具体实现：对每个节点维护一个权重，并在合并中不断更新。

### 实现
``` cpp
class UnionFind {
public:
    UnionFind(int n) {
        id.resize(n);
        for (int i=0; i<n; ++i) {
            id[i] = i;
        }

        sz.resize(n, 1);
    }

    void unions(int i, int j) {
        i = find(i);
        j = find(j);
        if (i == j) {
            return;
        }

        if (sz[i] > sz[j]) { // 路径权重
            std::swap(i, j);
        }

        id[i] = j;
        sz[j] += sz[i];
    }

    int find(int i) {
        while (i != id[i]) {
            id[i] = id[id[i]]; // 路径压缩
            i = id[i];
        }

        return i;
    }

    bool connected(int i, int j) {
        return find(i) == find(j);
    }

protected:
    std::vector<int> id;
    std::vector<int> sz;
};
```

### 参考
> 1.[普林斯顿讲义:Union–Find.](https://algs4.cs.princeton.edu/lectures/keynote/15UnionFind.pdf)  
> 2.[维基百科:并查集](https://zh.wikipedia.org/wiki/%E5%B9%B6%E6%9F%A5%E9%9B%86)
