### 微信测试公众号接入

1. 在 [测试账号申请页](https://mp.weixin.qq.com/debug/cgi-bin/sandbox?t=sandbox/login) 登录

2. 由于接口配置URL需要外网地址，使用 `ngrok` 工具完成简单内网穿透  
    [注册](http://www.ngrok.cc/user.html)后进入后台  
    **隧道管理 -> 开通隧道**，选择一台免费服务器（也可以为表示支持选择一台便宜收费的）  
    可按 [引导](http://www.ngrok.cc/_book/general/open.html) 填写，也可按如下配置
    ```
    隧道协议：http
    隧道名称：wx_test
    前置域名：wxtesttest
    本地端口：127.0.0.80
    其他可不填
    ```
    添加服务器后进入 **隧道管理**，拿到 **隧道id** 和 **域名**  
    [下载](http://www.ngrok.cc/download.html) 客户端，本机是 windows64 版本  
    解压后 打开 `/windows_amd64/Sunny-Ngrok启动工具.bat` 输入 **隧道id** 即可完成内网穿透  
    此时获取的外网域名访问的是本地的80端口  
    开启本地NMP环境（如PHPStudy） 并为该域名设置一个根访问路径
    ```nginx
    server {
        charset utf-8;
        listen 80;

        # 此处填获取的域名
        server_name wxtestest.xxx.com;
        root        D:/Work/PHPStudy/WWW/wx;
        index       index.php;

        location ~ \.php$ {
            include fastcgi_params;
            fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
            fastcgi_pass 127.0.0.1:9000;
            try_files $uri=404;
        }

        location ~* /\. {
            deny all;
        }
    }
    ```

3. 回到微信测试号管理，配置接口配置信息
    ```
    URL: 获取的域名
    Token：token_test
    ```
    在设立的域名访问根路径下建立 `index.php` 根据 [接入指南](https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421135319) 或按以下示例代码完成接入即可  
    ```php
    <?php
    const TOKEN = 'token_test133';

    function checkSignature($token)
    {
        $params = [
            'token'     => $token,
            'timestamp' => $_GET['timestamp'] ?? null,
            'nonce'     => $_GET['nonce'] ?? null,
        ];
        sort($params, SORT_STRING);
        $_signature = sha1(implode('', $params));
        if ($_signature === ($_GET['signature'] ?? null))
        {
            echo $_GET['echostr'] ?? null;
        }
        else
        {
            echo 'death';
        }
    }

    checkSignature(TOKEN);
    ```