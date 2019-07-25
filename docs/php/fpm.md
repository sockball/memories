### fpm配置
```ini
;;;;;;;;;;;;;;;;;;
; Global Options ;
;;;;;;;;;;;;;;;;;;

[global]

; 默认目录前缀为 /usr/local/php/var
pid = run/php-fpm.pid

; 设置成syslog则log写入syslog
error_log = /data/wwwlogs/php-fpm.log

; 选项有 alert、error、warning、notice、debug
log_level = warning

; 指定记录日志的程序类型 ?
;syslog.facility = daemon

; 多个fpm进程的日志标识
;syslog.ident = php-fpm

; 在 interval 时间内出现 SIGSEGV或SIGBUS 错误的子进程数超过设置的 threshold 值, 则fpm会平滑重启
emergency_restart_threshold = 30
emergency_restart_interval = 60s

; 子进程等待主进程的信号回应超时时间
process_control_timeout = 5s

; 最大的进程数
;process.max = 120

; 指定应用在主进程上的nice(2)优先级 ？
;process.priority = -19

daemonize = yes

; 设置主进程文件描述符rlimit(进程资源限制)的值 ?
rlimit_files = 1024
; 设置主进程rlimit最大核数 ?
rlimit_core = 0

; 指定FPM使用的事件机制
;events.mechaism = epoll

; 当FPM与systemd整合、启动时, 指定发送健康报告通知给systemd的间隔时间 ?
systemd_interval = 10
```

```ini
;;;;;;;;;;;;;;;;;;
; Pool Options ;
;;;;;;;;;;;;;;;;;;

[www]

; 每个进程池前缀
;prefix = /path/to/pools/$pool

user = www
group = www
listen = 127.0.0.1:9000

; 设置 listen(2) backlog 数量 ?
listen.backlog = -1

; unix socket的权限设置
;listen.owner = www
;listen.group = www
;listen.mode = 0660

; 使用POSIX权限控制时的配置 ?
;listen.acl_users =
;listen.acl_groups =

; 允许访问FastCGI的IP
listen.allowed_clients = 127.0.0.1

; 指定应用在进程池上的nice(2)优先级 ？
;process.priority = -19

; 设定process dumpable flag ?
;process.dumpable = no

; 选择进程池管理器控制子进程数量的方式
pm = dynamic

; pm为dynamic、ondemand时, 该值为最大子进程数
pm.max_children = 50

; 启动时创建的子进程数量, 仅适用于pm = dynamic
pm.start_servers = 30

; 处于空闲状态的最小子进程数, 仅适用于pm = dynamic
pm.min_spare_servers = 20

; 处于空闲状态的最大子进程数, 仅适用于pm = dynamic
pm.max_spare_servers = 50

; 空闲状态的子进程存活时间, 仅适用于pm = ondemand
;pm.process_idle_timeout = 10s;

; 每个子进程respawn(重生?复位?)之前应该处理的请求数
pm.max_requests = 2048

; 查看FPM状态页的URI
;
; 配合nginx的location使用示例
; location ~ /sample_status$ {
;     include fastcgi_params;
;     fastcgi_pass 127.0.0.1:9000;
;     fastcgi_param SCRIPT_FILENAME $fastcgi_script_name;
; }
;
; curl 域名/sample_status
;
; pool:                 www
; process manager:      dynamic
; start time:           22/Jul/2018:13:29:40 +0800
; start since:          12800649
; accepted conn:        8448
; listen queue:         0
; max listen queue:     1
; listen queue len:     32768
; idle processes:       19
; active processes:     1
; total processes:      20
; max active processes: 2
; max children reached: 0
; slow requests:        0
;
; pm.status_path = /sample_status

; 调用FPM监控页的ping URI
;ping.path = /ping

; 定制ping请求的响应 ?
;ping.response = pong

;access.log = log/$pool.access.log
;access.format = "%R - %u %t \"%m %r%Q%q\" %s %f %{mili}d %{kilo}M %C%%"

slowlog = log/slow.log

; 当单个请求超过该时间后, 会将本次请求的PHP调用堆栈信息写入到slowlog, 0 = off
;request_slowlog_timeout = 0

; 单个请求超时终止时间, 0 = off
;request_terminate_timeout = 0

; 同global中的配置
rlimit_files = 51200
rlimit_core = 0

; 启动时chroot的目录
;chroot = 

; 启动目录, 启动时会chdir到该目录
;chdir = /var/www

; 将woker的标准输出和错误输出重定向至error_log
catch_workers_output = yes

; 清理FPM wokers的环境 ?
;clear_env = no

; 允许解析的扩展名
;security.limit_extensions = .php .php3 .php4 .php5 .php7

; 传递环境变量 (影响$_ENV的值?) ?
;env[HOSTNAME] = $HOSTNAME
;env[PATH] = /usr/local/bin:/usr/bin:/bin
;env[TMP] = /tmp
;env[TMPDIR] = /tmp
;env[TEMP] = /tmp

; 指定给该进程池的workers额外的php.ini设置 ?
;php_admin_value[sendmail_path] = /usr/sbin/sendmail -t -i -f www@my.domain.com
;php_flag[display_errors] = off
;php_admin_value[error_log] = /var/log/fpm-php.www.log
;php_admin_flag[log_errors] = on
;php_admin_value[memory_limit] = 32M
```
* [参考](https://www.cnblogs.com/jonsea/p/5522018.html)