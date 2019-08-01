* 从5.6开始可以导入函数和常量，不过要调整use关键字的句法
    ```php
    use func Namespace\functionName;
    functionName();

    use constant Namespace\CONST_NAME;
    echo CONST_NAME;
    ```

* 使用 `DateTime` 类
    ```php
    // 没有参数 创建一个表示当前日期和时间的实例
    $datetime = new DateTime();

    // 传入参数
    $datetime = new DateTime('2014-04-27 5:03 AM');

    // 指定格式 与date()函数使用的日期和时间格式一致
    DateTime::createFromFormat('M j, Y H:i:s', 'Jan 2, 2014 23:04:12');
    ```

    `DateInterval` 实例用于修改 `DateTime` 实例，表示时间间隔  
    构造方法参数为一个字符串，表示间隔规约，以字母 `P` 开头，若包含时间，则应在日期和时间两部分之间加入字母 `T`  
    有效周期标志符包括： `Y M D W H M S`  
    另外可建立反向 `DateInterval` 实例，如 `DateInterval::createFromDateString('-1 day')`
    ```php
    $datetime = new DateTime('2014-01-01 14:00:00');
    
    // 长度为两周的间隔
    $interval = new DateInterval('P2W');
    // 长度为两天五小时两分钟
    $interval = new DateInterval('P2DT5H2M');

    // 修改Datetime实例
    $datetime->add($interval);
    // 2014-01-03 19:02:00
    echo $datetime->format('Y-m-d H:i:s');
    ```

    `DatePeriod` 类用于迭代处理一段时间内反复出现的一系列日期和时间  
    `DatePeriod` 实例是<span class='warning'>迭代器</span>，每次迭代会产出一个 `DateTime` 实例  
    构造方法包含三个必须及一个可选参数：
    * 一个 `DateTime` 实例，表示迭代开始的日期和时间
    * 一个 `DateInterval` 实例，表示到下一个日期和时间的间隔
    * 一个整数，表示迭代总次数(不包含初始日期)；<span class='warning'>或者</span> 一个`DateTime` 实例，表示迭代结束的日期和时间
    * 可设置为 `DatePeriod::EXCLUDE_START_DATE` 常量，表示排除起始的日期和时间
    ```php
    $dateStart = new DateTime('2019-07-30');
    $dateInterval = DateInterval::createFromDateString('-1 day');
    $datePeriod = new DatePeriod($dateStart, $dateInterval, 3);
    foreach ($datePeriod as $date)
    {
        echo $date->format('Y-m-d'), PHP_EOL;
    }
    // 依次得到 2019-07-30、2019-07-29、2019-07-28、2019-07-27
    ```
* `PDO` （PHP Data Objects）：PHP数据对象
* `DSN` （Data Source Name）：数据源名称
* 流标识符 `<scheme>://<target>`
    * `<scheme>` 表示流的封装协议
    * `<target>` 表示流的数据源

    普通的URL其实是HTTP流封装协议  
    `file_get_contents()、fopen()、fwrite()` 等读写文件系统的函数默认使用 `file://` 流封装协议，通常省略
