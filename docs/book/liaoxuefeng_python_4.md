## 正则表达式

* r前缀
```py
# 使用r前缀表示原始字符串
pattern = 'ABC-001\\n'
pattern_r = r'ABC-001\n'
print(pattern == pattern_r)
```

* re模块
    * match、search
    ```py
    import re

    pattern = r'<span>.*?</span>'
    text = '<div class="sample"><span>just test</span></div>'
    # 从字符串起始位置开始匹配... 相当于自动添加^...
    # 匹配成功返回Match对象 失败返回None 此例返回None
    re.match(pattern, text) 
    # 搜索整个字符串
    re.search(pattern, text)
    ```

    * split切分字符串
    ```py
    text = 'a b   c'
    text.split(' ')        # ['a', 'b', '', '', c]
    re.split(r'\s+', text) # ['a', 'b', 'c']
    ```

    * 分组
    ```py
    pattern = r'^(\d{3})-(\d{3,8})$'
    text = '010-12345'
    m = re.match(pattern, text)
    m.group(0) # 原始字符串
    m.group(1) # 010
    m.group(2) # 12345
    m.groups() # ('010', '12345')

    # 分组使用 ? 时 即使未匹配到，也会有该index，值为None
    pattern = r'(\d)?(\w+)'
    text = 'test'
    re.match(pattern, text).groups() # (None, 'test')
    ```

    * 预编译正则表达式
    ```py
    # 生成Regular Expression对象
    re_telephone = re.compile(r'^(\d{3})(\d{3,8})$')
    re_telephone.match('13812345678').groups()
    ```

## 内建模块(batteries included)

* **datetime**
    * 时间戳及转换
    ```py
    from datetime import datetime

    datetime.now() # 一个datatime对象 2019-11-27 17:54:33.973119

    dt = datetime(2018, 9, 10 , 11, 0, 1) # 2018-09-10 11:00:01
    # 类型为float 1536548401.0
    t = dt.timestamp()
    # 本机时间 2018-09-10 11:00:01
    datetime.fromtimestamp(t)
    # 标准时区 2018-09-10 03:00:01
    datetime.utcfromtimestamp(t)

    # str转datetime
    # @see https://docs.python.org/3/library/datetime.html#strftime-strptime-behavior
    datetime.strptime('2015-6-1 18:19:59', '%Y-%m-%d %H:%M:%S')

    # datetime转str
    # format codes @see https://docs.python.org/3/library/datetime.html#strftime-and-strptime-format-codes
    dt.strftime('%a, %b %d %H:%M')
    ```
    
    * 计算
    ```py
    from datetime import datetime, timedelta
    now = datetime.now()
    now + timedelta(days = 2, hours = 12)
    now - timedelta(hours = 12)
    ```

    * 时区
    ```py
    from datetime import timezone
    # 创建时区UTC+8:00
    utc_8 = timezone(timedelta(hours = 8))
    utc_9 = timezone(timedelta(hours = 9))

    # 时区属性 datetime.tzinfo 默认为None
    # 强制设置时区(时间不变...)
    dt = datetime.now().replace(tzinfo = utc_9)

    # 时区转换(时间变)
    # utcnow()获取当前UTC时间 并设置时区为UTC
    utc_dt = datetime.utcnow().replace(tzinfo = timezone.utc)
    # astimezone()转换时区:
    beijing_dt = utc_dt.astimezone(utc_8)
    # utc_dt转换时区为东京:
    tokyo_dt = utc_dt.astimezone(utc_9)
    # beijing_dt转换时区为东京:
    tokyo_dt2 = beijing_dt.astimezone(utc_9)
    print(tokyo_dt == tokyo_dt2)
    ```

