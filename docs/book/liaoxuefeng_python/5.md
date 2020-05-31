## 网络编程

* TCP客户端示例
```py
import socket

domain = 'doc.ucharts.cn'
port = 80

# AF_INET指定使用IPV4，IPV6为AF_INET6
# SOCK_STREAM 指定使用面向流的TCP协议
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

'''
# HTTPS需使用ssl
import ssl
port = 443
s = ssl.wrap_socket(socket.socket(socket.AF_INET, socket.SOCK_STREAM))
'''

s.connect((domain, port))
s.send(b'GET / HTTP/1.1\r\nHost: %s \r\nConnection: close\r\n\r\n' % domain.encode('utf-8'))

buffer = []
while True:
    # 每次最多接收1k字节:
    d = s.recv(1024)
    if d:
        buffer.append(d)
    else:
        break
data = b''.join(buffer)
header, html = data.split(b'\r\n\r\n', 1)
print(header.decode('utf-8'))

# 把接收的数据写入文件:
with open('save.html', 'wb') as f:
    f.write(html)
s.close()
```

* TCP服务端示例
```py
############# server.py ##############

import socket
import threading, time

def server ():
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.bind(('127.0.0.1', 9999))
    # 指定等待的最大连接数...?
    s.listen(5)
    print('Waiting for connection...')
    while True:
        # 接受一个新连接:
        sock, addr = s.accept()
        # 创建新线程来处理TCP连接:
        t = threading.Thread(target = tcplink, args = (sock, addr))
        t.start()

def tcplink(sock, addr):
    print('Accept new connection from %s:%s...' % addr)
    sock.send(b'Welcome!')
    while True:
        data = sock.recv(1024)
        time.sleep(1)
        if not data or data.decode('utf-8') == 'exit':
            break
        sock.send(('Hello, %s!' % data)
    sock.close()
    print('Connection from %s:%s closed.' % addr)

server()
############# client.py ##############

import socket

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.connect(('127.0.0.1', 9999))
# 接收欢迎消息:
print(s.recv(1024).decode('utf-8'))

for data in [b'Michael', b'Tracy', b'Sarah']:
    # 发送数据并接受返回数据
    s.send(data)
    print(s.recv(1024).decode('utf-8'))
s.send(b'exit')
s.close()
```

* UDP示例 不需要建立连接 不需要listen
```py
############# server.py ##############

import socket
# SOCK_DGRAM指定SOCKET类型为UDP
s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
# 绑定端口 UDP与TCP端口相同时不会冲突...
s.bind(('127.0.0.1', 9999))
print('Bind UDP on 9999...')

while True:
    # 接收数据:
    data, addr = s.recvfrom(1024)
    print('Received from %s:%s.' % addr)
    s.sendto(b'Hello, %s!' % data, addr)

############# client.py ##############

import socket

s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
for data in [b'Michael', b'Tracy', b'Sarah']:
    # 发送数据:
    s.sendto(data, ('127.0.0.1', 9999))
    # 接收数据:
    print(s.recv(1024).decode('utf-8'))
s.close()
```

## 电子邮件

