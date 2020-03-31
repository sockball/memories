* PHP (Hypertext Preprocessor) 超文本预处理器

* 主要用于三大领域：服务端脚本；命令行脚本；**桌面(GUI)应用程序**(可利用PHP-GTK扩展)

* POST并未比GET安全，GET更易分享 [--from](https://www.php.net/manual/zh/tutorial.forms.php#121212)

* PECL (PHP Extention Community Library) 由PEAR打包系统而来的PHP扩展库仓库  
```sh
# phpize编译安装
cd extname
phpize

# 多版本时指定版本(如MAMP会用到) 
# ./configure --with-php-config=/Applications/MAMP/bin/php/php7.1.12/bin/php-config
./configure

make
# make install
```
[PECL](https://pecl.php.net/)  
[PECL for Windows](http://windows.php.net/downloads/pecl/releases/)

* 一些名词解释  

**CGI(Common Gateway Interface)：**  
通用网关接口，连接App Server与Web   Server的解释器，每次收到HTTP请求都会启动新的进程并完成初始化工作  

**FastCGI：**  
CGI的升级版协议，常驻多进程模型  

**FPM(FastCGI Program Manager)：**  
实现了FastCGI和对**php-cgi**的进程管理  

**SAPI(Server API)：**  
如php.exe(CLI SAPI)、php-cgi.exe(CGI SAPI)都是SAPI，它们都提供了一个和外部通信的接口  

**ISAPI(Internet Service API)：**  
是微软提供的一套面向Internet服务的API接口，可在服务器级(如IIS)上使用底层的API编程

**NSAPI(Netscape Service API)：**  
[CGI与FastCGI的运行原理](https://www.cnblogs.com/itbsl/p/9828776.html)、[搞不清FastCgi与PHP-fpm之间是个什么样的关系](https://segmentfault.com/q/1010000000256516)

**TS (Thread Safe) ：**  
线程安全，用于单进程服务器，多线程访问采用锁机制，如PHP作为模块时的Apache(ISAPI)  

**NTS (Non Thread Safe)：**  
非线程安全，用于FastCGI Web Server  
[https://www.php.net/manual/zh/install.windows.manual.php](https://www.php.net/manual/zh/install.windows.manual.php)

* Windows下部分PHP压缩包的内容(7.4.1) [参考](https://www.php.net/manual/zh/install.windows.legacy.index.php)
```ini
; CGI可执行文件
php-cgi.exe

; 无窗口执行脚本的可执行文件 可运行PHP脚本而不打开命令行窗口
php-win.exe

; 用于cli
php.exe

; Debug SAPI模块
phpdbg.exe

; PHP核心dll(TS)
php7ts.dll 

; Apache2.4.x模块(TS)
php7apache2_4.dll

; PHP核心dll(NTS)
php7.dll 
```

* ⚠️⚠️**Windows下的php-cgi.exe并不是FPM** FPM以fork()为基础 在Windows上不可用 [参考](https://www.php.net/manual/zh/install.fpm.php#121725)
```php
// Windows下返回cgi-fcgi
// Linix下返回fpm-fcgi
php_sapi_name();
```

* [FPM部分配置说明](https://www.php.net/manual/zh/install.fpm.configuration.php)、[FPM日志参数](https://www.php.net/manual/zh/install.fpm.configuration.php#122456)

* Windows部分扩展参考 [install.windows.legacy.extensions](https://www.php.net/manual/zh/install.windows.legacy.index.php#install.windows.legacy.extensions)

* 自 PHP 5.3.0 起，PHP 支持基于每个目录的 **.htaccess** 风格的 INI 文件。此类文件仅被 CGI／FastCGI SAPI 处理。  
只有具有**PHP_INI_PERDIR**和**PHP_INI_USER**模式的 INI 设置可被识别（每个指令都有其所属的[模式](https://www.php.net/manual/zh/configuration.changes.modes.php)  
Apache仅在PHP作为模块时使用 .htaccess 文件可添加ini配置 [参考](https://www.php.net/manual/zh/configuration.file.per-user.php#115455)

* [fastcgi_finish_request()](https://www.php.net/manual/zh/install.fpm.php)

* 如果文件内容是纯 PHP 代码，最好在文件末尾删除 PHP 结束标记。这可以避免在 PHP 结束标记之后万一意外加入了空格或者换行符，会导致 PHP 开始输出这些空白，而脚本中此时并无输出的意图。

* 开始和结束标记
```php
// 1
<?php echo 'if you want to serve XHTML or XML documents, do it like this'; ?>

// 2
<script language="php">
    echo 'some editors (like FrontPage) don\'t like processing instructions';
</script>

// 3
<? echo 'this is the simplest, an SGML processing instruction'; ?>
<?= expression ?> This is a shortcut for "<? echo expression ?>"

// 4 ASP风格
<% echo 'You may optionally use ASP-style tags'; %>
```

* 注释
```
// C++ 注释风格

/* 
 * C风格 批量注释
 */

# SHELL 风格注释
```

* 数据类型  
四标量： boolean integer float(double) string  
三复合： array object **callable**  
特殊： resource NULL

* boolean特殊比较
```php
// false
0 == (bool) 'all';

// true
0 == 'all';

// true
(bool) '0.0';
(bool) '0.00';

// true
[] == null;
false == [];
0 == 0.0;
...
```

* 整形
```php
$n = 0123; // 八进制数 (等于十进制 83)
$n = 0x1A; // 十六进制数 (等于十进制 26)
$n = 0b11111111; // 二进制数字 (等于十进制 255)

// 最大最小值常量 
PHP_MAX_INT;
PHP_MIN_INT;

// 整数溢出解释为float
$million = 1000000;
$large_number = 50000000000000 * $million;

// @see https://www.php.net/manual/zh/language.types.integer.php#77056
function ipv4ToInt (string $ip)
{
    $ipArr = explode('.', $ip);
    return $ipArr[0] * 0x1000000
           + $ipArr[1] * 0x10000
           + $ipArr[2] * 0x100
           + $ipArr[3];
}

function intToIpv4 (int $intIp)
{
    $ipArr = [floor($intIp / 0x1000000)];
    $ipVint = $intIp - ($ipArr[0] * 0x1000000); // for clarity
    $ipArr[1] = ($ipVint & 0xFF0000)  >> 16;
    $ipArr[2] = ($ipVint & 0xFF00  )  >> 8;
    $ipArr[3] = $ipVint & 0xFF;

    return implode('.', $ipArr);
}
```

* float浮点数精度有限 二进制并不能精确表示所有浮点数
```php
// 7
floor((0.1 + 0.7) * 10);

// false
(8 - 6.4 ) == 1.6;
```

* 数组
```php
// unset()可删除数组中某个key 但数组不会重新索引
$list = range(5);
foreach ($list as $i => $v)
{
    unset($list[$i]);
}
$list[] = 6;
print_r($list);


// @see https://www.php.net/manual/zh/language.references.php#87532
$arr = array('a'=>'first', 'b'=>'second', 'c'=>'third');
foreach ($arr as &$a); // do nothing. maybe?
foreach ($arr as $a);  // do nothing. maybe?
print_r($arr);
```

* 魔术常量
```php
__CLASS__ __METHOD__ __FUNCTION__
__DIR__ __FILE__
__NAMESPACE__ __TRAIT__ __LINE__
```

* 位运算符

例子                  | 名称                 | 结果                                   | 备注
:-----:               | :-----:              | :-----:                                | :-----:
$a & $b               | And（按位与）        | 都为 1 的位设为 1                      |
$a \| $b              | Or （按位或）        | 任何一个为 1 的位设为 1                |
$a ^ $b               | Xor（按位异或）      | 其中一个为 1 另一个为 0 的位设为 1     |
~ $a                  | Not（按位取反）      | 0 -> 1, 1 -> 0                         |
$a << $b              | Shift left（左移）   | 向左移动$b次（每一次移动都表示乘以2）  | 边界值为0
$a >> $b              | Shift right（右移）  | 向右移动$b次（每一次移动都表示除以2）  | 正数边界值为0，负数为-1

```php
// 一个利用4字节int整形存储32个true false的 位flag...(涉及多种权限时可考虑)
// @see https://www.php.net/manual/zh/language.operators.bitwise.php#108679
abstract class BitwiseFlag
{
    ...
}

class User extends BitwiseFlag
{
    ...
}

$user = new User();
$user->setRegistered(true);
$user->setActive(true);
$user->setMember(true);
$user->setAdmin(true);
// User [REGISTERED ACTIVE MEMBER ADMIN]
echo $user;
```

```php
// 16进制颜色转为rgb
// @see https://www.php.net/manual/zh/language.operators.bitwise.php#50622
function hexToRGB (int $hex)
{
    $red   = $hex >> 16;
    $green = ($hex & 0x00FF00) >> 8;
    $blue  = $hex & 0x0000FF;

    return [$red, $green, $blue];
}
```

* 反引号 执行运算符 效果与 shell_exec 相同
```php
$host = 'www.zhihu.com';
echo `ping -n 3 {$host}`;
```

* 递增运算符中 纯字母的递增沿袭Perl
```php
$str = 'Z';
$str++;         // 'AA'
```

* declare(ticks = N) 每执行N条低级语句则会执行的内容...
    * 基本用法
    ```php
    declare(ticks = 1);

    // A function called on each tick event
    function tick_handler()
    {
        echo "tick_handler() called\n";
    }
    register_tick_function('tick_handler');

    $a = 1;
    if ($a > 0) {
        $a += 2;
        print($a);
    }
    ```

    * 配合 [pcntl_signal](https://www.php.net/manual/zh/function.pcntl-signal.php) 信号处理函数(性能差)

* goto 大小写敏感 可替代多层break
```php
goto a;
echo 'Foo';     // skip
 
a:
echo 'Bar';
```

* 返回一个引用
```php
function &returns_reference()
{
    return $someref;
}

$newref =& returns_reference();
```

* [Example #2](https://www.php.net/manual/zh/language.oop5.basic.php)  $this 伪变量的示例：注意5与7的不同

* 对象赋值 [解释](https://www.php.net/manual/zh/language.oop5.basic.php#79856)
```php
$instance = new SimpleClass();

$assigned   =  $instance;
$reference  =& $instance;

$instance->var = '$assigned will have this value';

$instance = null; // $instance and $reference become null

var_dump($instance);
var_dump($reference);
var_dump($assigned);
```

* [内存泄漏示例](https://www.php.net/manual/zh/language.oop5.decon.php#105368)

