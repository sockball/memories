## https配置示例
```nginx
server {
    charset utf-8;
    client_max_body_size 128M;

    # nginx 1.15.0后舍弃 'ssl on;' 用法
    listen 443 ssl;

    # 引入公钥证书
    ssl_certificate /.../admin.crt;

    # 引入私钥key
    ssl_certificate_key /.../admin.key;

    # 设置session缓存的类型和大小
    ssl_session_cache   shared:SSL:10m;

    # session缓存的ssl参数过期时间, 默认5m
    ssl_session_timeout 10m;

    # 选择加密套件
    ssl_ciphers AES128-SHA:AES256-SHA:RC4-SHA:DES-CBC3-SHA:RC4-MD5;

    # 优先使用服务端加密套件
    ssl_prefer_server_ciphers on;

    # 加密协议, 默认即为该配置
    # ssl_protocols       TLSv1 TLSv1.1 TLSv1.2;

    # 默认TCP连接保持的时间75s
    # keepalive_timeout 70;

    # 启用HSTS：HTTP严格传输安全
    add_header Strict-Transport-Security "max-age=31536000; includeSubdomains";

    # 设置cookie加密传输
    add_header Set-Cookie "Secure";

    # 只允许页面可在相同域名页面frame、iframe使用
    # add_header X-Frame-Options "SAMEORIGIN";

    server_name domain;
    root        ...;
    index       index.php;

    access_log  /.../access_nginx.log;
    error_log   /.../access_nginx_error.log;

    # 重写模式
    location / {
        try_files $uri $uri/ /index.php$is_args$args;
    }

    location ~ ^/assets/.*\.php$ {
        deny all;
    }

    location ~ \.php$ {
        include fastcgi_params;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        fastcgi_pass 127.0.0.1:9000;
        try_files $uri = /404;
    }

    location ~* /\. {
        deny all;
    }
}
```

## proxy_pass后加入 /

* 使用 proxy_pass 并且 location 按照 `^~` 匹配时，proxy_pass 的参数后加入 `/` 则相当于此时以匹配的 `uri` 为根路径, 而不会把location匹配的部分也代理上
* 示例
    ```nginx
    server_name domain;

    location ^~ /api/ {
        proxy_pass http://127.0.0.1:8070/
    }

    # 请求 http://domain/api/user/login
    # 实际代理成 http://127.0.0.1:8070/user/login
    # 而不是 http://127.0.0.1:8070/api/user/login
    ```
* [参考](http://www.cnblogs.com/AloneSword/p/3673829.html)

## 日志格式log_format配置示例
```nginx
...

http {
    ...

    # format_name为该格式指定名称
    log_format format_name
        '$time_iso8601 【$remote_addr】\n'
        '$request $status\n'
        '$http_referer $http_user_agent\n';

    server {
        ...

        # 最后的参数加入日志格式的指定名称
        access_log /data/wwwlogs/access.log format_name;
    }
}
```

* 参考结果
```
2019-10-07T14:57:44+08:00 【21.126.108.125】
GET /assets/js/9.d139dce1.js HTTP/1.1 200
https://www.baidu.com/ Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36
```

* 部分变量解释
```sh
# 访问时间和时区 格式为 2019-10-07T14:57:44+08:00
$time_iso8601

# 访问时间和时区 格式为 07/Oct/2019:14:14:48 +0800
$time_local

# 客户端IP
$remote_addr

# 请求方式和URI
$request

# HTTP CODE
$status
```

* [参考](https://www.cnblogs.com/joshua317/p/6651203.html)

## 返回客户端ip
```nginx
location /ip {
    default_type text/plain;
    return 200 $remote_addr;
}

location /json_ip {
    default_type application/json;
    return 200 "{\"ip\":\"$remote_addr\"}";
}
```

* [参考](https://www.ecalamia.com/blog/show-ip-api-nginx/)