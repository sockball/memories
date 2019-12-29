## sudo免密

同样适用于mac
```bash
# 方式一
# 默认为nano编辑器 ALT+X 退出
# 或者 sudo vim /etc/sudoers
sudo visudo

# 方式二
# 确保 /etc/sudoers 包含该内容 #includedir /etc/sudoers.d
# 在目录 /etc/sudoers.d 下添加 不以~结尾或不包含.的 文件
touch /etc/sudoers.d/extra

# 添加内容都为
[username] ALL=(ALL:ALL) NOPASSWD:ALL
# 第一个 ALL 表示 FROM ALL hosts (允许登录的主机)
# 第二个 ALL 表示 RUN as All user (可提权到的用户) 可省
# 第三个 ALL 表示 RUN as All groups (可提权到的用户组) 可省 和user都省略时表示(root:root)
# 第四个 ALL 表示 RUN as All commands (不需要密码的命令)

# 文件中 % 开头的表示授权对应的用户组
```

* [参考](https://www.cnblogs.com/jing99/p/9323080.html)

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
5↓           # 光标下移5行
:120 + enter # 跳转至120行
120gg        # 跳转至120行 
120G         # 跳转至120行
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
# 查看file所有内容
cat file

# 输出file前20行内容
head -n 20 file

# 输出最后10行内容
tail -n 10 file

# 监听不断更新的file的变化
tail -f file

# 查看文件行数
wc -l sql.log | awk '{print $1}
```

## dd命令
* 创建特定大小文件
    ```sh
    # 创建一个1G的test.log文件
    dd if=/dev/urandom of=test.log bs=4M count=256
    ```
* [参考](https://www.cnblogs.com/linuxde/p/8719253.html)

## 手动释放内存
```sh
# 将存于buffer中的数据写入至硬盘
sync
# drop_caches值有3种：
# 0 - 默认值，不释放
# 1 - 释放页缓存
# 2 - 释放inodes和dentries(目录的数据结构)
# 3 - 释放所有缓存 
echo 3 > /proc/sys/vm/drop_caches 
```
* 参考：[Linux 下清理系统缓存并释放内存](https://blog.csdn.net/Gavinmiaoc/article/details/80527717)、[什么是PAGECACHE/DENTRIES/INODES?](http://ixyzero.com/blog/archives/3233.html)

## crontab
```sh
# 占位分别为：分 时 日 月 星期
* * * * *

# 每天16:00执行一次
0 16 * * *

# 每1小时执行一次，而 * */1 * * * 实际上是每1分钟执行一次
0 */1 * * *
```

## 类Unix系统终端快捷键
```sh
# 删除光标左端内容
CTRL + U

# 删除光标右端内容
CTRL + K

# 移动光标至最左端
CTRL + A

# 移动光标至最右端
CTRL + E
```

## Ubuntu阿里apt源
编辑 `/etc/apt/sources.list` 文件
```
deb-src http://archive.ubuntu.com/ubuntu xenial main restricted
deb http://mirrors.aliyun.com/ubuntu/ xenial main restricted
deb-src http://mirrors.aliyun.com/ubuntu/ xenial main restricted multiverse universe
deb http://mirrors.aliyun.com/ubuntu/ xenial-updates main restricted
deb-src http://mirrors.aliyun.com/ubuntu/ xenial-updates main restricted multiverse universe
deb http://mirrors.aliyun.com/ubuntu/ xenial universe
deb http://mirrors.aliyun.com/ubuntu/ xenial-updates universe
deb http://mirrors.aliyun.com/ubuntu/ xenial multiverse
deb http://mirrors.aliyun.com/ubuntu/ xenial-updates multiverse
deb http://mirrors.aliyun.com/ubuntu/ xenial-backports main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ xenial-backports main restricted universe multiverse
deb http://archive.canonical.com/ubuntu xenial partner
deb-src http://archive.canonical.com/ubuntu xenial partner
deb http://mirrors.aliyun.com/ubuntu/ xenial-security main restricted
deb-src http://mirrors.aliyun.com/ubuntu/ xenial-security main restricted multiverse universe
deb http://mirrors.aliyun.com/ubuntu/ xenial-security universe
deb http://mirrors.aliyun.com/ubuntu/ xenial-security multiverse
```

## grep
```sh
# -C 包含上下各5行
grep -C 5 foo file 

# -B 包含前5行
grep -B 5 foo file

# -A 包含后5行
grep -A 5 foo file

# -e -E 正则表达式对应行
# -e使用基本正则表达式BREs
# -E 使用扩展正则表达式EREs
# @see https://www.cnblogs.com/chengmo/archive/2010/10/10/1847287.html
grep -e '\(GET\|POST\)' note.access.log
grep -E '(GET|POST)' note.access.log
egrep '(GET|POST)' note.access.log

# -o 正则表达式对应内容（非整行）
grep -o '【.*】' access.log | sort | uniq -c
grep -o '\([0-9]\+\.\)\{3\}[0-9]\+' note.access.log | sort | uniq -c
grep -Eo '([0-9]+\.){3}[0-9]+' note.access.log | sort | uniq -c
egrep -o '([0-9]+\.){3}[0-9]+' note.access.log | sort | uniq -c

# -v 不包含http的行
grep -v 'http' access.log
```

## 日志分析查看
* note.access.log部分内容
```
2019-11-16T06:00:02+08:00 【61.157.96.12】
GET /jiankong.htm HTTP/1.1 404
- Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.1; WOW64; Trident/5.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; .NET4.0E; InfoPath.3; KB974488)

2019-11-16T10:44:37+08:00 【66.249.79.140】
GET /robots.txt HTTP/1.1 404
- Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)

2019-11-16T10:44:37+08:00 【66.249.79.138】
GET /docker/note.html HTTP/1.1 200
- Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.96 Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)

2019-11-16T13:25:19+08:00 【125.65.40.233】
GET / HTTP/1.1 200
- Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.1; WOW64; Trident/5.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; .NET4.0E; InfoPath.3; KB974488)

2019-11-16T16:23:03+08:00 【125.65.40.233】
GET /js/guest.js HTTP/1.1 404
- Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.1; WOW64; Trident/5.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; .NET4.0E; InfoPath.3; KB974488)
```

* 筛选出独立IP
```sh
awk '{ \
if(index($2, "【")) \
{ \
    # $2 为 【xxx.xxx.xxx.xxx】
    # 或 sub("【", "", $2)
    str = substr($2, 2); \
    sub("】", "", str); \
    print str \
} \
}' \
note.access.log | sort | uniq
```

* [参考](https://www.cnblogs.com/kongzhongqijing/articles/5239118.html)

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
* ssh登录细节 -v 选项 `ssh -v root@127.0.0.1 -p 23456`
* centos8 简体中文语言包 `yum install langpacks-zh_CN.noarch` （`yum search langpacks`）
