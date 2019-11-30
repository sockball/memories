## 基础补充
* set类型(无重复元素的集合)
```py
a = set([1, 2, 'a'])
b = set([2, 'b'])
c = { 122, 233 }
# 合集
a | b
# 差集
a & b
```

* 不可变对象 **str tuple True False None**  
  调用对象自身的任意方法也不会改变该对象自身的内容，而会创建新的对象并返回

* 可迭代对象
```py
from collections.abc import Iterable, Iterator
# 可迭代对象 str list tuple dic set generator
isinstance('abc', Iterable)
# 迭代器
isinstance('abc', Iterator)
# 可迭代对象转为generator
isinstance(iter('abc'), Iterator)
```

* 判断一个变量是否为某些类型的一种 `isinstance((1, 2, 3), (list, tuple))`

## 函数补充

* 函数参数默认值注意应设置为不可变对象
```py
def test (L = []):
    L.append(1)
    return L

print(test()) # [1]
print(test()) # [1, 1]
print(test()) # [1, 1, 1]
```

* 可变参数，其中接收参数为一个tuple
```py
def test (*numbers):
    print(numbers)

test(1, 2, 3)

# 调用时亦可使用*
arr = [1, 2, 3, 4, 5]
test(*arr)
```

* 关键字参数，接收额外命名参数，其中接收参数为一个dict
```py
def test (arg, **s):
    print(s)

test(1, city = 'gz', country = 'china')

# 调用时亦可使用**
o = { 'city': 'gz', 'country': 'china' }
test(2, **o)
```

* 命名关键字参数(keyword-only)，调用必须传入参数名，特殊分隔符\*之后的参数被视为命名关键字参数
```py
def man(name, age, *, city, job):
    pass
man('Mary', 2, job = 'doc', city = 'gz')

# 包含可变参数时，不需要*也可以
def woman(name, age, *args, city, job):
    print(name, age, args, city, job)

woman('Mary', 2, 1000, job = 'doc', city = 'gz')
```

* 匿名函数
```py
f = lambda x: x * x
```

## 高级特性补充

* 尾递归举例
```py
# 求 n!
def out (n):
    return main(n, 1)

def main (n, product):
    if n == 1:
        return product
    return main(n - 1, product * n)
```

* 切片去空格
```py
def trim (s):
    if (s[:1] == ' '):
        return trim(s[1:])
    if (s[-1:] == ' '):
        return trim(s[:-1])
    return s
```

* 迭代
```py
# 将list变为索引元素对 (list遍历的是value)
for key, value in enumerate(['A', 'B', 'C']):
    print(key, value)

for x, y in [(1, 1), (2, 4), (3, 9)]:
    pass

# for key, value in dic.items():
for value in dic.values():
    pass
```

* list生成式
```py
# 4 16 36 64 100
a = [x * x for x in range(1, 11) if x % 2 == 0]

# 多层循环
# AX AY AZ BY BC BZ CX CY CZ
[m + n for m in 'ABC' for n in 'XYZ']
```

* 生成器
```py
# 简单版
g = (x * x for x in range(10))
# next(g)
# list(g)
for n in g:
    print(n)

# for in 遍历获取不到return的值 需要捕获StopIteration异常
while True:
     try:
         print('g:', next(x))
     except StopIteration as e:
         print('Generator return value:', e.value)
         break

# 斐波那契数列
def fib (max):
    n, a, b = 0, 0, 1
    while n < max:
        yield b
        a, b = b, a + b
        n = n + 1
    return 'done'

# 杨辉三角
def triangles ():
    L = [1]
    while True:
        yield L
        L = [0] + L + [0]
        # best: L = [L[i] + L[i + 1] for i in range(len(L) - 1)]
        lastIndex = len(L) - 1
        L = [(v + L[k + 1]) for k, v in enumerate(L) if (k != lastIndex)]
 ```

## 面向对象补充

* 任何模块代码的第一个字符串都被视为模块的文档注释
```py
'模块注释...'
```

* sys模块
```py
import sys

# 命令行下python后的参数
sys.argv
# 环境变量路径 包括当前目录、已安装的内置模块和第三方模块
sys.path
```

* \_\_slots\_\_、getter、setter
```py
class User:
    # tuple定义，表示允许写(添加、修改)的属性
    # 仅对当前类实例有效，继承无效
    __slots__ = ('_name', 'age')

    def __init__ (self):
        self._name = 'Jane'

    # 访问name属性时的getter 无setter时为只读
    @property
    def name (self):
        return self._name

    # 修改name属性时的setter
    @name.setter
    def name (self, name):
        self._name = name

user = User()
print(user.name)
user.name = 'Lily'
print(user.name)

# 是否含有name属性或方法
hasattr(user, 'name')
# 设置默认值
getattr(user, 'name', 404)
setattr(user, 'name', 'Mary')
print(user.name)
```

* 动态添加方法
```py
class User:
    pass

# 为类动态添加方法 所有实例均有效
def set_name(self, name):
    self.name = name
User.set_name = set_name

# 为实例动态添加方法
from types import MethodType

user = User()
def set_age(self, age):
    self.age = age
user.set_age = MethodType(set_age, user)
```

* 其他特性
```py
# MixIn(混入)设计 多重继承
# python 自带的多进程MixIn
class MyTCPServer(TCPServer, ForkingMixIn):
    pass

# 斐波那契数列类 __iter__ 使实例可以for in 循环
class Fib(object):
    def __init__(self):
        # 初始化两个计数器a，b
        self.a, self.b = 0, 1 

    def __iter__(self):
        # 实例本身就是迭代对象，故返回自己
        return self 

    def __next__(self):
        # 计算下一组值
        self.a, self.b = self.b, self.a + self.b
        # 退出循环的条件
        if self.a > 100000:
            raise StopIteration()
        return self.a

    # 像list一样按下标取元素 fib[5]
    # n可能是int 也可能是个切片对象... 所以应对n进行判断 isinstanse(n, slice)
    def __getitem__(self, n):
           a, b = 1, 1
           for x in range(n):
               a, b = b, a + b
           return a

    # 像list一样赋值时 _fib[2] = 123
    def __setitem__(self, key, value):
        pass

    # del _fib[2]时
    def __delitem__(self, key):
        pass

    # 调用不存在的属性时
    def __getattr__(self, attr):
        if attr == 'name':
            return 'Jerry'
        else:
            raise AttributeError('%s is not defined' % attr)

    # 将对象作为方法调用时
    def __call__ (self):
        pass
```

## 枚举类型
```py
# 枚举类型不可实例化，不可更改
from enum import Enum, unique
Month = Enum('Month', ('Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'))

# 拥有name、value属性 自动赋予成员value为int常量 从1开始 即Jan为1
Month.Jan

# 遍历成员(不包括重复值的成员)
for date in Month:
    print(date, date.name, date.value)

# 当需要遍历所有成员包括重复值时可以使用__members__属性
for name, member in Month.__members__.items():
    print(name, '=>', member, ',', member.value)

# 自定义
# 成员名不允许重复
# 值重复时第二个成员的名称被视作第一个成员的别名
# unique装饰 不允许有重复值
@unique
class Weekday(Enum):
    Sun = 0
    Mon = 1
    Tue = 2
    Wed = 3
    Thu = 4
    Fri = 5
    Sat = 6

for date in Weekday:
    print(date, date.name, date.value)

# see more @https://segmentfault.com/a/1190000017327003
```