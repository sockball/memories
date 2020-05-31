## type
* 查看类型或变量类型 `type(lambda x: x)`

* 动态创建类
```py
def fn (self, name):
    print('hello %s' % name)

# (类名, 父类集合(tumple), 方法名称与函数绑定)
Hello = type('Hello', (object,), { "hello": fn })
h = Hello()
h.hello('Tom')
```

* 创建元类metaclass
```py
# metaclass是类的模板，必须从type类型派生，按习惯以Metaclass结尾
class ListMetaclass (type):
    # arg1: 当前准备创建的类对象(ListMetaclass)
    # arg2: 当前类名(MyList)
    # arg3: 类继承的父类集合(tumple)(不包含metaclass)
    # arg4: 类的方法集合
    def __new__(cls, name, bases, attrs):
        # 为该list添加add方法
        attrs['add'] = lambda self, value: self.append(value)
        return type.__new__(cls, name, bases, attrs)

class MyList(list, metaclass = ListMetaclass):
    pass

l = MyList()
l.add(12345)
print(l)
```

## 错误、调试、测试

* assert断言
```py
# 失败抛出AssertionError异常
# 使用-O 选项可以关闭assert 等于pass：python -O test.py
# 之后可以接一个参数表示记录的信息
msg = '1不等于0'
assert 1 == 0, msg
```

* logging 输出但不抛出错误
```py
import logging
# debug info warning error
logging.basicConfig(level = logging.INFO)
logging.info('something wrong')
try:
    bar('0')
except Exception as e:
    logging.exception(e)
print(123)
```

* 单步调试pdb
```py
# python -m pdb test.py
# l查看代码；n单步执行；"p 变量名" 查看变量值；c继续运行至下一个断点处；q退出

import pdb
# 使用内置方法手动设置断点
pdb.set_trace()
```

* 单元测试
```py
import unittest

class TestDict(unittest.TestCase):

    # 在执行每个测试方法前执行
    def setUp(self):
        print('setUp...')

    # 在执行每个测试方法后执行
    def tearDown(self):
        print('tearDown...')

    # 以test开头的方法为测试方法
    def test_init(self):
        self.assertEqual(1, 1)
        self.assertEqual('test', 'test')
        self.assertTrue(isinstance({ 'name': 'py' }, dict))
        # 期望抛出指定异常
        with self.assertRaises(NameError):
            value = not_exist['empty']
        
        with self.assertRaises(IndexError):
            arr = [1]
            value = arr[222]

# 单个测试写入以下后直接运行 或者 模块测试 python -m unittest test
if __name__ == '__main__':
    unittest.main()
```

* 文档测试(doctest) (...表示省略一大段输出)
```py
class Dict(dict):
    '''
    Simple dict but also support access as x.y style.

    >>> d1 = Dict()
    >>> d1['x'] = 100
    >>> d1.x
    100
    >>> d1.y = 200
    >>> d1['y']
    200
    >>> d2 = Dict(a = 1, b = 2, c = '3')
    >>> d2.c
    '3'
    >>> d2['empty']
    Traceback (most recent call last):
        ...
    KeyError: 'empty'
    >>> d2.empty
    Traceback (most recent call last):
        ...
    AttributeError: 'Dict' object has no attribute 'empty'
    '''
    def __init__(self, **kw):
        super(Dict, self).__init__(**kw)

    def __getattr__(self, key):
        try:
            return self[key]
        except KeyError:
            raise AttributeError(r"'Dict' object has no attribute '%s'" % key)

    def __setattr__(self, key, value):
        self[key] = value

# 直接运行即可
if __name__=='__main__':
    import doctest
    doctest.testmod()
```

## IO

* 文件补充
```py
file = '/path/to/file'
# with替代以下写法 自动调用close
'''
try:
    f = open(file, 'r')
    print(f.read())
finally:
    if f:
        f.close()
'''
with open(file, 'r') as f:
    print(f.read())

# open方法更多的参数 errors表示遇到编码错误时的处理
open('/Users/michael/gbk.txt', 'r', encoding = 'gbk', errors = 'ignore')
```

