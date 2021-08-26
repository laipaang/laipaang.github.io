---
title: 断言
date: 2021-08-23 12:03:27
tags: 代码片段
---

通过宏实现一个简单断言`ENFORCE`，不成立时打印错误后抛异常

``` cpp
#define LIKELY(x) __builtin_expect(!!(x), 1)
#define UNLIKELY(x) __builtin_expect(!!(x), 0)

template <class... Args>
std::string ParserFormat(const std::string& format="", const Args &... args) {
    char buf[1024] = {0};
    std::snprintf(buf, 1024, format.c_str(), args...);

    return buf;
}
 
class ParserException : public std::exception {
  const char *what() throw() { return "ParserException"; }
};
 
#define ENFORCE(COND, ...)                                                      \
  do {                                                                          \
    auto __cond__ = (COND);                                                     \
    if (UNLIKELY(!(__cond__))) {                                                \
      std::cerr << ParserFormat("ENFORCE FAIL ON File: %s Line: %d Cond: %s\n", \
                                __FILE__, __LINE__, #COND)                      \
                << ParserFormat(__VA_ARGS__);                                   \
      throw ParserException();                                                  \
    }                                                                           \
  } while (0)
```
