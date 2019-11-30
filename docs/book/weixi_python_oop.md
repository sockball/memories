## 课程地址
[传送门](http://www.weixistyle.com/pythonoop.php)

## 基础
1. **生命周期**
```py
class Teacher:
    # 所有类均继承obejct类 实例化时首先被调用
    # def __new__ (self):
    #    return object.__new__(cls)

    def __init__ (self, age):
        self.age = age

    # 对象被销毁时自动调用, 程序结束或手动销毁：del teacher
    def __del__ ():
        print('教师对象被清除了')
```

2. 对象运算符
```py
class Teacher:
    '''
    教师类
    属性：...
    方法：...
    '''

    def test (self):
        '''测验的方法'''
        pass

    # 对象的运算符
    def __eq__ (self, other):
        return self.age > other.age

    def __gt__ (self, other):
        return self.age > other.age

    # 大于等于
    def __ge__ (self, other):
        return self.age >= other.age

    # 相加运算
    def __add__ (self, other):
        return self.age + other.age

    # 四舍五入时
    def __round__ (self):
        return round(self.age)

t1 = Teacher(23)
t2 = Teacher(32)
t1 > t2
t1 + t2
rount(t1)
```

3. 内建属性
```py
class Zombie:
    '''
    僵尸类
    属性：...
    方法：...
    '''

    def attack (self):
        '''攻击方法'''
        pass

    # 对象的描述信息 print对象时调用
    def __str__ (self):
        return 'i am zombie'

    # 同上 优先使用__str__
    # 偷懒写法
    # __repr__ = __str__
    def __repr__ (self):
        return 'and i am zombie too'

z1 = Zombie()

# 查看对象所有属性和方法 返回list
dir(z1)

# 查看对象所在类 __main__.Zombie, __main__表示当前文件定义的, 若为其他模块定义则为其他模块名
z1.__class__
z1.__class__.__class__

# 返回类、方法的注释信息
z1.__doc__
z1.attack.__doc__

# 返回一个dic, 由对象属性和值组成的键值对
z1.__dict__
```

4. 私有属性、方法
```py
class Plant:
    def __init__ (self):
        # 私有属性加入 __
        self.__healthPoint = 100

    def __private_method (self):
        print('私有方法')

    # 实际开发中 常约定单下划线表示私有 尽管可以访问 尽量避免访问
    def _do_not_use_me (self):
        pass

p1 = Plant()
# 外部不可访问私有方法、属性, 但并不是只有真正意义上的私有 可用特殊方法访问
p1._Plant__healthPoint
p1._Plant__private_method()
```

5. extra
```py
# is、is not 运算符：对象时判断是否是同一个内存地址，其他类型判断值是否相等?
z1 = Zombie()
z2 = z1
z2 is z1

a = 1
b = a
c = 1
d = 2
a is b
c is a
d is not a
```

## 继承、类属性、类方法、静态方法
```py
class BaseModel:
    # 类属性、类方法、静态方法, 实例、类均可调用
    EVENT_BEFORE_SAVE = 'before_save'

    @classmethod
    def table (cls):
        return 'table name'

    @staticmethod
    def statusTexts():
        return ['成功', '失败']

    def __init__ (self, tableName):
        self.tableName = tableName

        # 子类也不能直接调用父类私有属性、私有方法
        self.__private = '私有属性'

    def __private_method (self):
        pass

    def showPrivate (self):
        print(self.__private)
        self.__priate_method()

class User(BaseModel):
    def __init__ (self, tableName, pk):
        # super调用父类方法
        super(BaseModel, self).__init__(tableName)
        self.pk = 'uid'

# 多继承 具有所有父类的属性和方法
# 调用父类同名属性、方法时 依据类属性__mro__的值(元组)查看第一个拥有该方法的类并调用
class Human(Teacher, Doctor)
```

## 异常
```py
try:
    print(1/0)

except ValueError:
    print('不是整数')

except ZeroDivisionError:
    print('不能为0')

except Exception as e:
    print('遇到未知错误...')
    raise
else:
    # 没有异常时才会执行
    pass
finally:
    pass

# 手动抛出异常
raise Exception('400 Bad Request')
```
## 模块
```py
# 模块和包
# 首先在当前目录下查找，再到系统目录中查找
import os, time
import module as Module

from module import SomeClass

def main:
    # 演示代码
    print('demo')

# 仅当前文件时运行 模块引用时 __name__ 即模块名
if __name__ == '__main__':
    main()
```

## 包
```sh
mkdir shops && cd shops
touch __init__.py
touch Animate.py
touch Melonbooks.py
touch NotSupport.py
```

```py
# __init__.py

# 指定目录中可以对外提供调用的模块
from . import Animate
from . import Melonbooks

# 外部调用时
import shops
shops.Animate.query()
```
