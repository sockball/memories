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
    
    location ^~ /api {
        proxy_pass http://127.0.0.1:8070/
    }

    # 请求 http://domain/api/user/login
    # 实际代理成 http://127.0.0.1:8070/user/login
    # 而不是 http://127.0.0.1:8070/api/user/login
    ```
* [参考](http://www.cnblogs.com/AloneSword/p/3673829.html)