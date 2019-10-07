## 基础

* 简单比较和输出
    ```php
    // true js为false
    '1e3' == '1000';

    // false 0123为八进制
    0123 == 123;

    // true js为false
    '0123' == '123';

    // Abc name会转换为0，赋值的数组会转换为Array字符串并使用ord()函数取得首字母ASCII码再转换得到A
    $str = 'abc';
    $str['name'] = ['test'];
    echo $str;

    // abc1
    echo print('abc');

    // 1
    echo count(strlen('hello world'));
    
    $arr = [1, 2, 3];
    foreach($arr as &$v){}
    foreach($arr as $v){}
    // [1, 2, 2]
    print_r($arr)
    ```

* 变量类型(8种)
    ```
    int(整型) float(浮点型) string(字符串) boolean(布尔型)

    array(数组) object(对象)

    null(空) resource(资源型)
    ```

* 超全局变量
    ```php
    $GLOBALS
    $_SERVER $_ENV $_SESSION $_COOKIE
    $_REQUEST $_POST $_GET $_FILES
    ```

* 魔术变量
    ```php
    __CLASS__ __METHOD__ __FUNCTION__
    __DIR__ __FILE__
    __NAMESPACE__ __STATIC__ __TRAIT__ __LINE__
    ```

* 魔术方法
    ```php
    __construct(); __destruct(); __get(); __set(); __clone(); __autoload();
    __toString(); __invoke(); __sleep(); __wakeup();
    __isset(); __unset(); __call(); __callStatic();
    ```

* 获取客户端、服务端IP：`$_SERVER['REMOTE_ADDR']`、`$_SERVER['SERVER_ADDR']`

* 写出3种或以上在Linux下获取一个日志文件 login.log 最后10行的命令
    ```sh
    tail -n 10 login.log

    # awk 'END{ print NR }' login.log 得到总行数, 也可换成 wc -l login.log | awk '{print $1}'
    # NR为当前行数
    awk -v COUNT=$(awk 'END{ print NR }' login.log) 'NR > COUNT - 10 { print $0 }' login.log

    # 先将每行保存至一个数组 索引为行数对10的余数，即1234567890循环，注意理解最后的打印顺序
    awk '{ buffer[NR % 10] = $0; } END { for (i = NR % 10 + 1; i < 10; i++){ print buffer[i]}; for(i = 0; i <= NR % 10; i++){ print buffer[i]}; }' login.log

    # @see https://unix.stackexchange.com/questions/107387/emulate-tail-with-sed
    sed -e :a -e '$q;N;11,$D;ba' login.log
    ```

* 正则
    ```js
    // 字符串是否有连续字母出现的正则 
    /([a-zA-Z])\1/
    ```

