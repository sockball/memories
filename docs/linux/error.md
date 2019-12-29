## Too many levels of symbolic links

* **环境**：Ubuntu 18.04
* **描述**：建立软连接时 真实目录使用相对路径 `ls -s ./nginx /data/nginx` ，之后对软连接目录进行操作时发生错误
* **方案**：  
使用相对路径再查看软连接目录时 会发现真实目录依旧是相对路径 `/data/nginx -> ./nginx`  
所以真实目录使用绝对路径即可
* [参考](https://www.cnblogs.com/gbyukg/archive/2011/11/30/2269582.html)