* **collections**
    * **namedtuple** 创建自定义tuple规定了元素个数 用属性引用元素
    ```py
    from collections import namedtuple

    # 定义二维坐标
    Point = namedtuple('Point', ['x', 'y'])
    p = Point(1, 2)
    print(p.x, p.y)

    # 同时为tuple的子类
    isinstance(p, tuple)

    # 定义一个圆
    Circle = namedtuple('Circle', ['x', 'y', 'r'])
    ```

    * **deque** 双向链表
    ```py
    from collections import deque
    
    q = deque([1, 2, 3, 4])
    q.append()
    q.appendleft()
    q.pop()
    q.popleft()
    ```
     
    * **defaultdict** 访问不存在key时返回默认值的dict
    ```py
    from collections import defaultdict

    # 创建时传入返回默认值的函数...
    d = defaultdict(lambda: 'N/A')
    d[1] = 2
    # N/A
    print(d[2])
    ```

    * **OrderedDict** 根据插入先后顺序排序的有序dict
    ```py
    from collections import OrderedDict

    d = OrderedDict([('a', 1), ('b', 2), ('c', 3)])
    print(list(d.keys()))
    ```

    * **ChainMap** 组合dict 查找时按顺序查找
    ```py
    from collections import ChainMap
    
    user = { 'name': 'Mary' }
    group = { 'age': 20 }
    default = { 'height': 155, 'weight': 40 }
    
    chain = ChainMap(user, group, default)
    chain['name']
    chain['age']
    chain['height']
    chain['weight']
    ```

    * Counter 简单计数器dict
    ```py
    from collections import Counter

    # c = Counter('programming')
    c = Counter()
    # 统计字符个数
    for ch in 'programming':
        c[ch] += 1
    print(c)
    ```

* **base64**  
把3字节的二进制数据编码为4字节的文本数据 长度增加33% 长度是4的倍数  
不足3字节用 **\x00** 字节补足 并在编码末尾追加相同数量的 **=**   
URL、Cookie中 **=** 可能造成歧义 有些encode后可能会去掉
```py
import base64

# 仅接受bytes-like object参数
base64.b64encode(b'binary\x00string')

# 同时接受bytes和string类型
base64.b64decode(b'YmluYXJ5AHN0cmluZw==')

# 将标准编码中 + / 字符 换成 - _
base64.urlsafe_b64encode()
base64.urlsafe_b64decode()
```

* **struct** bytes与其他二进制数据类型转换
```py
import struct

# pack方法将任意类型转换为bytes
# > 表示字节顺序是big-endian，也就是网络序？？，I表示4字节无符号整型
# @ = < > ! 字节顺序 @see https://docs.python.org/3/library/struct.html#byte-order-size-and-alignment
# 数据类型 @see https://docs.python.org/3/library/struct.html#format-characters
struct.pack('>I', 3333333333)

# unpack将bytes转换为相应的数据类型
# 该参数为6字节 IH 表示依次转换4字节，2字节无符号整型
# 结果为 (4042322160, 32896)
struct.unpack('>IH', b'\xf0\xf0\xf0\xf0\x80\x80')

# bmp位图的前30字节为文件头
img = open('sample.bmp', 'rb')
s = struct.unpack('<ccIIIIIIHH', img.read(30))
'''
(b'B', b'M', 747574, 0, 1078, 40, 1152, 648, 1, 8)
[0] b'B'    : 
[1] b'M'    : 索引0、1合起来 BM表示Windows位图 BA表示OS/2位图
[2] 2747574 : 位图大小
[3] 0       : 保留位，始终为0
[4] 1078    : 实际图像偏移量
[5] 40      : Header字节数
[6] 1152    : 图像宽度
[7] 648     : 图像高度
[8] 1       : 始终为1
[9] 8       : 颜色深度
'''
img.close()
```

* **hashlib** 哈希算法 散列算法 摘要算法
```py
import hashlib

password = '123456'

# 128bit 32位16进制字符串
md5 = hashlib.md5()
md5.update(password.encode('utf-8'))
md5.hexdigest()

# 160bit 40位16进制字符串
sha1 = hashlib.sha1()
sha1.update(password.encode('utf-8'))
sha1.hexdigest()
```

