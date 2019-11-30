### 静态修饰符static与继承

* 情形1  
结果分别为：<span style='background:#000;color:#000'>2 和 1</span>
```php
class A
{
    protected $a = 1;
    private   $b = 1;

    public function getA()
    {
        return $this->a;
    }

    public function getB()
    {
        return $this->b;
    }
}

class B extends A
{
    protected $a = 2;
    private   $b = 2;
}

$b = new B();
echo $b->getA();
echo $b->getB();
```

* 情形2  
结果分别为：<span style='background:#000;color:#000'>1、1、2、(error)</span>
```php
class A
{
    protected static $a = 1;
    private   static $b = 1;

    protected static $c = 1;
    private   static $d = 1;

    public static function getA()
    {
        return self::$a;
    }

    public static function getB()
    {
        return self::$b;
    }

    public static function getC()
    {
        return static::$c;
    }

    public static function getD()
    {
        return static::$d;
    }
}

class B extends A
{
    protected static $a = 2;
    private   static $b = 2;

    protected static $c = 2;
    private   static $d = 2;
}

echo B::getA();
echo B::getB();
echo B::getC();
echo B::getD();
```

```
Static properties defined ONLY in the parent class will share a COMMON value.
```
[参考](https://www.php.net/manual/zh/language.oop5.static.php#123105)