* 文本、html邮件
```py
'''
MUA：Mail User Agent     邮件用户代理
MTA: Mail Transfer Agent 邮件传输代理
MDA：Mail Delivery Agent 邮件投递代理

发邮件时 MUA与MTA使用SMTP协议：Simple Mail Transfer Protocol
收邮件时 MUA和MDA使用的协议有两种：POP：Post Office Protocol，目前版本是3，俗称POP3；IMAP：Internet Message Access Protocol

发件人 -> MUA -> MTA -> MTA -> 若干个MTA -> MDA <- MUA <- 收件人
'''

import smtplib
from email.mime.text import MIMEText
from email.header import Header
from email.utils import parseaddr, formataddr

# s的格式：Python爱好者 <442073273@qq.com>
def _format_addr (s):
    name, addr = parseaddr(s)
    # 可能包含中文需要编码
    name = Header(name, 'utf-8').encode()

    return formataddr((name, addr))

from_addr   = 'from@gmail.com'
password    = 'password'
to_addr     = 'to@yahoo.com'
smtp_server = 'smtp.gmail.com'

# To不一定生效 可能会被邮件服务商替换为收件人名
# 文本 plain; html html;
# html = '<html><body><h1>Hello</h1>' + '<p>send by <a href="http://www.python.org">Python</a>...</p>' + '</body></html>'
# MIMEText(html, 'html', 'utf-8')
msg            = MIMEText('hello, send by Python...', 'plain', 'utf-8')
msg['From']    = _format_addr('Python爱好者 <%s>' % from_addr)
msg['To']      = _format_addr('管理员 <%s>' % to_addr)
msg['Subject'] = Header('来自SMTP的问候……', 'utf-8').encode()

try:
    # 默认端口 明文传输
    server = smtplib.SMTP(smtp_server, 25)

    # smtps
    # server = smtplib.SMTP(smtp_server, 465)

    # tls
    # server = smtplib.SMTP(smtp_server, 587)
    # server.starttls()

    # 可以打印出与SMTP服务器的交互信息
    server.set_debuglevel(1)
    server.login(from_addr, password)
    server.sendmail(from_addr, [to_addr], msg.as_string())
    server.quit()
except Exception as e:
    print(e)
```

* 携带附件
```py
import smtplib
from email import encoders
from email.header import Header
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email.utils import parseaddr, formataddr

def _format_addr (s):
    name, addr = parseaddr(s)
    return formataddr((Header(name, 'utf-8').encode(), addr))

def getAttachment ():
    # 添加附件就是加上一个MIMEBase，从本地读取一个图片:
    image = './test.png'
    with open(image, 'rb') as f:
        # 设置附件的MIME和文件名
        mime = MIMEBase('image', 'png', filename = 'test.png')
        # 加上必要的头信息:
        mime.add_header('Content-Disposition', 'attachment', filename = 'test.png')
        mime.add_header('Content-ID', '<0>')
        mime.add_header('X-Attachment-Id', '0')
        mime.set_payload(f.read())
        # 用Base64编码:
        encoders.encode_base64(mime)

        return mime

from_addr   = 'from@gmail.com'
password    = 'password'
to_addr     = 'to@yahoo.com'
smtp_server = 'smtp.gmail.com'

'''
# 指定subtype为alternative 同时支持plain和html 当收信人无法查看html时会自动降级查看纯文本
msg = MIMEMultipart('alternative')
msg.attach(MIMEText('hello', 'plain', 'utf-8'))
msg.attach(MIMEText('<html><body><h1>Hello</h1></body></html>', 'html', 'utf-8'))
'''

# 邮件对象:
msg = MIMEMultipart()
msg['From']    = _format_addr('Python爱好者 <%s>' % from_addr)
msg['To']      = _format_addr('管理员 <%s>' % to_addr)
msg['Subject'] = Header('来自SMTP的问候……', 'utf-8').encode()

'''
# 将附件嵌入html 使用cid:0123456789...
html = '<html><body><h1>Hello</h1><p><img src="cid:0"></p></body></html>'
msg.attach(MIMEText(html, 'html', 'utf-8'))
'''
# 邮件正文是MIMEText:
msg.attach(MIMEText('send with file...', 'plain', 'utf-8'))
msg.attach(getAttachment())

try:
    server = smtplib.SMTP(smtp_server, 587)
    server.starttls()
    server.set_debuglevel(1)
    server.login(from_addr, password)
    server.sendmail(from_addr, [to_addr], msg.as_string())
    server.quit()
except Exception as e:
    print(e)
```

## 数据库

* SQLite 嵌入式数据库 C编写 可集成到各种应用程序
```py
import sqlite3

db = sqlite3.connect('test.db')
cursor = db.cursor()

cursor.execute('CREATE TABLE user (id INT(11) PRIMARY KEY, name VARCHAR(20))')
cursor.execute('INSERT INTO user (id, name) VALUES (1, "test")')
print(cursor.rowcount)

cursor.execute('SELECT * FROM user WHERE id=?', (1,))
print(cursor.fetchall())

cursor.close()
# 必须显示提交
# db.commit()
db.close()
```