* 内存中读写
```py
# 内存中读写str 多次read一样会移动指针...
from io import StringIO
f = StringIO('Hello\nHi\nGoodbye')
f.read()
f.seek(0)
print(f.read())
f.write('hello')
f.write(' ')
f.write('world')
print(f.getvalue(), f.read(), sep = '\n\n')

# 内存中读写二进制数据
from io import BytesIO
f = BytesIO(b'\xe4\xb8\xad\xe6\x96\x87')
print(f.getvalue(), f.read(), sep = '\n\n')
f = BytesIO()
f.write('中文'.encode('utf-8'))
print(f.getvalue(), f.read(), sep = '\n\n')
```

* **序列化**：把变量从内存中变成可存储或传输的过程称之为序列化
    * pickle
    ```py
    import pickle

    # 将任意对象序列化成一个bytes
    pickle.dumps('a string')

    file = 'dump.txt'
    # dump 将任意对象序列化后写入一个file-like Object
    with open(file, 'wb') as f:
        pickle.dump('a string', f)

    # load读取 值为原对象
    with open(file, 'rb') as f:
        d = pickle.load(f)
    ```

    * json
    ```py
    import json

    d = { 'name': 'Marry'}
    # 转化成json字符串
    s = json.dumps(d)
    d = json.loads(s)

    ############################################

    # 序列化对象时要使对象JSON serializable
    def student2dict (std):
        return {
            'name': std.name,
            'age': std.age
        }

    # 反序列化
    def dict2student(d):
        return Student(d['name'], d['age'])

    class Student:
        def __init__ (self, name = 'Jerry', age = 17):
            self.name = name
            self.age = age

    s = Student()
    print(json.dumps(s, default = student2dict))

    json_str = '{"name":"Jerry","age":12}'
    print(json.loads(json_str, object_hook = dict2student))

    ############################################

    # ensure_ascii选项 默认为True 表示当序列化时有非ASCII字符时自动转义成其他编码
    obj = dict(name='小明', age=20)
    s = json.dumps(obj, ensure_ascii = False)
    ```

## 进程和线程

