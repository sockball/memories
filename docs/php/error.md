## cURL error 60: SSL certificate problem
* **全名**：
```
cURL error 60: SSL certificate problem: unable to get local issuer certificate
```
* **环境**：Windows
* **描述**：本地没有配置信任的服务器HTTPS验证，使用 cURL 发出 **HTTPS** 请求时触发
* **方案**：  
   下载最新的cacert.pem证书，它是一组CA证书，用于验证请求的服务器是否为正确站点。  
   配置 php.ini 的 curl.cainfo `curl.cainfo="/path/to/downloaded/cacert.pem"`
* **下载**：[https://curl.haxx.se/ca/cacert.pem](https://curl.haxx.se/ca/cacert.pem)
* **关联**：git 出现时配置 `http.sslCAInfo` 参数
    ```ini
    # @link https://stackoverflow.com/questions/9008309/how-do-i-set-git-ssl-no-verify-for-specific-repos-only
    # @link https://git-scm.com/docs/git-config#Documentation/git-config.txt-httpsslCAInfo
    [http]
    # windows path use double back slashes or single slash
    # sslCaInfo = D:\\path\\cacert.pem
    # sslCaInfo = D:/git/Git/mingw64/ssl/certs/ca-bundle.crt
    # unix path to certificate (Base64 encoded)
    sslCaInfo = /path/cacert.pem
    ```
* [参考](https://stackoverflow.com/questions/24611640/curl-60-ssl-certificate-unable-to-get-local-issuer-certificate)
