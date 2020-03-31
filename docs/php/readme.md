## composer

* 安装
    ```sh
    curl -sS https://getcomposer.org/installer | php
    ```

* 元地址为 **https://packagist.org**  
  更换为国内镜像
  ```
  composer config -g repo.packagist composer https://packagist.phpcomposer.com
  ```

## 使用file_get_contents发送GET、POST请求
```php
// 发送GET请求
$result = file_get_contents('https://yesno.wtf/api')

// 发送POST请求
$context = stream_context_create([
    'http' => [
        'method' => 'POST',
        'header' => 'Content-Type: application/x-www-form-urlencoded;charset=utf-8' . PHP_EOL .
                    'accept: application/json' . PHP_EOL .
                    'Cookie: ...',
        'content' => '{"guid":"","data":[{"num":"CI12345678"}],"timeZoneOffset":-480}'
    ]
]);
$result = file_get_contents('https://t.17track.net/restapi/track', false, $context);
```

## 5.3至5.6版本新特性

* 增加static关键字实现延迟静态绑定 `return static::class`
* 支持匿名函数
* 类外也可使用const来定义常量 `const DEFAULT_VALUE = 10`
* HTTP状态码在200-399范围内均被认为访问成功
* 绑定phar扩展, 可用于打包
* php.ini中可使用变量
* 内置简单web服务器
    ```bash
    # 以运行该命令的目录为根目录
    php -S localhost:12345
    ```
* Traits 语法
* 数组简短语法`[ ]`
* Array dereferencing：表达式结果若为数组或对象，可直接在表达式后取值 `myfunc()[0]`
* 文件上传提供进度支持 `$_SESSION['upload_progress_name']` [参考](http://www.laruence.com/2011/10/10/2217.html)
* 提供 `JsonSerializable Interface` ，实现该接口的类的实例在`json_encode`前会调用`jsonSerialize`方法
* break、continue后只能传递常量跳出循环层数
* Nowdoc语法
    ```php
    $name = 'Xiao Wang';
    // Nowdoc 使用单引号声明 不解析特殊字符
    // 结果为 My name is "$name"
    $result = <<<'nowdoc'
    My name is "$name"
    nowdoc;

    // Heredoc 不使用或使用双引号声明 解析特殊字符
    // 结果为 My name is "Xiao Wang"
    $result = <<<"heredoc"
    My name is "$name"
    heredoc;
    ```
* 引用传递仅需在 函数/方法 声明时指定, 调用时不需指定`&`
* 支持 Class::{expr}() 语法，即表达式支持
    ```php
    /*
    $action = 'jumb';
    $human->$action();
    */
    $human->{'jumb'}();

    /*
    $action = 'walk';
    $human::$action();
    */
    $human::{'walk'}();
    ```
* `json_encode` 加入 `JSON_UNESCAPED_UNICODE` 选项
* 新增 `array_column`
* 新增 `Class::class`获取完整类名称
* 新增 `password_verify` `password_hash`等密码散列API
* 类属性的 Getter 和 Setter 语法
    ```php
    public $hours {
        get { return $this->seconds / 3600; }
        set { $this->seconds = $value * 3600; }
    }
    ```
* 非变量string和array支持获取下标 `'1234'[0]` `[1, 2, 3, 4][0]`
* 增加 `finally` 关键字
* 可变函数参数 `function foo($a, $b, ...$args)`
* 函数参数解包
    ```php
    function add($a, $b, $c)
    {
        echo $a + $b + $c;
    }

    $args = [2, 3];
    // 结果为6
    add(1, ...$args);
    ```
* use 支持函数和常量 `use const Name\Space\FOO` `use function Name\Space\f`
* 乘方计算符 `**`
* [参考](https://blog.csdn.net/fenglailea/article/details/9853645)

## 7.x 版本新特性
* 参数类型和返回值类型声明：int、float、bool、string、array、限定类名等
    ```php
    // 检测字符串是否含有重复字符
    function hasRepeated(string $str): bool
    {
        return preg_match('(\w)\1', $str);
    }
    ```
    特别地：
    * 参数允许为 null, 则在类型前加一个?
    * 返回值可为void即没有返回值或返回空（null也不可）
    ```php
    function sayHello(?string $str): void
    {
        echo 'say ', $str ?? 'hello';
        return ;
    }
    ```
* NULL合并运算符 `??`
* define 支持定义常量数组
    ```php
    define('CONFIG', [
        'user' => 'username',
        'pwd' => 'password',
    ]);
    ```
* 类常量支持设置修饰符
    ```php
    class Demo
    {
        public const PUBLIC_CONST = 1;
        protected const PROTECTED_CONST = 2;
        private const PRIVATE_CONST = 3
    }
    ```
* 短数组语法（类似list)，同时支持指定键名
    ```php
    // 交换一个数组任意2个键名的值
    function interchange($index1, $index2, array &$array): void
    {
        [$array[$index2], $array[$index1]] = [$array[$index1], $array[$index2]];
    }

    // 支持指定键名
    $user = ['id' => 123, 'name' => 'Liy'];
    ['id' => $id, 'name' => $name] = $user;
    ```
* [参考](https://blog.csdn.net/fenglailea/article/details/52717364)


## SPL标准库（数据结构）

* **栈**：先入后出
    ```php
    $stack = new SplStack();
    $stack->push('first in');
    $stack->push('second in');

    // second in
    echo $stack->pop();
    // first in
    echo $stack->pop();
    ```

* **队列**：先入先出
    ```php
    $queue = new SplQueue();
    $queue->enqueue('first in');
    $queue->enqueue('second in');

    // first in
    echo $queue->dequeue();
    // second in
    echo $queue->dequeue();
    ```

* **(最小)堆**
    ```php
    $heap = new SplMinHeap();
    $heap->insert('first in'); 
    $heap->insert('second in');

    // first in
    echo $heap->extract();
    // second in
    echo $heap->extract();
    ```

* **固定尺寸数组**
    ```php
    // 固定长度为10 未使用到的索引也会分配内存空间
    $array = new SplFixedArray(10);
    $array[1] = 1;
    $array[9] = 10;
    ```

## 添加跨域Header
```php
// 协议、域名、端口必须都相同
header('Access-Control-Allow-Origin: https://api.xxx.com');

// header('Access-Control-Allow-Methods: GET,POST,PUT');
header('Access-Control-Allow-Methods: *');

// 该header(2019.12)仍存在浏览器兼容问题 不应使用* 而应显示指定
header('Access-Control-Allow-Headers: Authorization, Content-Type, If-Match, If-Modified-Since, If-None-Match');

// 缓存本次OPTIONS预检请求的有效期
header('Access-Control-Max-Age: 86400');
```
[参考](https://www.ruanyifeng.com/blog/2016/04/cors.html)

## Xdebug基本配置
```ini
[Xdebug]
; 注意为zend_extenstion而不是extenstion
zend_extension = 'xdebug'
xdebug.remote_enable = 1
xdebug.remote_host = 'localhost'
xdebug.remote_port = 9007
xdebug.idekey = PHPSTORM
xdebug.remote_autostart = 1
```

## other

* 私有构造函数 防止外界实例化对象 `private function __construct() {}`
* 匿名函数递归举例 `$func = function () use (&$func) { $func() }`
* 函数 `number_format()` 通过千位分组格式化数字
* 注意 `explode` 函数切分连续分隔符的情况（py、js为split），如以 - 切分 `a-a---a`
* 类注释中使用 `@mixin ClassName` 混入该类的所有方法、属性
