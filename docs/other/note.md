## windows schtasks定时任务
```sh
# 创建 名为'dispatch' 每日17:30:00执行 某路径下的dispatch.bat文件 的定时任务
schtasks /create /st 17:30:00 /sc daily /tn 'dispatch' /tr [path]\dispatch.bat

# 删除 名为'dispatch'的任务
schtasks /delete /tn 'dispatch'
```

## 换行符

* `\n` 也写作 LF：Linux风格
* `\r` 也写作CR：Unix及早期Mac风格
* `\r\n` 也写作CRLF：Windows风格
* `PHP_EOL` 为PHP换行常量
* [参考](https://www.jianshu.com/p/0db1db35e025)