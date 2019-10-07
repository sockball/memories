## AOF持久化配置参考
```ini
bind 127.0.0.1
port 63791
timeout 0
requirepass 123456
dir /usr/local/redis/var

# TCP连接轴已完成队列长度
tcp-backlog 511

# 服务端周期性时间(s)验证客户端是否处在健康状态, 避免服务器一直阻塞
tcp-keepalive 300

# 是否以守护进程形式启动
daemonize yes

pidfile /var/run/redis/redis.pid

# 日志级别: debug, verbose, notice, warning
loglevel notice

# 日志文件路径及名称
logfile /usr/local/redis/var/redis.log

############# 开启持久化 #############

# 开启AOF机制
appendonly yes

# AOF文件
appendfilename 'appendonly.aof'

# AOF持久化同步频率 其他选项 always no, no表示由操作系统来决定应该何时进行同步fsync
appendfsync everysec

# 在日志进行BGREWRITEAOF时，如果设置为yes表示新写操作不进行同步fsync，只是暂存在缓冲区里，避免造成磁盘IO操作冲突，等重写完成后在写入。redis中默认为no
no-appendfsync-on-rewrite no

# 当前AOF文件大小是上次日志重写时的AOF文件大小两倍时，发生BGREWRITEAOF操作
auto-aof-rewrite-percentage 100

# 当前AOF文件执行BGREWRITEAOF命令的最小值 避免刚开始启动Reids时由于文件尺寸较小导致频繁的BGREWRITEAOF
auto-aof-rewrite-min-size 64mb

# Redis恢复时, 忽略最后一条可能存在问题的指令
aof-load-truncated yes

# AOF + RDB 混合持久化
aof-use-rdb-preamble no
```

* [参考](https://www.cnblogs.com/joshua317/p/5635297.html)

## AOF 与 RDB
* AOF 采用日志的形式记录每个写操作并追加到文件中
* **appendfsync** 选项
    * always：同步持久化，每次发生数据变化会立刻写入到磁盘中
    * everysec：每秒异步记录一次（默认值）
    * no：不同步，由操作系统来决定应该何时进行同步fsync（将缓冲区中的数据写到磁盘）
* RDB 在指定的时间间隔内，执行指定次数的写操作，则会将内存中的数据写入到磁盘中，在指定目录下生成dump.rdb
* 触发RDB快照的可能条件
    * 指定时间内执行指定次数写操作
    * 手动执行save或bgsave命令

* [参考](https://www.cnblogs.com/itdragon/p/7906481.html)

## 数据类型