---
title: Rotating File Writer
date: 2024-02-23 16:51:56
categories:
tags:
- 代码片段
---

一个简单的文件写入器demo，支持按行数分割文件。
<!-- more -->

``` python
import os

class RotatingFileWriter(object):
    """ RotatingFileWriter """
    part_index = 0

    def __init__(self, output_dir, max_file_len=200000, postfix='txt'):
        """ init """
        self.output_dir = output_dir
        self.max_file_len = max_file_len
        self.file_len = 0
        self.postfix = postfix

        self.file = None
        self.buff = []
        self.buff_len = min(5000, max_file_len)

        if not os.path.exists(output_dir):
            os.makedirs(output_dir)

        self.get_file() # avoid call `open` in `__del__`

    def __del__(self):
        """ del """
        self.flush()
        if self.file:
            self.file.close()

    def get_file(self):
        """ get file """
        if self.file_len >= self.max_file_len:
            if self.file:
                self.file.close()
                self.file = None

        if not self.file:
            filename = '{}/{:0>5d}.{}'.format(self.output_dir,
                                              __class__.part_index,
                                              self.postfix)
            self.file = open(filename, 'w')
            self.file_len = 0
            __class__.part_index += 1

        return self.file

    def flush(self):
        """ flush """
        if self.buff:
            self.get_file().write(''.join(self.buff))
            self.file_len += len(self.buff)
            self.buff = []

    def write(self, text):
        """ write """
        self.buff.append(text)

        if len(self.buff) >= self.buff_len:
            self.flush()

if __name__ == '__main__':
    file_writer = RotatingFileWriter('tmp/')
    file_writer.write('123\n')
    file_writer.write('bar\n')
```
