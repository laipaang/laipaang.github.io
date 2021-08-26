---
title: LeetCode 399. 除法求值
date: 2021-11-24 23:18:30
categories: LeetCode
tags:
- 广度优先
- 并查集
- Floyd
- 图
---

### 题目
[399. 除法求值](https://leetcode-cn.com/problems/evaluate-division/)
难度: <span style="color: rgba(255, 161, 25, 1);">中等</span>

给你一个变量对数组 `equations` 和一个实数值数组 `values` 作为已知条件，其中 `equations[i] = [Ai, Bi]` 和 `values[i]` 共同表示等式 `Ai / Bi = values[i]` 。每个 `Ai` 或 `Bi` 是一个表示单个变量的字符串。
<!-- more -->

另有一些以数组 `queries` 表示的问题，其中 `queries[j] = [Cj, Dj]` 表示第 `j` 个问题，请你根据已知条件找出 `Cj / Dj = ?` 的结果作为答案。

返回 **所有问题的答案** 。如果存在某个无法确定的答案，则用 `-1.0` 替代这个答案。如果问题中出现了给定的已知条件中没有出现的字符串，也需要用 `-1.0` 替代这个答案。

**注意**：输入总是有效的。你可以假设除法运算中不会出现除数为 `0` 的情况，且不存在任何矛盾的结果。

### 解法
参考官方题解的三种方案：广度优先搜索、Floyd算法、Union-Find。前两种是图的搜索，后一种是集合划分。三种方法的第一步都是将输入转换成符号表(symbol table)，其中，图的搜索需要构建邻接矩阵。

#### 广度优先搜索
``` cpp
std::vector<double> calcEquation(std::vector<std::vector<std::string>>& equations, std::vector<double>& values, std::vector<std::vector<std::string>>& queries) {
    std::unordered_map<std::string, int> str2num;
    int num = 0;
    for (int i=0; i<equations.size(); ++i) {
        auto it = str2num.find(equations[i][0]);
        if (it == str2num.end()) {
            str2num.insert({equations[i][0], num++});
        }
        it = str2num.find(equations[i][1]);
        if (it == str2num.end()) {
            str2num.insert({equations[i][1], num++});
        }
    }

    std::vector<std::vector<std::pair<int, double>>> edges(str2num.size());
    for (int i=0; i<equations.size(); ++i) {
        int a = str2num[equations[i][0]];
        int b = str2num[equations[i][1]];
        edges[a].push_back({b, values[i]});
        edges[b].push_back({a, 1.0 / values[i]});
    }

    std::vector<double> ans(queries.size(), -1.0);
    for (int i=0; i<queries.size(); ++i) {
        auto it1 = str2num.find(queries[i][0]);
        auto it2 = str2num.find(queries[i][1]);
        if (it1 == str2num.end() || it2 == str2num.end()) {
            continue;
        }

        int a = it1->second;
        int b = it2->second;

        std::queue<int> q{{a}};
        std::vector<double> nodes(edges.size(), -1.0);
        nodes[a] = 1.0;
        while (!q.empty()) {
            a = q.front();
            q.pop();

            if (a == b) {
                ans[i] = nodes[b];
                break;
            }
            
            for (auto& p: edges[a]) {
                if (nodes[p.first] < 0) {
                    nodes[p.first] = nodes[a] * p.second;
                    q.push(p.first);
                }
            }
        }
    }

    return ans;
}
```

#### Floyd算法
``` cpp
std::vector<double> calcEquation(std::vector<std::vector<std::string>>& equations, std::vector<double>& values, std::vector<std::vector<std::string>>& queries) {
    std::unordered_map<std::string, int> str2num;
    int num = 0;
    for (int i=0; i<equations.size(); ++i) {
        if (str2num.count(equations[i][0]) == 0) {
            str2num.insert({equations[i][0], num++});
        }
        if (str2num.count(equations[i][1]) == 0) {
            str2num.insert({equations[i][1], num++});
        }
    }

    int n = str2num.size();
    std::vector<std::vector<double>> dis(n, std::vector<double>(n, -1.0));
    for (int i=0; i<equations.size(); ++i) {
        int a = str2num[equations[i][0]];
        int b = str2num[equations[i][1]];
        dis[a][b] = values[i];
        dis[b][a] = 1.0 / values[i];
    }
    
    // k须放在外层
    for (int k=0; k<n; ++k) {
        for (int i=0; i<n; ++i) {
            for (int j=0; j<n; ++j) {
                if (dis[i][k] > 0 && dis[k][j] > 0) {
                    dis[i][j] = dis[i][k] * dis[k][j];
                }
            }
        }
    }

    std::vector<double> ans(queries.size(), -1.0);
    for (int i=0; i<queries.size(); ++i) {
        auto it1 = str2num.find(queries[i][0]);
        auto it2 = str2num.find(queries[i][1]);
        if (it1 == str2num.end() || it2 == str2num.end()) {
            continue;
        }

        ans[i] = dis[it1->second][it2->second];
    }

    return ans;
}
```

#### 并查集算法
在[并查集](/posts/union-find)中，实现了带权重的路径和路径压缩。第一次实现时仅仅增加了：

- `std::vector<double> ratios;`
- `double ratio(int i, int j);`

其中，ratio表示的是子节点与父节点比值，在`union`和`ratios`方法中需要遍历计算子节点与根节点的比值，再计算子节点间的比值。

后来看官方的解法，并没有 *遍历计算子节点与根节点的比值* 这一操作。分析其代码才明白：区别在于路径压缩方式的不同，[并查集](/posts/union-find)中的压缩是不断将子节点挂在父节点的父节点上，ratios永远表示的节点与父节点的比值；官方解法中的压缩是将整条路径的节点都挂在根节点上，只要经过`find`操作过的路径上节点，ratios表示的就是节点与根节点的比值。

``` cpp
class UnionFind {
public:
    UnionFind(int n) {
        id.resize(n);
        for (int i=0; i<n; ++i) {
            id[i] = i;
        }
        
        rank.resize(n, 1);
        ratios.resize(n, 1.0);
    }

    void unions(int i, int j, double r) {
        int p = find(i);
        int q = find(j);
        if (p == q) {
            return;
        }

        if (rank[p] > rank[q]) {
            std::swap(p, q);
            std::swap(i, j);
            r = 1.0 / r;
        }

        id[p] = q;
        ++rank[q];

        // find中的压缩保证i和j都挂在根节点，p/q = i/j * j/q / i/p
        ratios[p] = r * ratios[j] / ratios[i];
    }

    // 下面的压缩方式是在递归过程中将路径上的节点都挂在根节点。另外一种压缩方式是自底向上，不断将节点挂在爷爷节点。
    // 前者相比后者，在unions和ratio接口中较容易处理ratios[]。
    // 后者ratios[]中存的是当前节点与父节点的比值，所以需要额外计算当前节点与根节点的比值。
    int find(int i) {
        if (i == id[i]) {
            return i;
        }

        int j = find(id[i]);
        ratios[i] *= ratios[id[i]];// a->b->c : c/a = c/b * b/a
        id[i] = j;

        return j;
    }

    double ratio(int i, int j) {
        if (!connected(i, j)) {
            return -1.0;
        }

        // connected中调用了find，a->b a->c: c/b = c/a / b/a
        return ratios[i] / ratios[j];
    }

    bool connected(int i, int j) {
        return find(i) == find(j);
    }

protected:
    std::vector<int> id;
    std::vector<int> rank; // 秩
    std::vector<double> ratios; // 比值 子/根
};

std::vector<double> calcEquation(std::vector<std::vector<std::string>>& equations, std::vector<double>& values, std::vector<std::vector<std::string>>& queries) {
    std::unordered_map<std::string, int> tb; //  symbol table
    int n = 0;
    for (int i=0; i<equations.size(); ++i) {
        auto& s = equations[i][0];
        auto& e = equations[i][1];
        if (tb.count(s) == 0) {
            tb[s] = n++;
        }
        if (tb.count(e) == 0) {
            tb[e] = n++;
        }
    }

    n = tb.size();
    UnionFind uf(n);
    for (int i=0; i<equations.size(); ++i) {
        int s = tb[equations[i][0]];
        int e = tb[equations[i][1]];
        uf.unions(s, e, values[i]);
    }

    std::vector<double> ans(queries.size(), -1.0);
    for (int i=0; i<queries.size(); ++i) {
        auto it1 = tb.find(queries[i][0]);
        auto it2 = tb.find(queries[i][1]);
        if (it1 == tb.end() || it2 == tb.end()) {
            continue;
        }

        ans[i] = uf.ratio(it1->second, it2->second);
    }

    return ans;
}
```


