## sudo免密

同样适用于mac
```bash
sudo visudo
# 添加以下内容
# [username] ALL=(ALL) NOPASSWD:ALL
```
* [参考](https://www.cnblogs.com/zhangwuji/p/9947768.html)

## vim常用配置

编辑当前用户文件 `~/.vimrc` 或全局文件 `/etc/vimrc` 即可  
`"`后为注释
```bash
set number             "显示行号"
syntax on              "语法高亮"
set mouse=a            "开启鼠标支持"
map 9 $                "设置0跳行首, 9跳行尾"
set softtabstop=4      "设置tab为4个空格缩进"
set autoindent         "回车/换行时 参考上一行自动缩进"
set incsearch          "边输入边搜索"
set hlsearch           "开启搜索结果高亮显示"
```
* [参考](http://www.ruanyifeng.com/blog/2018/09/vimrc.html)

## vim命令模式快捷键
```sh
dd           # 删除(剪切)整行
5dd          # 删除(剪切)光标处开始5行
yy           # 复制光标所在整行
5yy          # 复制光标处开始5行
p            # 将yy或dd的内容粘贴至光标后
/            # 开启查询
n            # /查询后 下一项匹配的内容
N            # /查询后 上一项匹配的内容
shift + 6    # 跳到行首
shift + 4    # 跳到行尾
u            # 撤销
ctrl + r     # 恢复撤销
:noh         # 消除搜索内容的高亮
```

## 命令加入开机自启动

* 编辑 `/etc/rc.local` 文件，直接加入命令
* 编写成shell文件放入 `/etc/init.d` 下
* ~~配置chkconfig~~

## rsync远程同步(复制)

适用于类unix系统  
<span class='warning'>注意路径尾部带 "/" 则复制目录下的内容, 不带则复制整个目录</span>
```sh
# 适用于远端ssh为默认端口22
rsync -avP [本地路径] [user]@[ip]:[远端路径]

# 适用于远端ssh为指定端口
rsync -avP -e 'ssh -p [port]' [user]@[ip]:[远端路径] [本地路径]
```

## 文件查看相关命令
```sh
cat file

# 输出file前20行内容
head -n 20 file

# 输出最后10行内容
tail -n 10 file

# 监听不断更新的file的变化
tail -n file
```

## other

* 查找含有BOM头的文件 `grep -rl $'\xEF\xBB\xBF' .`
* 查看磁盘占用 `df -h`
* 查看当前目录下每个文件和目录的磁盘占用 `du -sh *`
* 查看内存使用情况 `free -h`
* ps常用选项 `ps -aux`
* netstat常用选项 `netstat -anp`
* 查看端口占用 `lsof -i:[port]`
* 查看系统内核信息 `uname -a`
* 查看系统版本信息 `cat /proc/version`
* 查看系统发行版信息 `cat /etc/issue` 或 `cat /etc/redhat-release`
* 查看CPU信息 `cat /proc/cpuinfo`
* 查看用户登录日志 `last`
* 清除命令历史 `history -c && rm -rf ~/.bash_history`