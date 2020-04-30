## Windows schtasks定时任务
* ⚠️ 注意 **bat** 文件中命令与文件相关的部分应使用绝对路径 如： `D:\path\php D:\www\app\yii task`

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

## php后台运行Windows下cmd命令

* **exec** 函数为同步，需要不等待立即返回时不能满足需求
* 方式1 
    ```php
    $cmd = 'D:\path\php D:\WWW\app\task.php'

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
    $cmd = 'D:\path\php D:\WWW\app\task.php'

    $WshShell = new COM('WScript.Shell');
    $WshShell->Run("cmd /C {$cmd}", 0, false);
    ```
    [参考](https://www.php.net/manual/en/function.exec.php#43917)

## Windows bat文件使用 pause
```
cd D:\Work\PHPStudy\WWW\vuepress
d:
npm run dev
pause
```

## 常用编辑器(IDE)快捷键设置对照表

说明                       | 偏好          | SUBLIME 3               | PHPSROTM
:-----:                    | :-----:       | :-----:                 | :-----:
选中下一个相同块           | CTRL+D        | Quick Add Next          | Add Selection for Next Occurrence
跳过当前块至下一个相同块   | CTRL+K        | Quick Skip Next         | Find Next / Move to Next Occurence
反撤销                     | CTRL+Y        | Redo Insert Characters  | Redo
跳转指定行                 | CTRL+G        | Go to Line              | Line/Column...
返回上次操作点             | ALT+-         | Jump Back               | Back
返回前次操作点             | ALT++         | Jump Forward            | Forward
无缩进的粘贴               |               | Paste                   | Paste without Formatting
有缩进的粘贴               | CTRL+V        | Paste and Indent        | Paste
...                        | CTRL+Enter    |        | 

## 版本通配符

* **(>, >=, <, <=)1.1.2：**  
    即必须(大于，大于等于，小于，小于等于)1.1.2版本

* **~：**  
    ~1.1.2：即 1.1.2 <= version < 1.2  
    ~1.1：即 1.1.0 <= version < 1.2.0  
    ~1：即 1.0.0 <= version < 2.0.0

* **^：** 版本号最左边非0数字的右侧任意  
    ^1.1.2：即 1.1.2 <= version < 2.0.0  
    ^0.1.2：即 0.1.2 <= version < 0.2.0  
    ^1.1：即 1.1.0 <= version < 2.0.0  
    ^0.0：即 0.0.0 <= version < 0.1.0

* **x：**  
    1.2.x  
    2.x  

* [参考](https://www.cnblogs.com/wshiqtb/p/6395029.html)

## netstat(Windows)
```sh
# -a 所有连接和端口
# -n 以数字形式显示地址和端口号
# -o 显示进程ID
netstat -aon | findstr 10086
```

* [参考](https://blog.csdn.net/hsd2012/article/details/50759017)

## frp配置参考
* Windows远程
```ini
; frps.ini
[common]
bind_port = 7000

; frpc.ini
[common]
server_addr = x.x.x.x
server_port = 7000      ; 服务端与客户端通信端口

[rdp]
type = tcp
local_ip = 127.0.0.1
local_port = 3389       ; windows RDP默认端口
remote_port = 34567     ; 服务端frp入口
```

## python利用谷歌API获取Youtube视频分类示例
```py
import requests, json

base_url = 'https://www.googleapis.com/youtube/v3/videoCategories?part=snippet&id=__id__&key=__key__&hl=zh_CN'
api_key = 'AIzaSyAZ4KgnMIanCljaaStwJvrIY1Eo9fqjolM'
auth_token = '....'

base_url = base_url.replace('__key__', api_key)
headers = { 'Authorization': 'Bearer ' + auth_token, 'Accept': 'application/json' }

# id最大值大约在40多
for id in range(1, 50):
    url = base_url.replace('__id__', str(id))

    raw = requests.get(url, headers = headers)
    res = json.loads(raw.content)
    if len(res['items']) > 0 and res['items'][0]['snippet']['assignable'] is True:
        print('id：%s \t name：%s\n' % (id, res['items'][0]['snippet']['title']))

print('end')

'''
返回值示例
{
    'kind': 'youtube#videoCategoryListResponse',
    'etag': '"nxOHAKTVB7baOKsQgTtJIyGxcs8/5PBdFIM28opCSkfiF11JAXuEneI"',
    'items': [
        {
            'kind': 'youtube#videoCategory',
            'etag': '"nxOHAKTVB7baOKsQgTtJIyGxcs8/Xy1mB4_yLrHy_BmKmPBggty2mZQ"',
            'id': '1',
            'snippet': { 'channelId': 'UCBR8-60-B28hp2BmDPdntcQ', 'title': 'Film & Animation', 'assignable': True }
        }
    ]
}
'''
```
* [https://developers.google.com/youtube/v3/docs/videoCategories/list](https://developers.google.com/youtube/v3/docs/videoCategories/list)

## Other

* Windows下查看核数等信息：执行 `wmic` 命令后 `cpu get *`
* Excel逐行累加公式举例 `SUM($B$3:B3)` $B$3即固定住B3
* CMD编码格式转为UTF-8 `CHCP 65001` 然后字体改为 **Lucida Console**