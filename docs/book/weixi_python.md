## 课程地址
[传送门](http://www.weixistyle.com/python.php)

## print
```python
# 多行语句 \ 分开
print('aaa\
bbb\
ccc')

# 一行多句加分号
print('1'); print('2')

# 格式化输出
print('打折95%%后，单号为%06d，价格为%.2f，备注%s' % (num, price, memo))

# 默认分隔符是一个空格
print(1, 2, 3, sep = '|')

# 默认尾部是一个换行符
print(1, end = '|'); print(2, end = '|'); print(3)
```

## 其他
```python
# 连续2组3个单引号或双引号为多行注释
'''
多行注释
'''

"""
多行注释
"""

# 取整数运算 //
21//9

# 乘方运算 **
3**3

# 查看变量类型函数
type(instance)

# 类型转换函数
int(page)
float(price)

# input输入函数 返回值为字符串
page = int(input('请输入页码：'))

# 逻辑运算符 and or not()
if not(page == 1):
    # do nothing
    pass

# 函数无返回值时返回None
def demo ():
    pass

# 循环最后的else语句，break时不会触发
for key in list:
    print(key)
    # break
else:
    print('at last')

i = 0
while i < 5:
    i += 1
    # break
else:
    print('at last')
```

## 高级数据类型

* **列表：** 有序数据集合
1. 定义及相关方法
```py
books = [1, 2, 3, 4]

# 给定元素第一次出现的索引
books.index(1)

# 指定索引添加元素
books.insert(2, 5)

# 删除指定索引元素 默认最后一个
books.pop(2)

# merge
extend = [5, 6, 7, 8]
books.extend(extend)

books.append(5)
books.remove(5)
books.clear()
books.count(1)
len(books)

# 需要保证元素都为同类型
books.sort()
books.sort(reverse = true)
books.reverse()
max(books)
min(books)
```
2. 运算
```py
books = [1, 2, 3, 4]

# 等于merge的结果
books + books

# 返回一个新列表，books元素重复3次
books * 3

for book in books:
    print(book)

# 比较运算时 需保证每个位置元素类型相同再一个一个比较
other = [2]
books >= other

1 in books
5 not in books
```

* **元组：** 有序的固定数据元素，元素不可变
```py
# 只有一个元素时最后必须带上逗号否则认为是一个其他类型
element = ('一个元素的元组',)

# 定义时括号可省
element = '一个元素的元组',
statusTexts = '成功', '失败'
statusTexts = ('成功', '失败')

# 运算符、遍历与列表相同
len(statusTexts)
max(statusTexts)
min(statusTexts)
statusTexts.index('成功')
statusTexts.count('成功')

# 元组转换为列表
temp = list(statusTexts)

# 列表转换为元组
newStatusTexts = tuple(statusTexts)
```

* **字典：** 键值对，其中元组、数字、字符串均可作为KEY
```py
myDict = { '姓名': 'Jane', ('text',): 17 }

myDict.get('姓名') == myDict['姓名']
myDict['年龄'] = 12
myDict.pop('年龄')
myDict.keys()
myDict.values()
myDict.clear()
len(myDict)

# 随机删除一个元素
myDict.popitem()

# in、not in仅在KEY中查找
'姓名' in myDict

# 循环变量表示KEY
for key in myDict:
    print(key)
```

## 字符串

1. 基本
```py
name = 'zhangsan'
name.index('a')
len(name)
name.count('a')
name * 3
'a' in name
'll' not in name

for letter in name
    print(letter)
```

2. 方法 - 判断类型
```py
# 是否由空白字符组成：包括空格、制表符、回车、换行符
name = '\t\r\n    \t'
name.isspace()

# 至少有一个字符且都是字母、数字、中文
name = 'a啊123'
name.isalnum()

# 是否每个单词首字母都大写
name.istitle()

# 是否全为小写、大写
name.islower()
name.isupper()

# unicode数字
three = '\u00b3'
# 是否只包含十进制数字
three.isdecimal()
# 是否只包含数字 unicode也可 中文不可
three.digit()
# 是否只包含数字 中文数字也可
three.isnumeric()
```

3. 方法 - 查找、替换、大小写转换（只会返回新字符串 原字符串不受影响
```py
# 是否以...开头/结尾
name.startswith('zhang')
name.endwith('san')

# 不存在返回 -1
name.find('zhang')

# 从右边开始查找
name.rfind('a')
name.rindex('a')

name.replace('san', 'si')

# 首字母大写 其他全小写
name.capitalize()

# 翻转大小写
name.swapcase()

name.lower()
name.upper()
name.title()
```

4. 方法 - 文本对齐
```py
poem = ['凉州词', '王之涣', '黄河远上白云间', '一片孤城万仞山', '羌笛何须怨杨柳', '春风不度玉门关']
for line in poem:
    # 默认以英文空格填充，此处以中文空格填充
    print(line.center(13, '　'))

# 左对齐，右对齐
line.ljust(20, '0')
line.rjust(20, '0')
```

5. 方法 - 去除空白字符、拆分、连接、切片
```py
# 去除空白字符
name.strip()
name.rstrip()
name.lstrip()

# 默认以空格分割 返回列表
name.split('a')

# 返回元组 元素1为分割符左边，元素2为分割符，元素3位分割符右边
name.partition('a')
name.rpartition('a')

# 以指定内容连接字符串每个字符
' '.join(name)

# 以每个 \r、\n、\r\n 分割 返回列表
name.splitlines()

# 截取 0-4 步长默认1
name[0:5]
name[1:]
name[:9]
name[-5:-2]
name[5:-3]

# 首尾都省略 仅指定了步长
name[::2]

# 列表、元组都可以切片
[1, 2, 3][1:3]
```

## 文件
1. 文件操作
```py
# r 只读 默认方式
# w 
# a
# r+ 文件指针在开头 写入时会从开头按字节覆盖
# w+ 打开后仍清空原内容
# a+ 文件指针在末尾
file = open('sql.log', 'r')
# read方法调用后文件指针指向末尾
content = file.read()
file.close()

# 指针当前位置
file.tell()

# 移动指针位置
# offset可为负数 以字节为单位
# whence 对于文本文件 只能为0 表示以文件开头为基准，默认也为0
# 1代表从当前位置计算起，2代表以文件末尾计算起
content.seek(2, 0)

# 按行读取
file.readline()

for line in file.readlines()
    print(line)
```

2. 文件、目录相关方法
```py
# 文件及目录的管理工作
import os

os.rename('origin.txt', 'new.txt')
os.remove('new.txt')

# 当前目录
os.getcwd()

# 返回一个指定目录下的文件列表
os.listdir()

os.mkdir('new_dir')
os.rmdir('abc')
os.path.isdir('abc')
```

## 最后的课后作业
```python
#!/usr/bin python3

import os
import time

def copyWithRead (filename, new):
    origin = open(filename, 'r')
    new = open(new, 'w')
    content = origin.read()
    new.write(content)

    origin.close()
    new.close()

def copyWithReadLine (filename, new):
    origin = open(filename, 'r')
    new = open(new, 'w')
    while True:
        content = origin.readline()
        if content == '':
            break
        else:
            new.write(content)

    origin.close()
    new.close()

def copyWithReadLines (filename, new):
    origin = open(filename, 'r')
    new = open(new, 'w')
    for line in origin.readlines():
        new.write(line)

    origin.close()
    new.close()

start = time.process_time()

copyWithRead('mysql.log', 'copy.log')
# copyWithReadLine('mysql.log', 'copy.log')
# copyWithReadLines('mysql.log', 'copy.log')

end = time.process_time()
print('start \t %.4f' % start)
print('end \t %.4f' % end)
print('pass \t %.4f' % (end - start))
```
