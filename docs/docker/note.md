## 安装gitlab

* [中文镜像](https://hub.docker.com/r/beginor/gitlab-ce/) `docker pull beginor/gitlab-ce:11.3.0-ce.0`
* [官方镜像](https://hub.docker.com/r/gitlab/gitlab-ce/) `docker pull gitlab/gitlab-ce`
* 以中文镜像为例，未设置hostname时 `127.0.0.1:8080` 即可访问
    ```bash
    GITLAB_HOME=~/Documents/gitlab/
    docker run -d \
        # --hostname [内网ip] \
        # -p 8822:22
        -p 8443:443 -p 8080:80 \
        --name gitlab \
        --restart always \
        -v $GITLAB_HOME/config:/etc/gitlab \
        -v $GITLAB_HOME/logs:/var/log/gitlab \
        -v $GITLAB_HOME/data:/var/opt/gitlab \
        beginor/gitlab-ce:11.3.0-ce.0
    ```
* 首次登陆设置密码及邮箱 管理员账号为root
* [参考](https://www.imooc.com/article/23168)

## 更改已运行的容器的端口映射
* 系统： Ubuntu 18.04
* 停止容器，停止docker服务
* 根据容器ID修改 `/var/lib/docker/containers/[ID]/hostconfig.json`
    ```
    "PortBindings":{"容器端口/tcp":[{"HostIp":"","HostPort":"宿主机端口"}]
    ```
* 根据容器ID修改 `/var/lib/docker/containers/[ID]/config.v2.json`
    ```
    "ExposedPorts":{"容器端口/tcp":{}}
    "Ports":{"容器端口/tcp":[{"HostIp":"0.0.0.0","HostPort":"宿主机端口"}]} 
    ```
* 启动docker服务，启动容器
* [参考](https://hacpai.com/article/1539443516942)

## other
* [配置国内镜像源](https://www.jianshu.com/p/9fce6e583669)

* 当Dockerfile文件发生改变时，`docker-compose up` 加入 `--build` 选项可以重新build

* 批量停止正在运行的容器 `docker stop $(docker ps -q)`

