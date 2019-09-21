### PHP yield

* 自定义 xrange 函数完成大范围数遍历（与 range 比较
```php
function xrange(float $start, float $end, float $step = 1)
{
    if ($step === 0)
    {
        throw Exception('step不能为0');
    }
    else if ($start > $end)
    {
        $step = ($step > 0) ? ($step * -1) : $step;
        for ($v = $start; $v >= $end; $v += $step)
        {
            yield $v;
        }
    }
    else
    {
        $step = ($step < 0) ? ($step * -1) : $step;
        for ($v = $start; $v <= $end; $v += $step)
        {
            yield $v;
        }
    }
}

$startMemory = memory_get_usage();
$range = [1, 1000000];

// 随着range范围越来越大 内存占用越来越大
foreach (range(...$range) as $k => $v)
{
    echo (memory_get_usage() - $startMemory), PHP_EOL;
}

// 无论range多大 内存占用趋于一个定值
foreach (xrange(...$range) as $k => $v)
{
    echo (memory_get_usage() - $startMemory), PHP_EOL;
}
```