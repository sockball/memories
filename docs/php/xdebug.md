## mac下docker容器中配置

* 在phpstorm中在 `Preferences -> Languages & Frameworks -> PHP -> Debug：Zend Debugger：Automatically detect IDE IP` 位置获取内网IP
* php.ini 中 xdebug 配置的 remote_host 设置为该ip
* 配置 `Preferences -> Languages & Frameworks -> PHP -> Debug -> DBGp Proxy：IDEKEY localhost 80`
* 配置 `Preferences -> Languages & Frameworks->PHP->Servers` 时选择 `
Use path mappings` ，并在 `Absolute path on the server` 中配置容器内的项目根目录
* [参考](https://www.jianshu.com/p/b04c4e2c3845)

## yii框架console配置

* `Preferences -> Languages & Frameworks -> PHP` 下配置PHP解释器CLI Interpreter，其中配置会自动读取 php.ini 文件（似乎不能自己指定?
* 右键根目录的yii文件选择 `Debug yii`
* Arguments中配置要debug的命令参数等等
* [参考](https://stackoverflow.com/questions/16589106/debug-yii-console-application-in-phpstorm)

## other

* 截止2019.04.26，xdebug2.7.0似乎在phpstorm 2018.1版本中无法使用...仅支持2.6.1以下