* **hmac** Keyed-Hashing for Message Authentication 通用的加salt算法
```py
import hmac

salt = b'839244'
msg = b'username'
# 通过一个标准算法把salt混入计算过程中
# 参数一、二都为bytes，使用str类型时需要先encode('utf-8')
h = hmac.new(salt, msg, digestmod = 'MD5')
h.hexdigest()
```

* **itertools** 提供处理迭代对象的方法
```py
import itertools

# 一个无限自然数序列 参数1控制起始值... 参数2控制步长
natuals = itertools.count(1)
for n in natuals:
    if (n > 100):
        break
    print(n)

# 对传入的参数(可迭代对象)每个元素无限循环 以下依次输出 A、B、C、A、B、C...
cs = itertools.cycle('ABC')
index = 0
for s in cs:
    if (index > 100):
        break
    else:
        index += 1
        print(s)

# 将传入的参数无限的重复 参数2可指定次数
r = itertools.repeat('A', 3)
for s in r:
    print(s)

# takewhile可将以上无限序列根据条件截取成有限序列
natuals = itertools.count(1)
ten = itertools.takewhile(lambda x: x < 10, natuals)
# [1, 2, 3 ... 10]
list(ten)

# 把一组迭代对象串联起来
t = itertools.chain({1, 2, 3}, (4, 5, 6), '789', ['a', 'b', 'c'])
for n in t:
    print(n)

# 将相邻的重复元素挑出并放在一起
# key为重复元素的值 group为所有重复元素组成的迭代器
# 参数2为对每个元素应用的方法 当方法返回值相同时则认为相等
# for key, group in itertools.groupby('AAABBBCCAAA'):
for key, group in itertools.groupby('AaaBBbcCAAa', lambda s: s.upper()):
    print(key, list(group))


# 计算pi的值
def pi (N):
    # step 1: 创建一个奇数序列: 1, 3, 5, 7, 9, ...
    odd = itertools.count(1, 2)
    # step 2: 取该序列的前N项: 1, 3, 5, 7, 9, ..., 2*N-1.
    odd = itertools.takewhile(lambda x: x < (2 * N - 1), odd)
    # step 3: 添加正负符号并用4除: 4/1, -4/3, 4/5, -4/7, 4/9, ...
    l = [((-1) ** i) * 4 / v for i, v in enumerate(list(odd))]
    # step 4: 求和:
    return sum(l)

'''
# best
def pi (N):
    s, divisor = 0, 4
    for n in itertools.takewhile(lambda x: x < (2 * N - 1), itertools.count(1, 2)):
        s, divisor = s + divisor / n , -divisor

    return s
'''
```

* **contextlib**
    * 实现了上下文管理的对象即可使用with 需实现 **\_\_enter__** 和 **\_\_exit__** 方法
    ```py
    class Query(object):

        def __init__(self, name):
            self.name = name

        def __enter__(self):
            print('Begin')
            return self

        def __exit__(self, exc_type, exc_value, traceback):
            if exc_type:
                print('Error')
            else:
                print('End')
        
        def query(self):
            print('Query info about %s...' % self.name)

    with Query('test') as t:
        t.query()
    ```

    * 使用装饰器 **contextmanager** 简写
    ```py
    from contextlib import contextmanager

    ''' -------------- sample 1 -------------- '''

    class Query(object):

        def __init__(self, name):
            self.name = name

        def query(self):
            print('Query info about %s...' % self.name)

    # 此装饰器接受一个生成器参数
    @contextmanager
    def create_query(name):
        print('Begin')
        q = Query(name)
        yield q
        print('End')

    with create_query('test') as q:
        q.query()

    ''' -------------- sample 2 -------------- '''

    # 在一段代码前后执行一段自定义代码
    @contextmanager
    def tag(name):
        print('<%s>' % name)
        yield
        print('</%s>' % name)

    with tag('h1'):
        print('hello')
        print('world')
    ```

    * 利用 **closing** 将对象变为上下文对象 该对象需有close方法
    ```py
    from contextlib import closing
    from urllib.request import urlopen

    with closing(urlopen('https://www.python.org')) as page:
        for line in page:
            print(line)

    # closing的实现
    @contextmanager
    def closing(thing):
        try:
            yield thing
        finally:
            thing.close()
    ```