* 多进程
    * fork函数
    ```py
    import os

    print('Process (%s) start...' % os.getpid())

    # Only works on Unix/Linux/Mac:
    # 子进程永远返回0... fork调用一次返回2次...一次为当前进程 一次为子进程
    pid = os.fork()
    if pid == 0:
        print('I am child process (%s) and my parent is %s.' % (os.getpid(), os.getppid()))
    else:
        print('I (%s) just created a child process (%s).' % (os.getpid(), pid))
    ```

    * 跨平台的多进程模块 multiprocessing - Process
    ```py
    import os
    from multiprocessing import Process

    # 子进程执行的代码
    def child_run(name = 'shit'):
        print('Run child process %s (%s)...' % (name, os.getpid()))

    if __name__ == '__main__':
        print('Parent process %s.' % os.getpid())
        
        # 创建进程需要一个执行函数和函数参数(iterable即可)
        p = Process(target = child_run, args = ('test',))
        print('Child process will start.')
        
        p.start()
        # 使程序等待子进程结束后再继续运行
        p.join()
        print('Child process end.')
    ```

    * 进程池 multiprocessing - Pool
    ```py
    from multiprocessing import Pool
    import os, time, random

    def long_time_task (name):
        print('Run task %s (%s)...' % (name, os.getpid()))
        start = time.time()
        time.sleep(random.random() * 3)
        end = time.time()
        print('Task %s runs %.2f seconds.' % (name, (end - start)))

    if __name__ == '__main__':
        print('Parent process %s.' % os.getpid())

        childNum = 4
        taskNum = 7
        p = Pool(childNum)
        for i in range(taskNum):
            p.apply_async(long_time_task, args = (i,))

        print('Waiting for all subprocesses done...')
        # 对Pool对象调用join必须先调用close，且close调用后不能再添加新的进程?
        p.close()
        p.join()
        print('All subprocesses done.')
    ```

    * 子进程模块subprocess
    ```py
    import subprocess

    # 启动一个外部进程
    print('$ nslookup segmentfault.com')
    r = subprocess.call(['nslookup', 'segmentfault.com'])
    print('Exit code:', r)

    #############################
    # 带输入的子进程

    # 相当于 nslookup; set q=mx; segmentfault.com; exit 4步
    print('$ nslookup')
    p = subprocess.Popen(['nslookup'], stdin = subprocess.PIPE, stdout = subprocess.PIPE, stderr = subprocess.PIPE)

    output, err = p.communicate(b'set q=mx\nsegmentfault.com\nexit\n')

    # Windows下编码取决于cmd默认编码 chcp可以确认 936为GBK
    print(output.decode('gbk'))
    print(err.decode('gbk'))
    print('Exit code:', p.returncode)
    ```

    * ⚠️⚠️进程通信 multiprocessing - Queue、Pipes等⚠️⚠️
    ```py
    # Queue举例

    from multiprocessing import Process, Queue
    import os, time, random

    # 写数据进程执行的代码:
    def write(q):
        print('Process to write: %s' % os.getpid())
        for value in ['A', 'B', 'C']:
            print('Put %s to queue...' % value)
            q.put(value)
            time.sleep(random.random())

    # 读数据进程执行的代码:
    def read(q):
        print('Process to read: %s' % os.getpid())
        while True:
            value = q.get(block = True, timeout = None)
            print('Get %s from queue.' % value)

    if __name__ == '__main__':
        # 父进程创建Queue，并传递给各子进程：
        q = Queue()
        p_write = Process(target = write, args = (q,))
        p_read = Process(target= read, args = (q,))

        p_write.start()
        # ⚠️⚠️ Question：启动后为何没有第一条print...
        p_read.start()

        # 等待p_write结束:
        p_write.join()

        # p_read进程里是死循环，无法等待其结束，只能强行终止:
        p_read.terminate()
    ```

    * 分布式进程 multiprocessing.managers 子模块
    ```py
    ######################### master.py #########################
    import random, time, queue
    from multiprocessing.managers import BaseManager

    # 发送任务的队列:
    task_queue = queue.Queue()
    # 接收结果的队列:
    result_queue = queue.Queue()

    class QueueManager(BaseManager):
        pass

    def main ():
        # 把两个Queue都注册到网络上, callable参数关联了Queue对象, 
        # Windows下不能使用匿名函数只能定义后传入函数名...
        QueueManager.register('get_task_queue', callable = lambda: task_queue)
        QueueManager.register('get_result_queue', callable = lambda: result_queue)

        # 绑定端口5000, 设置验证码'abc'
        # windows下必须指定IP linux下不填默认为本地IP
        server_addr = '127.0.0.1'
        manager = QueueManager(address = (server_addr, 5000), authkey = b'abc')
        manager.start()

        # 获得通过网络访问的Queue对象:
        task = manager.get_task_queue()
        result = manager.get_result_queue()
        # 放几个任务进去:
        for i in range(10):
            n = random.randint(0, 10000)
            print('Put task %d...' % n)
            task.put(n)

        # 从result队列读取结果:
        print('Try get results...')
        for i in range(10):
            r = result.get(timeout = 10)
            print('Result: %s' % r)

        manager.shutdown()
        print('master exit.')

    if __name__ == '__main__':
        '''
        windows兼容...
        from multiprocessing import freeze_support
        freeze_support()
        '''
        main()
    ```
    ```py
    ######################### worker.py #########################
    import random, time, queue
    from multiprocessing.managers import BaseManager

    class QueueManager(BaseManager):
        pass

    # 由于这个QueueManager只从网络上获取Queue，所以注册时只提供名字:
    QueueManager.register('get_task_queue')
    QueueManager.register('get_result_queue')

    server_addr = '127.0.0.1'
    print('Connect to server %s...' % server_addr)

    manager = QueueManager(address = (server_addr, 5000), authkey = b'abc')
    manager.connect()

    task = manager.get_task_queue()
    result = manager.get_result_queue()

    for i in range(10):
        try:
            n = task.get(timeout = 1)
            print('run task %d * %d...' % (n, n))
            r = '%d * %d = %d' % (n, n, n*n)
            time.sleep(1)
            result.put(r)
        except Queue.Empty:
            print('task queue is empty.')

    print('worker exit.')
    ```

