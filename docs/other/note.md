## windows schtasks定时任务
* 注意 **bat** 文件中命令与文件相关的部分应使用绝对路径 如： `php D:\www\app\yii task`

```sh
# 创建 名为 dispatch 每日17:30:00执行 某路径下的dispatch.bat文件 的定时任务
schtasks /create /st 17:30:00 /sc daily /tn dispatch /tr D:\WWW\app\dispatch.bat

# 立即运行 名为dispatch的任务
schtasks /run /tn dispatch

# 查看
schtasks /query /tn dispatch

# 删除
schtasks /delete /tn dispatch
```

## 换行符

* `\n` 也写作 LF：Linux风格
* `\r` 也写作CR：Unix及早期Mac风格
* `\r\n` 也写作CRLF：Windows风格
* `PHP_EOL` 为PHP换行常量
* [参考](https://www.jianshu.com/p/0db1db35e025)

## php后台运行windows下cmd命令

* **exec** 函数为同步，需要不等待立即返回时不能满足需求
* 方式1 
    ```php
    $cmd = 'php D:\WWW\app\task.php'

    pclose(popen("start /B {$cmd}", 'r'));
    ```
    [参考](https://www.php.net/manual/en/function.exec.php#86329)

* 方式2 调用 **COM** 对象  
    需要在ini配置中开启2项内容
    ```ini
    com.allow_dcom = true
    extension = php_com_dotnet
    ```

    ```php
    $cmd = 'php D:\WWW\app\task.php'

    $WshShell = new COM('WScript.Shell');
    $WshShell->Run("cmd /C {$cmd}", 0, false);
    ```
    [参考](https://www.php.net/manual/en/function.exec.php#43917)

## windows bat文件使用 pause
```
cd D:\Work\PHPStudy\WWW\vuepress
d:
npm run dev
pause
```