* **urllib**
```py
from urllib import request

def parseF (f):
    print('Status:', f.status, f.reason)
    for k, v in f.getheaders():
        print('%s: %s' % (k, v))
    print('Data:', f.read().decode('utf-8'))

''' -------------- GET -------------- '''

url = 'https://www.douban.com'
req = request.Request(url)
req.add_header('User-Agent', 'Mozilla/6.0 (iPhone; CPU iPhone OS 8_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/8.0 Mobile/10A5376e Safari/8536.25')

# with request.urlopen(url) as f:
with request.urlopen(req) as f:
    parseF(f)

''' -------------- POST -------------- '''

from urllib import parse

email = 'email'
passwd = 'password'
login_data = parse.urlencode([
    ('username', email),
    ('password', passwd),
])

url = 'https://passport.weibo.cn/sso/login'
req = request.Request(url)
req.add_header('Referer', 'https://passport.weibo.cn/signin/login?entry=mweibo&res=wel&wm=3349&r=http%3A%2F%2Fm.weibo.cn%2F')
with request.urlopen(req, data = login_data.encode('utf-8')) as f:
    parseF(f)

''' -------------- ProxyHandler -------------- '''

proxy_handler = urllib.request.ProxyHandler({ 'http': 'http://www.example.com:3128/' })
proxy_auth_handler = urllib.request.ProxyBasicAuthHandler()
# 关于realm @see
# 1. https://docs.python.org/zh-cn/3/howto/urllib2.html#id5
# 2. https://stackoverflow.com/questions/12701085/what-is-the-realm-in-basic-authentication
proxy_auth_handler.add_password('realm', 'host', 'username', 'password')
opener = urllib.request.build_opener(proxy_handler, proxy_auth_handler)
with opener.open('http://www.example.com/login.html') as f:
    pass
```

* **xml**
```py
# SAX流模式边读边解析XML
from xml.parsers.expat import ParserCreate

class DefaultSaxHandler(object):
    def start_element(self, name, attrs):
        print('sax:start_element: %s, attrs: %s' % (name, str(attrs)))

    def end_element(self, name):
        print('sax:end_element: %s' % name)

    def char_data(self, text):
        print('sax:char_data: %s' % text)

xml = r'''<?xml version="1.0"?>
<ol>
    <li><a href="/python">Python</a></li>
    <li><a href="/ruby">Ruby</a></li>
</ol>
'''

handler = DefaultSaxHandler()
parser = ParserCreate()
parser.StartElementHandler = handler.start_element
parser.EndElementHandler = handler.end_element
parser.CharacterDataHandler = handler.char_data
parser.Parse(xml)
```

* **HTMLParser**
```py
from html.parser import HTMLParser
# from html.entities import name2codepoint

class MyHTMLParser(HTMLParser):

    def handle_starttag(self, tag, attrs):
        print('<%s>' % tag)

    def handle_endtag(self, tag):
        print('</%s>' % tag)

    def handle_startendtag(self, tag, attrs):
        print('<%s/>' % tag)

    def handle_data(self, data):
        print(data)

    def handle_comment(self, data):
        print('<!--', data, '-->')

    def handle_entityref(self, name):
        print('&%s;' % name)

    def handle_charref(self, name):
        print('&#%s;' % name)

parser = MyHTMLParser()
parser.feed('''<html>
<head></head>
<body>
<!-- test html parser -->
    <p>Some <a href="#">html</a> HTML&nbsp;tutorial...<br>END</p>
</body></html>''')
```