* 多线程 
    * 标准库提供_thread、threading模块(对_thread进行了封装)
    ```py
    import time, threading

    # 新线程执行的代码
    def loop():
        print('thread %s is running...' % threading.current_thread().name)
        n = 0
        while n < 5:
            n = n + 1
            print('thread %s >>> %s' % (threading.current_thread().name, n))
            time.sleep(1)
        print('thread %s ended.' % threading.current_thread().name)

    # 当前为主线程 MainThread
    print('thread %s is running...' % threading.current_thread().name)

    # name默认为Thread-1、Thread-2...
    t = threading.Thread(target = loop, name = 'LoopThread')
    t.start()
    t.join()
    print('thread %s ended.' % threading.current_thread().name)
    ```

    * 线程锁
    ```py
    import time, threading

    balance = 0
    # 对于全局变量应加锁 比如balance变量
    lock = threading.Lock()

    def change_it(n):
        # 先存后取，结果应该为0:
        global balance
        balance = balance + n
        balance = balance - n

    def run_thread(n):
        for i in range(100000):
            # 获取锁最后释放
            lock.acquire()
            try:
                change_it(n)
            finally:
                lock.release()

    t1 = threading.Thread(target = run_thread, args = (5,))
    t2 = threading.Thread(target = run_thread, args = (8,))
    t1.start()
    t2.start()
    t1.join()
    t2.join()
    print(balance)
    ```

    * 多线程无法有效利用多核(引用)
    > Python的线程虽然是真正的线程，但解释器执行代码时，有一个GIL锁：Global Interpreter Lock，任何Python线程执行前，必须先获得GIL锁，然后，每执行100条字节码，解释器就自动释放GIL锁，让别的线程有机会执行。这个GIL全局锁实际上把所有线程的执行代码都给上了锁，所以，多线程在Python中只能交替执行，即使100个线程跑在100核CPU上，也只能用到1个核。
    <br><br>
    GIL是Python解释器设计的历史遗留问题，通常我们用的解释器是官方实现的CPython，要真正利用多核，除非重写一个不带GIL的解释器。
    <br><br>
    所以，在Python中，可以使用多线程，但不要指望能有效利用多核。如果一定要通过多线程利用多核，那只能通过C扩展来实现，不过这样就失去了Python简单易用的特点。
    不过，也不用过于担心，Python虽然不能利用多线程实现多核任务，但可以通过多进程实现多核任务。多个Python进程有各自独立的GIL锁，互不影响。

    * 线程局部变量传参使用ThreadLocal对象
    ```py
    import threading

    # 创建全局ThreadLocal对象:
    local_school = threading.local()

    def read_student ():
        # 获取当前线程关联的student:
        std = local_school.student
        print('Hello, %s (in %s)' % (std, threading.current_thread().name))

    def process_thread (name):
        # 绑定ThreadLocal的student:
        local_school.student = name
        read_student()

    t1 = threading.Thread(target = process_thread, args = ('Alice',), name = 'Thread-A')
    t2 = threading.Thread(target = process_thread, args = ('Bob',), name = 'Thread-B')
    t1.start()
    t2.start()
    t1.join()
    t2.join()
    ```
