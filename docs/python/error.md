## Could not find an available JavaScript runtime
* **环境：** **CentOS 7.6**、**Python3.7**
* **堆栈：**
    ```
    File "/usr/local/python3/lib/python3.7/site-packages/execjs/_runtimes.py", line 49, in _find_available_runtime 
    raise exceptions.RuntimeUnavailableError("Could not find an available JavaScript runtime.") 
    execjs._exceptions.RuntimeUnavailableError: Could not find an available JavaScript runtime.
    ```
* **描述：**  
    Linux系统下Python使用execjs模块时出现
* **方案：**  
    缺少执行JS的环境，安装nodejs即可 `yum/apt install nodejs`（或其他环境[参考](https://www.jianshu.com/p/e01a3d504700)）

## UnicodeDecodeError: 'gbk' codec can't decode byte 0x80
* **环境：** **Windows10** **Python3.6**
* **堆栈：**
    ```
    Exception in thread Thread-1:
    Traceback (most recent call last):
      File "D:\Works\python3\lib\threading.py", line 917, in _bootstrap_inner
        self.run()
      File "D:\Works\python3\lib\threading.py", line 865, in run
        self._target(*self._args, **self._kwargs)
      File "D:\Works\python3\lib\subprocess.py", line 1238, in _readerthread
        buffer.append(fh.read())
    UnicodeDecodeError: 'gbk' codec can't decode byte 0x80 in position 41: illegal multibyte sequence
    ```

* **描述：**  
    编码问题...

* **方案：**  
1. 修改 **@install/Lib/subprocess.py** 592行左右 `encoding='utf-8'` @install为安装目录

* [参考...](https://blog.csdn.net/suwenlai/article/details/93047182)

## bytearray index out of range
* **环境：** **CentOS 7.6**、**Python3.7**
* **堆栈：**
    ```
    ERROR:root:bytearray index out of range
    Traceback (most recent call last):
      File "index.py", line 150, in handleImages
        mysql.commit()
      File "db.py", line 41, in commit
        self._db.commit()
      File "/usr/local/python3/lib/python3.7/site-packages/mysql/connector/connection.py", line 852, in commit
        self._execute_query("COMMIT")
      File "/usr/local/python3/lib/python3.7/site-packages/mysql/connector/connection.py", line 871, in _execute_query 4813     self.cmd_query(query)
      File "/usr/local/python3/lib/python3.7/site-packages/mysql/connector/connection.py", line 490, in cmd_query
        result = self._handle_result(self._send_cmd(ServerCmd.QUERY, query))
      File "/usr/local/python3/lib/python3.7/site-packages/mysql/connector/connection.py", line 384, in _handle_result
        elif packet[4] == 0:
    IndexError: bytearray index out of range
    ```
* **描述：**  
    MySQL连接为非线程安全，多线程同时操作共享数据冲突导致，所以多线程程序中MySQL连接不应由多个线程共享

* **方案：**  
    多线程程序中使用多个连接或连接池

* [参考](https://slxiao.github.io/2019/06/10/mysql/#mysql%E8%BF%9E%E6%8E%A5%E4%B8%8D%E6%98%AF%E7%BA%BF%E7%A8%8B%E5%AE%89%E5%85%A8%E7%9A%84)