## 常用第三方模块

* **PIL** 图像处理
    * 缩放、模糊处理
    ```py
    # PIL：Python Imaging Library 仅支持到2.7
    # 3的兼容版本 Pillow
    # pip install pillow

    from PIL import Image
    from PIL import ImageFilter

    origin = 'test.jpg'
    save = 'thumbnail.jpg'
    def shrink ():
        im = Image.open(origin)
        w, h = im.size
        print('Original image size: %sx%s' % (w, h))
        # 缩放到50% //表示向下取整
        w = w // 2
        h = h // 2
        im.thumbnail((w, h))
        print('Resize image to: %sx%s' % (w, h))
        im.save(save, 'jpeg')

    def blur ():
        im = Image.open(origin)
        # 应用模糊滤镜:
        im2 = im.filter(ImageFilter.BLUR)
        im2.save(save, 'jpeg')
    ```

    * 图形验证码
    ```py
    from PIL import Image, ImageDraw, ImageFont, ImageFilter
    import random

    def verifyCode ():
        # 随机字母:
        def rndChar():
            return chr(random.randint(65, 90))

        # 随机颜色1:
        def rndColor():
            return (random.randint(64, 255), random.randint(64, 255), random.randint(64, 255))

        # 随机颜色2:
        def rndColor2():
            return (random.randint(32, 127), random.randint(32, 127), random.randint(32, 127))

        # 240 x 60 4个字母 每个字母60宽度
        width = 60 * 4
        height = 60
        image = Image.new('RGB', (width, height), (255, 255, 255))
        # 创建Font对象:
        font = ImageFont.truetype('arial.ttf', 36)
        # 创建Draw对象:
        draw = ImageDraw.Draw(image)
        # 填充每个像素:
        for x in range(width):
            for y in range(height):
                draw.point((x, y), fill = rndColor())
        # 输出文字:
        for t in range(4):
            draw.text((60 * t + 10, 10), rndChar(), font = font, fill = rndColor2())
        # 模糊:
        image = image.filter(ImageFilter.BLUR)
        image.save('code.jpg', 'jpeg')
    ```

* requests
    * GET
    ```py
    # pip install requests
    import requests

    # 首页请求
    url = 'https://www.douban.com'
    r = requests.get(url,
            params = { 'search': 'python', 'page': 100 },
            timeout = 5, cookies = { 'cookie': 'value' }
        )
    print(r.text, r.status_code)

    # 传入header
    # 豆瓣手机版...
    headers = { 'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit' }
    r = requests.get(url, headers = headers)
    print(r.text)

    # json
    r = requests.get('https://yesno.wtf/api')
    print(r.json())
    ```

    * POST
    ```py
    import requests

    # 登录请求
    url = 'https://accounts.douban.com/login'
    data = {'form_email': 'abc@example.com', 'form_password': '123456'}
    r = requests.post(url, data = data)
    print(r.status_code)

    # 默认使用application/x-www-form-urlencoded对POST数据编码
    # 传递json数据
    params = { 'key': 'value' }
    r = requests.post(url, json = params)

    # 上传文件
    with open('report.xls', 'rb') as f:
        upload_files = { 'file': f }
        r = requests.post(url, files = upload_files)
    ```

* chardet 检测bytes类型的编码
```py
# pip install chardet
import chardet

data = b'Hello world'
r = chardet.detect(data)
# {'encoding': 'ascii', 'confidence': 1.0, 'language': ''} confidence表示检测概率
print(r)

data = '离离原上草，一岁一枯荣'.encode('gbk')
r = chardet.detect(data)
# {'encoding': 'GB2312', 'confidence': 0.7407407407407407, 'language': 'Chinese'}
print(r)

data = '最新の主要ニュース'.encode('euc-jp')
r = chardet.detect(data)
# {'encoding': 'EUC-JP', 'confidence': 0.99, 'language': 'Japanese'}
print(r)
```