* mysql
```py
# 安装mysql驱动
# pip install mysql-connector

import mysql.connector

db = mysql.connector.connect(user = 'root', password = '123456', database = 'test')
cursor = db.cursor()
cursor.execute('CREATE TABLE role (id INT(11) PRIMARY KEY AUTO_INCREMENT, name VARCHAR(20))')
cursor.execute('INSERT INTO role (name) VALUE ("test")')
cursor.execute('SELECT * FROM role')
print(cursor.fetchall())
cursor.close()
db.close()
```

* ORM框架 SQLAlchemy
```py
# pip install sqlalchemy
from sqlalchemy import Column, Integer, String, create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Role(Base):
    __tablename__ = 'role'

    id   = Column(Integer(), primary_key = True)
    name = Column(String(20))

engine = create_engine('mysql+mysqlconnector://root:123456@localhost:3306/test')
DBSession = sessionmaker(bind = engine)

session = DBSession()

def insert ():
    role = Role(id = 100, name = 'Mary')
    session.add(role)
    # 必须显式提交
    session.commit()

insert()

# 查询出来的为Role对象
role = session.query(User).filter(Role.id = 100).one()

session.close()
```

## 异步IO

* 协程  
相比多线程来说 1. 单线程, 没有线程切换的开销；2. 不需要锁机制，不存在同时写变量冲突
```py
# 生产者 - 消费者 模型

def consumer():
    r = ''
    while True:
        n = yield r
        if not n:
            return
        print('[CONSUMER] Consuming %s...' % n)
        r = '200 OK'

def produce(c):
    # 必须先启动生成器才可传值 或使用next(c)
    # 否则 TypeError: can't send non-None value to a just-started generator
    c.send(None)
    n = 0
    while n < 5:
        n = n + 1
        print('[PRODUCER] Producing %s...' % n)
        r = c.send(n)
        print('[PRODUCER] Consumer return: %s' % r)
    c.close()

c = consumer()
produce(c)
```

* asyncio 消息循环的编程模型
    * 简单例子
    ```py
    import threading
    import asyncio

    # 标记一个generator为coroutine类型
    @asyncio.coroutine
    def hello():
        print('Hello world! (%s)' % threading.currentThread())
        # yield from 调用另一个生成器
        # 异步调用asyncio.sleep(1) 同时也是一个coroutine
        # sleep的同时主线程不等待 执行其他可执行的coroutine
        yield from asyncio.sleep(3)
        print('Hello again! (%s)' % threading.currentThread())

    loop = asyncio.get_event_loop()
    tasks = [hello(), hello()]
    loop.run_until_complete(asyncio.wait(tasks))
    loop.close()
    ```

    * async await 表示上例 3.5以上支持
    ```py
    import threading
    import asyncio

    async def hello():
        print('hello world! (%s)' % threading.current_thread())
        await asyncio.sleep(1)
        print('hello again! (%s)' % threading.current_thread())

    loop = asyncio.get_event_loop()
    tasks = [hello(), hello()]
    loop.run_until_complete(asyncio.wait(tasks))
    loop.close()
    ```

    * 异步网络连接获取sina、sohu和163的网站首页
    ```py
    import asyncio

    @asyncio.coroutine
    def wget(host):
        print('wget %s...' % host)
        connect = asyncio.open_connection(host, 80)
        reader, writer = yield from connect
        header = 'GET / HTTP/1.0\r\nHost: %s\r\n\r\n' % host
        writer.write(header.encode('utf-8'))
        yield from writer.drain()
        while True:
            line = yield from reader.readline()
            if line == b'\r\n':
                break
            print('%s header > %s' % (host, line.decode('utf-8').rstrip()))
        # Ignore the body, close the socket
        writer.close()

    loop = asyncio.get_event_loop()
    tasks = [wget(host) for host in ['www.sina.com.cn', 'www.sohu.com', 'www.163.com']]
    loop.run_until_complete(asyncio.wait(tasks))
    loop.close()
    ```






