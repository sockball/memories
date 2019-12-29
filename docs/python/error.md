## Could not find an available JavaScript runtime
* **环境：** CentOS **7.6**、Python**3.7**
* **全名：**
    ```
    File "/usr/local/python3/lib/python3.7/site-packages/execjs/_runtimes.py", line 49, in _find_available_runtime 
    raise exceptions.RuntimeUnavailableError("Could not find an available JavaScript runtime.") 
    execjs._exceptions.RuntimeUnavailableError: Could not find an available JavaScript runtime.
    ```
* **描述：**  
    Linux系统下Python使用execjs模块时出现
* **方案：**  
    缺少执行JS的环境，安装nodejs即可 `yum/apt install nodejs`（或其他环境[参考](https://www.jianshu.com/p/e01a3d504700)）