* **psutil** process and system utilities
```py
# pip install psutil 
import psutil

logical = psutil.cpu_count() # CPU逻辑数量
core = psutil.cpu_count(logical = False) # CPU物理核心
print(logical, core)

# 统计CPU的用户／系统／空闲时间
# scputimes(user=92683.98437499999, system=67790.734375, idle=2365264.265625, interrupt=2700.53125, dpc=1900.765625)
scputimes = psutil.cpu_times()
print(scputimes)

# 类似top cpu每秒刷新率
for x in range(10):
    flush = psutil.cpu_percent(interval = 1, percpu = True)
    print(flush)

# 物理内存信息
virtual_memory = psutil.virtual_memory()
# 交换内存信息
swap_memory = psutil.swap_memory()
print(virtual_memory, swap_memory, sep = '\n')

# 磁盘分区信息
partitions = psutil.disk_partitions()
# 磁盘使用情况 win下/即C
usage = psutil.disk_usage('/')
# 磁盘IO
io_counters = psutil.disk_io_counters()
print(partitions, usage, io_counters, sep = '\n')

# 网络IO/包的个数
io_counters = psutil.net_io_counters()
# 网络接口信息
net_addr = psutil.net_if_addrs()
# 网络接口状态
net_status = psutil.net_if_stats()
# 网络连接信息
connections = psutil.net_connections()
print(partitions, net_addr, net_status, connections, sep = '\n\n')

# 所有的pid
pids = psutil.pids()
# 指定pid进程
p = psutil.Process(3776)
p.name()
# 进程路径
p.exe()
# 工作目录
p.cwd()
# 进程启动的命令行
p.cmdline()
# 父进程id
p.ppid()
p.parent()
# 子进程列表
p.children()
p.username()
p.status()
p.create_time()
p.cpu_times()
p.memory_info()
p.open_files()
p.connections()
p.num_threads()
p.threads()
# 进程环境变量
p.environ()
# 进程终端...
p.terminal()
# 结束进程
p.terminate()

# 模拟ps命令
psutil.test()
```

## GUI
* 图形界面 Tk wxWidgets Qt GTK (均为图形库)
```PY
# 内置Tkinter支持Tk
from tkinter import *
import tkinter.messagebox as messagebox

# Frame为所有Widget的父容器
class Application (Frame):
    def __init__ (self, master = None):
        Frame.__init__(self, master)
        # pack把Widget加入到父容器中，并实现布局 grid能实现复杂布局...
        self.pack()
        # self.alertWidget()
        self.prompWidget()

    def alertWidget (self):
        # 每个Label、输入框、Button都是一个widget
        self.helloLabel = Label(self, text = 'Hello, world!')
        self.helloLabel.pack()
        self.quitButton = Button(self, text = 'Quit', command = self.quit)
        self.quitButton.pack()

    def prompWidget (self):
        self.nameInput = Entry(self)
        self.nameInput.pack()
        self.alertButton = Button(self, text = 'Hello', command = self.hello)
        self.alertButton.pack()

    def hello (self):
        name = self.nameInput.get() or 'world'
        messagebox.showinfo('Message', 'Hello, %s' % name)

app = Application()
app.master.title('Hello World')
# 主消息循环 等待用户主动关闭
app.mainloop()
```

* 海龟绘图 turtle graphics
```py
from turtle import *

def drawRectangle ():
    # 设置笔刷宽度:
    width(4)

    # 前进:
    forward(200)
    # 右转90度:
    right(90)

    # 笔刷颜色:
    pencolor('red')
    forward(100)
    right(90)

    pencolor('green')
    forward(200)
    right(90)

    pencolor('blue')
    forward(100)
    right(90)

drawRectangle()
# 调用done()使窗口等待被关闭，否则将立刻关闭窗口:
done()
```
