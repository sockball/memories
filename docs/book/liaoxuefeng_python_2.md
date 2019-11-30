## 高阶函数

* **map**
```py
# 参数一为函数名, 参数2为Interable, 将函数应用于其每个元素 返回Iterator
g = map(int, '123')

# list函数可以获得所有结果
list(g)
```

* **reduce**
```py
from functools import reduce
# 参数一为函数名 参数二为Interable
# reduce(f, [x1, x2, x3, x4]) = f(f(f(x1, x2), x3), x4)

# 求一个元素都为数字的Iterable的乘积
def product(L):
    def f (x, y):
        return x * y
    return reduce(f, L)

# 字符串转换为浮点
def str2float(s):
    if not isinstance(s, str):
        raise Exception('not a str')

    def interger (x, y):
        return x * 10 + y
    def decimal (x, y):
        return x / 10 + y

    arr = s.split('.')
    if len(arr) < 2:
        return reduce(interger, map(int, arr[0]))
    elif len(arr) == 2:
        return reduce(interger, map(int, arr[0])) + reduce(decimal, map(int, arr[1][::-1])) / 10
    else:
        raise Exception('not a correct str')
```

* **filter**
```py
# 根据函数返回的True or False 进行过滤，返回Iterator

# 筛选素数
# 生成奇数序列（2以上的偶数一定不是素数
def _odd_iter ():
    n = 1
    while True:
        n = n + 2
        yield n

# 筛选条件 去除所有素数倍数的数
def _not_divisible (n):
    return lambda x: x % n > 0

def primes ():
    yield 2
    # 初始序列
    it = _odd_iter()
    while True:
        # 返回序列的第一个数，即素数
        n = next(it) 
        yield n
        # 若此处写为匿名函数则过滤失效... n一直为3 但3的倍数也未过滤???
        # it = filter(lambda x: x % n > 0, it)
        it = filter(_not_divisible(n), it)
```

* **sorted**
```py
L = [1, 2, 10, 3, 6, -1]
sorted(L)

# 对元素使用函数后再进行排序
sorted(L, key = abs)

# 忽略大小写的字符串排序
sorted(['bob', 'about', 'Zoo', 'Credit'], key = str.lower)

# 倒序排列
sorted(L, key = abs, reverse = True)

# 自定义排序
L = [('Bob', 75), ('Adam', 92), ('Bart', 66), ('Lisa', 88)]
def by_name(t):
    return sorted(t, key = lambda student: student[0])

# 按分数从大到小排列
def by_score(t):
    return sorted(t, key = lambda student: -student[1])
```

## 装饰器

* 基本使用
```py
def log (func):
    def wrapper (*args, **kw):
        print('begin call %s' % func.__name__)
        result = func(*args, **kw)
        print('end call %s' % func.__name__)
        return result
    return wrapper

# 相当于执行了 log(test(output))
@log
def test(output = 'oh my god'):
    print(output)
```

* 为decorator传参
```py
# 相当于 log('user')(test()) 第一次调用返回一个decorator...
def log (type):
    if type is 'user':
        def decorator (func):
            def wrapper (*args, **kw):
                print('begin userEvent')
                result = func(*args, **kw)
                print('end userEvent')
                return result
            return wrapper
    else:
        def decorator (func):
            def wrapper (*args, **kw):
                print('begin otherEvent')
                result = func(*args, **kw)
                print('end otherEvent')
                return result
            return wrapper
    return decorator

@log('user')
def test(output = 'oh my god'):
    print(output)
```

* 一个支持带参/不带参的decorator
```py
import functools
def log (arg):
    def decorator (func):
        # 经过装饰后的函数名(test.__name__)为wrapper
        # 使用以下方法替代 wrapper.__name__ = func.__name__ 保持函数名原样
        @functools.wraps(func)
        def wrapper (*args, **kw):
            print('decorator 参数 %s' % arg)
            print('begin call %s' % func.__name__)
            result = func(*args, **kw)
            print('end call %s' % func.__name__)
            return result
        return wrapper
    if isinstance(arg, str):
        # 带参数返回decorator
        return decorator
    else:
        # 不带参数直接返回wrapper
        return decorator(arg)

# @log
@log('execute')
def test():
    print('proceeding')
```

## 偏函数

```py
# 使用functools.partial固定函数部分参数创建新的函数
import functools

# 二进制转换为十进制
int2 = functools.partial(int, base = 2)
int('10011101')

# 将10固定纳入比较
max2 = functools.partial(max, 10)
max2(5, 6, 7, 8)
```

