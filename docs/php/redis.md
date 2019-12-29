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
* **string**  
key->value 可用于快速计数

* **hash**  
一个键值对集合，Redis hash 是一个 string 类型的 field 和 value 的映射表  
hash 特别适合用于存储对象
```sh
HSET user:1 id 1
HSET user:1 name Mary
HSET user:1 age 17

HGET user:1 name
HGETALL user:1
```

* **list**  
一个字符串双向链表，可以作为栈也可以作为队列，可用于消息队列
```sh
LPUSH fans 1 2 3
# 栈 先进后出
LPOP fans
# 队列 先进先出
RPOP fans

RPUSH fans 1 2 3
# 栈 先进后出
RPOP fans
# 队列 先进先出
LPOP fans

# 返回索引0 - 10的成员
LRANGE fans 0 10
```

* **set**  
string类型的无序集合，无重复元素，可求交集、差集、合集，如共同关注列表等...
```sh
# 返回成功添加的数量 重复元素不计算
SADD members 1 2 3 4 5
# 随机取出元素
SPOP members
# 查看所有
SMEMBERS members
# 差集(只保留group_1的成员
SDIFF group_1 group_2
# 交集
SINTER group_1 group_2
# 合集
SUNION group_1 group_2
```

* **zset**  
类似set的有序集合，为每个成员提供score使有序，score可以重复，成员不可重复。适合排行榜
```sh
# 录入学生成绩
ZADD exam 100 Jonh 100 Jane
ZADD exam 90 Sala 95 Luna

# 获取索引0 - 10的成员
ZRANGE exam 0 10

# 获取分数90 - 100的成员
ZRANGEBYSCORE exam 90 100

# 移除指定成员
ZREM exam
```
* [Redis五种数据类型及应用场景](https://www.cnblogs.com/jasonZh/p/9513948.html)、[Redis 命令参考](http://redisdoc.com/)

## Other

* 通配符删除KEY `redis-cli --scan --pattern users:* | xargs redis-cli del` [参考](https://rdbtools.com/blog/redis-delete-keys-matching-pattern-using-scan/)