* 使用yield读取1G文件内容 (一般情况下file函数会将文件整个读入内存)
    ```php
    function getLines($file)
    {
        $handle = fopen($file, 'r');
        try {
            while (!feof($handle)) {
                yield fget($handle);
            }
        } finally {
            fclose($handle);
        }
    }

    $file = '1G.log';
    foreach (getLines($file) as $line)
    {
        echo $line;
    }
    ```
    [参考](https://www.php.net/manual/zh/language.generators.overview.php#112985)

* varchar(2) 可以存取2个中文字符，即长度为字符数而不是字节数

## 名词解释

* **范式**
    * 第一范式：每个字段已为最小单位，不可分割，具有原子性  
    **e.g：** 电话字段 同时存入手机和座机，范式化则应分成两个字段
    * 第二范式：应有主键，其他字段完全依赖于主键，保证记录的唯一性  
    **e.g：** 选课关系表（学号，课程号，成绩，学分），主键应为（学号、课程号）复合，但学分仅依赖课程号，所以应分离学分出来得到 课程号与学分 的新表
    * 第三范式：非主属性不依赖其他非主属性，即消除传递依赖  
    **e.g：** 部门信息表（部门编号、部门名称、部门简介等），那么在员工信息表中列出部门编号后就不能再将部门名称等与部门相关的冗余信息加入员工表中
    * 第四范式：消除多值依赖  
    **e.g：** 职工表(职工编号，职工孩子姓名，职工选修课程)，一个职工可能有多个孩子，也可能有多个选修课程，范式化则应拆分为2个表，使得每张表只有一个一对多的关系

* **CDN**  
Content Delivery Network，即内容分发网络。  
基本思路是尽可能避开互联网上有可能影响数据传输速度和稳定性的瓶颈和环节，使内容传输的更快、更稳定。  
通过在网络各处放置节点服务器所构成的在现有的互联网基础之上的一层智能虚拟网络，CDN系统能够实时地根据网络流量和各节点的连接、负载状况以及到用户的距离和响应时间等综合信息将用户的请求重新导向离用户最近的服务节点上。  
[参考](https://zhuanlan.zhihu.com/p/28939811)

* **负载均衡**  
指将负载（工作任务）进行平衡、分摊到多个操作单元上运行，例如FTP服务器、Web服务器、企业核心应用服务器和其它主要任务服务器等，从而协同完成工作任务。

* **Etag**  
Entity Tag，即实体标签，HTTP缓存机制之一  
当浏览器请求服务器的某项资源(X)时, 服务器根据 X 计算一个哈希值并作为 Response Header 的 ETag 返回给浏览器，浏览器把 Etag 和 X 同时缓存在本地，当再次向服务器请求 X 时，Request Header 会带有 If-None-Match 并以本地缓存的 Etag 作为其值发出，服务器再次计算 X 的哈希值并和 If-None-Match 的值做比较，若不相等则认为 X 发生了改变并返回 X (HTTP Code 200)；若相等则认为 X 未发生变化并返回空的 body (HTTP Code 304 Not Modified)，此时浏览器会从本地缓存读取 X

* **Last-Modified**  
类似 Etag ，以最后修改时间作为依据的HTTP缓存机制之一，其中 Response Header 带有 Last-Modified，则浏览器会在 Request Header 加入 If-Modified-Since，通过对比判断是否启用本地缓存

* **二进制安全**  
二进制安全是一种主要用于字符串操作函数相关的计算机编程术语。一个二进制安全功能（函数），其本质上将操作输入作为原始的、无任何特殊格式意义的数据流。对于每个字符都公平对待，不特殊处理某一个字符。  

    对于函数 `strlen('0123456789\0123456789')`  
    正例：PHP语言中结果为21，是二进制安全的  
    反例：C语言中结果为10，不是二进制安全的，因为C语言中的字符串会根据特殊字符 `\0` 来判断该字符串是否结束  
    [参考](https://blog.csdn.net/luoyanjiewade/article/details/88229820)

* **RESTful**  
Representational State Transfer，即表现层状态转化。  
RESTful是一种软件架构风格而不是标准，它提供了一组设计原则和约束条件。如果一个架构符合REST原则，就称它为RESTful架构。其中REST原则包括：  
    * 在REST中一切都被看作资源
    * 每个资源由URI标识
    * 使用统一的接口。处理资源使用POST，PUT，GET，DELETE操作类似创建，读取，更新和删除（CURD）操作
    * 无状态。每个请求是一个独立的请求。从客户端到服务器的每个请求都必须包含所有必要的信息，以便于理解

    **表现层(Representation)：** "资源"是一种信息实体，它可以有多种外在表现形式。"资源"具体呈现出来的形式，叫做它的"表现层"(Representation)。

    比如，文本可以用txt格式表现，也可以用HTML格式等表现。URI只代表资源的实体，不代表它的形式。它代表"资源"的位置，它的具体表现形式，是在HTTP请求的头信息中用Accept和Content-Type字段指定，这两个字段才是对"表现层"的描述。

    **状态转化(StateTransfer)：** 访问一个网站，就代表了客户端和服务器的一个互动过程。在这个过程中，势必涉及到数据和状态的变化。互联网通信协议HTTP协议，是一个无状态协议。这意味着，所有的状态都保存在服务器端。

    因此，如果客户端想要操作服务器，必须通过某种手段，让服务器端发生 **"状态转化"(StateTransfer)**。而这种转化是建立在表现层之上的，所以就是"表现层状态转化"。

    参考： [关于Restful协议和原理最强科普](https://cloud.tencent.com/developer/news/315397)、[REST面向资源架构 RESTful架构](https://www.jdon.com/rest.html)

* **OSI七层模型**
    * **物理层**  
    该层是网络通信的数据传输介质，由连接不同结点的电缆与设备共同构成，主要为硬件
    * **数据链路层**  
    在通信的实体间建立数据链路连接，传输以 "帧" 为单位的数据包，并采用差错控制与流量控制方法，使有差错的物理线路变成无差错的数据链路。
    * **网络层**  
    本层通过IP寻址来管理连接方式和路由选择，即IP层
    * **传输层**  
    提供端到端的服务，可以实现流量控制、负载均衡。传输层协议主要是TCP和UDP
    * **会话层**  
    会话层就是负责建立、管理和终止表示层实体之间的通信会话。该层的通信由不同设备中的应用程序之间的服务请求和响应组成。
    * **表示层**  
    表示层提供各种用于应用层数据的编码和转换功能，确保一个系统的应用层发送的数据能被另一个系统的应用层识别。
    * **应用层**  
    最靠近用户的一层，为计算机用户提供应用接口，也为用户直接提供各种网络服务。常见应用层的网络服务协议有 HTTP，HTTPS，FTP，POP3、SMTP等

    参考：[一文看懂什么是OSI七层协议](https://baijiahao.baidu.com/s?id=1623342279899809678)、[OSI七层模型与TCP/IP五层模型](https://www.cnblogs.com/qishui/p/5428938.html)

* **CSRF攻击**  
Cross—Site Request Forgery，即跨站请求伪造。攻击者伪装成受信任的用户发出请求攻击站点。

* **XSS攻击**  
Cross Site Scripting，即跨站脚本攻击。攻击者向Web内插入恶意script代码，用户访问该页面时即执行代码达到攻击的目的。

* **常见HTTP状态码**
    * 200：成功
    * 206：部分内容
    * 301：永久重定向
    * 302：临时重定向
    * 304：未修改
    * 400：错误请求
    * 401：未授权
    * 403：禁止访问
    * 404：未找到
    * 405：不允许的方法(Method)
    * 500：服务器内部错误
    * 502：网关错误
    * 504：网关超时

    [更多](https://www.cmsky.com/http-status-code/)

## 问答

* **SESSION 与 COOKIE 的区别**
    * SESSION 默认以文件形式存储在服务端，相对安全但太多会占用磁盘空间影响性能；  
    运行依赖 session id 同时依赖 COOKIE，若客户端关闭 COOKIE 则 SESSION 失效（可通过url传递 session id)  
    不区分路径，同一个用户在访问一个网站期间，所有的 session 在任何一个地方都可以访问到

    * COOKIE 存储在客户端，相对不安全  
    单个存储不能超过4K  
    如果设置了路径参数，那么同一个网站中不同路径下的cookie互相是访问不到的

* **GET 与 POST 的区别**
    * 不带请求参数时，仅仅是报文的第一行方法名不同： `POST /url HTTP/1.1` `GET /url HTTP/1.1`
    * 带请求参数时，一般地， GET 方法参数放在url中， POST 方法参数放在body中
    * GET 只支持ACSII码字符数据类型，POST没有限制还可传输二进制数据
    * POST 无数据长度限制，GET 会因浏览器和服务器对URL的长度限制而受限
    * 相对 GET 来说，POST要安全一些，因为在地址栏上不可见； 实际上从传输角度看，他们都是不安全的，因为HTTP是明文传输，若想安全传输则应加密，使用HTTPS

* **InnoDB 与 MyISAM 的区别**
    * InnoDB 支持事务和行级锁及外键约束
    InnoDB数据是和索引绑定在一起存于表空间内(.frm)  
    不会保存具体的行数
    DELETE表时实际是一行一行删除
    主键范围更大

    * MyISAM 仅支持表锁，不支持事务  
    MyISAM数据和索引是分开存储的(.MYD .MYI)  
    保存具体的行数 所以使用没有WHERE条件的 `SELECT COUNT(*) FROM table` 会非常快  
    支持全文索引，表可压缩

* **memcache 与 redis 的区别**
    * redis 支持简单的 k/v 存储同时支持 list set hash zsort(有序集合) 结构存储  
    存储的数据可以定期保存至磁盘上做到持久化

    * memcache 支持简单的 k/v 存储还可存储图片、视频等  
    重启或断电后数据会丢失

* **进程、线程、协程**
    * **进程**  
    进程是一个具有一定独立功能的程序关于某个数据集合的一次运行活动。（好比一个exe文件为一个类，进程则为其一个实例  
    它是操作系统进行资源分配和调度基本单元，至少由一个线程组成  
    进程是拥有资源的一个独立单位  
    每个CPU同时只能处理一个进程

    * **线程**  
    线程也被称为轻量级进程，是操作系统调度（CPU调度）执行的最小单位，由内核管理和调度  
    线程不拥有系统资源，但可以访问隶属于进程的资源

    * **协程**  
    协程是一种比线程更加轻量级的存在，协程不被操作系统内核所管理，而完全是由程序所控制。这样性能可以得到很大的提升，不会像线程切换那样消耗资源。  
    一个线程就是执行一个子程序。子程序调用总是一个入口，一次返回，调用顺序是明确的。   
    而协程在子程序内部是可中断的，然后转而执行别的子程序，在适当的时候再返回来接着执行
    
    参考：[进程、线程和协程之间的区别和联系](https://blog.csdn.net/daaikuaichuan/article/details/82951084)

* **进程锁、线程锁、分布式锁**
    * **线程锁：** 主要用来给方法、代码块加锁。当某个方法或者代码块使用锁时，那么在同一时刻至多仅有一个线程在执行该段代码。当有多个线程访问同一对象的加锁方法/代码块时，同一时间只有一个线程在执行，其余线程必须要等待当前线程执行完之后才能执行该代码段。但该对象中的非加锁代码块其余线程是可以访问的。
    * **进程锁：** 控制同一操作系统中多个进程访问一个共享资源的锁机制
    * **分布式锁：** 当多个进程不在同一个系统之中时，使用分布式锁控制多个进程对资源的访问

    参考：[一句话说清分布式锁，进程锁，线程锁](https://www.cnblogs.com/intsmaze/p/6384105.html)

* **乐观锁、悲观锁**
    * **乐观锁（optimistic locking）**

    UPDATE 流程
    1. 为需要加锁的表增加一个字段以表示版本号，如 ver
    2. 读取要更新的记录（不上锁）
    3. 对记录按照用户的意愿进行修改。
    4. 在保存记录前，再次读取这条记录的 ver 字段，与之前读取的值进行比对。
    5. 如果 ver 不同，说明在用户修改过程中，这条记录被改动过，那么应给出提示或抛出异常
    6. 如果 ver 相同，说明这条记录未被修改过。那么，对 ver + 1 并保存这条记录完成 UPDATE

    乐观锁仅在更新前判断是否被修改过

    * **悲观锁（pessimistic locking）**

    流程
    1. 在对任意记录进行修改前，先尝试为该记录加上排他锁（exclusive locking）。  
    2. 如果加锁失败，说明该记录正在被修改，那么当前查询可能要等待或者抛出异常。  
    3. 如果成功加锁，那么就可以对记录做修改，事务完成后就会解锁了。  
    4. 其间如果有其他对该记录做修改或加排他锁的操作，都会等待解锁或直接抛出异常。

    悲观锁很严谨，能有效保证数据的一致性，但同时缺点也很大：
    1. 悲观锁适用于可靠的持续性连接，诸如C/S应用。 对于Web应用的HTTP连接，先天不适用。
    2. 锁的使用意味着性能的损耗，在高并发、锁定持续时间长的情况下，尤其严重。 Web应用的性能瓶颈多在数据库上，使用悲观锁，进一步收紧了瓶颈。
    3. 非正常中止情况下的解锁机制，设计和实现起来很麻烦，成本还很高。
    4. 不够严谨的设计下，可能产生莫名其妙的，不易被发现的死锁问题。

    参考： [乐观锁与悲观锁](http://www.digpage.com/lock.html)

* **常见设计模式**
    * **工厂模式**  
    工厂模式就是一种包含一个专门用来创建其他对象的方法的类

    * **单例模式**  
    单例模式确保某个类只有一个实例，且自行实例化并向整个系统提供这个实例
        ```php
        // 仅完成连接的mysql单例模式示例
        class MySQL_DB
        {
            private static $db = null;

            private $config = [
                'host' => 'host',
                'user' => 'root',
                'pwd' => 'password',
                'db' => 'db_name',
            ];

            private function __construct()
            {
                $db_connect = mysql_connect($this->config('host'), $this->config['user'], $this->config['pwd']);
                mysql_select_db($this->config['db'], $db_connect) or die('mysql connect error');
                mysql_query('SET NAMES utf8mb4');
            }

            // 防止克隆
            private function __clone() {}

            public static function getInstance()
            {
                if (self::$db === null)
                {
                    self::$db = new self();
                }

                return self::$db;
            }
        }
        ```

    * **适配器模式**  
    将各种不同的接口方法封装成统一的API

    * **注册器模式**  
    容器

    * **策略模式**  
    将一组特定的行为和算法封装成类，以适应某些特定的上下文环境（类似场景...

    * **数据对象映射模式**  
    将对象和数据存储映射，对一个对象的操作会映射为对数据存储的操作，即ORM类

    * **观察者模式**  
    观察者模式是一种事件系统，意味着这一模式允许某个类观察另一个类的状态，当被观察的类状态发生改变的时候，观察类可以收到通知并且做出相应的动作;

    * **原型模式**  
    与工厂模式作用类似，都是用来创建对象  
    原型模式是先创建好一个原型对象，然后通过clone原型对象来创建新的对象，免去了类创建时重复的初始化操作  
    适用于大对象的创建。创建一个大对象需要很大的开销，如果每次new就会消耗很大，原型模式仅需内存拷贝
    ```php
    $prototype = new BigObject();
    $prototype->init();

    $objectOne = clone $prototype;
    $objectTwo = clone $prototype;
    ```

    * **装饰器模式**  
    动态地添加修改类的功能（行为...beforeBehavior afterBehavior

    * **迭代器模式**  
    在不需要了解内部实现的前提下，遍历一个聚合对象的内部元素

    * **代理模式**  
    在客户端与实体之间建立一个代理对象(proxy)，客户端对实体进行操作全部委派给代理对象，隐藏实体的具体实现细节  
    比如主从配置数据库的读写分离
    ```php
    $proxy = new Proxy();
    // 访问从数据库
    $proxy->getUsername($id);
    // 访问主数据库
    $proxy->setUsername($id, $name);
    ```
    * [慕课网 - 大话PHP设计模式](https://www.imooc.com/learn/236)

* **MySQL数据库优化**
    1. 设计数据库时，数据库表、字段的设计，存储引擎的选择
    2. 利用好MySQL自身提供的功能，如索引、EXPALIN分析等
    3. 分区，水平、垂直分表
    4. 横向扩展：MySQL集群、负载均衡、读写分离

    参考：[干货 | 7万字 MySQL优化/面试总结，看这一篇就够了！](https://zhuanlan.zhihu.com/p/53865600)

* **导致MySQL全表扫描的情况**
    1. 使用左模糊 LIKE  
        **例子**：`LIKE '%name'` 或 `LIKE '%name%'`  
        **避免**： 只使用右模糊 `LIKE 'name%'`

    2. 使用了复合索引，但查询条件没有使用前导列  
        **例子**：建立复合索引 `name, age` ，查询 `WHERE age > 14 AND name = 'Jane'`  
        **避免**：按复合索引建立时的顺序组装SQL语句

    3. OR条件的使用不当  
        **例子**：name有索引，age无索引，查询 `WHERE name = 'Jane' OR age = 10`  

    4. 对字段使用运算符或函数  
        **例子**： `WHERE salary * 0.8 = 1000` 、 `WHERE SUBSTRING(nickname, 1, 3) = 'Jane'`  
        **避免**：尽量提前将运算简化再组装SQL语句

## 算法

* **简单冒泡**
    ```php
    function bubbleSort(array $nums): array
    {
        $count = count($nums);
        if ($count < 2)
        {
            return $nums;
        }

        // $i控制冒泡次数
        for ($i = 1; $i < $count; $i++)
        {
            // 本轮冒泡是否发生交换
            $hasExchanged = false;
            // $k控制比较的次数
            for ($k = 0; $k < $count - $i; $k++)
            {
                if($nums[$k] > $nums[$k+1])
                {
                    // 交换位置
                    [$nums[$k], $nums[$k+1]] = [$nums[$k+1], $nums[$k]];
                    $hasExchanged = true;
                }
            }
            // 本轮冒泡未发生交换则代表已排序完毕
            if ($hasExchanged === false)
            {
                break;
            }
        }
        return $nums;
    }
    ```

* **简单双向队列**
    ```php
    class Deque
    {
        protected $queue = [];

        public function lpush($value, ...$more): int
        {
            return array_unshift($this->queue, $value, ...$more);
        }

        public function rpush($value, ...$more): int
        {
            return array_push($this->queue, $value, ...$more);
        }

        public function lpop()
        {
            return array_shift($this->queue);
        }

        public function rpop()
        {
            return array_pop($this->queue);
        }

        public function index($index)
        {
            return $this->queue[$index];
        }

        public function length()
        {
            return count($this->queue);
        }

        public function clear()
        {
            $this->queue = [];
            return true;
        }
    }
    ```

* 二分法查找 (在一个正序整形数组中查找指定数的位置)
    ```php
    // 非递归形式
    function binarySearch(array $arr, int $target): int
    {
        $leftIndex = 0;
        $rightIndex = count($arr) - 1;

        while ($leftIndex <= $rightIndex)
        {
            $middleIndex = floor(($leftIndex + $rightIndex) / 2);
            if ($arr[$middleIndex] === $target)
            {
                return $middleIndex;
            }
            else if ($arr[$middleIndex] > $target)
            {
                $rightIndex = $middleIndex - 1;
            }
            else
            {
                $leftIndex = $middleIndex + 1;
            }
        }

        return -1;
    }

    // 递归形式
    function binarySearchRecurive(array $arr, int $target, int $leftIndex = 0, ?int $rightIndex = null): int
    {
        $rightIndex = $rightIndex ?? (count($arr) - 1);

        if ($leftIndex <= $rightIndex)
        {
            $middleIndex = floor(($leftIndex + $rightIndex) / 2);
            if ($arr[$middleIndex] === $target)
            {
                return $middleIndex;
            }
            else if ($arr[$middleIndex] > $target)
            {
                return binarySearchRecurive($arr, $target, $leftIndex, $middleIndex - 1);
            }
            else
            {
                return binarySearchRecurive($arr, $target, $middleIndex + 1, $rightIndex);
            }
        }

        return -1;
    }
    ```

## 逻辑

* **倒水问题**
    * **题面：** 假设一个水池无限水，现有一5L杯子，一6L杯子，如何获取3L水?

    * **解答：**：
        1. 6L杯子装满倒入5L杯子，6L杯子剩1L；
        2. 5L杯子倒入水池，6L杯子再倒入5L杯子，此时5L杯子有1L水；
        3. 6L杯子装满倒入5L杯子，6L杯子剩2L；
        4. 5L杯子倒入水池，6L杯子再倒入5L杯子，此时5L杯子有2L水；
        5. 6L杯子装满倒入5L杯子，6L杯子剩3L；

* **Two Egg Problem**
    * **题面：**   
    两个软硬程度一样但未知的鸡蛋，它们有可能都在一楼就摔碎，也可能从一百层楼摔下来没事。  
    有座100层的建筑，要求用这两个鸡蛋确定哪一层是鸡蛋可以安全落下的最高位置。可以摔碎两个鸡蛋。  
    问最少需要多少次测试，才能得到摔碎鸡蛋的楼层？方案如何？
    
    * **解答：**：[参考](https://www.cnblogs.com/Matrix_Yao/p/4793823.html)

* **金条问题**
    * **题面：**  
    你有一根金条，可以分成7等分。现有一批工人为你工作7天，每天需要给他们一段金条。要求金条只能折断2次，问如何分配
    
    * **解答：**
        1. 金条折断2次分成1、2、4分
        2. 第一天给工人1分金条
        3. 第二天给工人2分金条并收回1分金条
        4. 第三天给工人1分金条
        5. 第四天给工人4分金条并收回1分和2分金条
        6. 第五天给工人1分金条
        7. 第六天给工人2分金条并收回1分金条
        8. 第七天给工人1分金条

## 网络、操作系统基础

* **输入一个网址至呈现页面所经历的过程**
    * 浏览器先在缓存中查询是否有要访问的资源，若有则不发起http请求直接从缓存中加载资源
    * 浏览器根据域名向DNS服务器发起请求查询出对应的IP地址
    * 浏览器根据IP地址和端口号与服务器建立TCP连接（三次握手
    * 浏览器向服务器发起HTTP请求并通过HTTP协议将请求信息包装成请求报文（包含请求行、请求头、空行、请求体）发送至服务器
    * 服务器接收到请求报文后按照HTTP协议进行解析并根据请求信息做相应的业务逻辑处理操作
    * 在业务逻辑处理完成后，服务器将要返回的数据按照HTTP协议封装成响应报文（包含响应行、响应头、空行、响应体）并发送给浏览器
    * 浏览器接受到响应报文后按照HTTP协议进行解析并根据响应体数据进行HTML、CSS渲染，执行JS
    * 解析过程中若遇到外链标签（link、js、img）则浏览器又会向路径地址发出新的请求，同上
    * [参考](https://blog.csdn.net/rosecurry/article/details/90770699)