## 范式简述
* 第一范式： 每个字段为最小单位, 不可分割
* 第二范式： 有主键, 其他字段依赖于主键保证唯一性
* 第三范式： 消除传递依赖, 即消除冗余
* 第四范式： 消除多值依赖, 即一对多的情况时分表处理

## 远程访问账户

* 5.7及以下版本
```sql
# 第一个 * 对应 database，可指定database
# 第二个 * 对应 table，可指定table
# % 对应 ip，可指定具体ip
GRANT ALL PRIVILEGES ON *.* TO '[username]'@'%' IDENTIFIED BY '[password]';
FLUSH PRIVILEGES;
```

* 8.0+
```sql
# 先创建用户，其中 WITH mysql_native_password为加密plugin附加选项 可省
CREATE USER '[username]'@'%' IDENTIFIED [ WITH mysql_native_password ] BY '[password]';

# 授权
GRANT ALL PRIVILEGES ON *.* TO '[username]'@'%' WITH GRANT OPTION;
```

## 批量修改数据库表名
```sql
# 表前缀为prev的改成db_前缀
SELECT CONCAT
(
    'ALTER TABLE',
    table_name,
    ' RENAME TO db_',
    substring(table_name, 4),
    ';'
)
FROM 
    information_schema.tables
WHERE 
    table_name LIKE 'prev%';
```

## 关于5.7版本后子查询优化

* 子查询排序失效，但加上`LIMIT`有效
* 相关提问：[mysql如何先排序后group by](https://segmentfault.com/q/1010000011383702)、[排序失效加入LIMIT有效](https://segmentfault.com/q/1010000011303563/a-1020000011310865)
* [分析文章](https://www.cnblogs.com/ivictor/p/9281488.html)
* [示例leecode题目](https://leetcode-cn.com/problems/department-highest-salary/comments/)（可通过 `SELECT VERSION()` 查看版本信息，此处为5.7
    * 5.6及以前解答
    ```sql
    # 假设每个部门只有一个最高工资的职员
    SELECT
        d.Name AS Department,
        e.Name AS Employee,
        Salary
    FROM
        Department d
    INNER JOIN
    (
        SELECT
            Name,
            Salary,
            DepartmentId Id
        FROM
            Employee
        ORDER BY
            Salary DESC
        # 加入LIMIT可得正确结果
        # LIMIT 999999
    ) e
    ON
        d.Id = e.Id
    GROUP BY 
        d.Id
    ```

    * 5.7以上解答
    ```sql
    SELECT
        D.Name AS Department,
        E.Name AS Employee,
        E.Salary
    FROM
        Employee E
    INNER JOIN
        Department D
    ON
        E.DepartmentId = D.id
    INNER JOIN
    (
        SELECT
            DepartmentId Id,
            MAX(Salary) Salary
        FROM
            Employee
        GROUP BY
            DepartmentId
    ) tmp
    ON
        D.Id = tmp.Id
    WHERE
        E.Salary = tmp.Salary
    ```

## 关于自增主键
* 在**5.7**及之前 MyISAM与InnoDB对于自增主键有一定的差异 表现在：  
当最大主键变更时 MyISAM会重新确定当前AUTO_INCREMENT值，而InnoDB不变  
```sql
-- 举例说明
-- 假设此次INSERT后主键id为10
INSERT INTO user (name) VALUE ('Jane');
UPDATE user SET id=100 WHERE id=10;

-- 再次INSERT时 MyISAM本次的id为101 而InnoDB为11
INSERT INTO user (name) VALUE ('Tom');
```
* 8.0后 InnoDB行为已与MyISAM一致
* 使用docker测试
```sh
# docker pull mysql:8
# docker run --name mysql8.0 -e MYSQL_ROOT_PASSWORD=123456 -d mysql:8.0
# docker exec -ti mysql8.0 mysql -uroot -p
docker pull mysql:5.7
docker run --name mysql5.7 -e MYSQL_ROOT_PASSWORD=123456 -d mysql:5.7
docker exec -ti mysql5.7 mysql -uroot -p

CREATE DATABASE test;
USE test;
CREATE TABLE user (id INT(11) PRIMARY KEY AUTO_INCREMENT, name VARCHAR(20)) ENGINE=InnoDB;
# id 1 2 3
INSERT INTO user (name) VALUES ('mary'), ('jane'), ('tom');
UPDATE user SET id = 10000 WHERE id = 3;

# 5.7 id 4 5 6
# 8.0 id 10001 10002 10003
INSERT INTO user (name) VALUES ('mary'), ('jane'), ('tom');
SELECT * FROM user;
```

## other

* 秒级时间戳查询时的格式化 `DATE_FORMAT(FROM_UNIXTIME(column), '%Y-%m-%d %H:%i:%s')`
* JOIN字段名相同时可以使用USING简写 `JOIN b ON a.id = b.id` →→→ `JOIN b USING(id)`

* 8.0+ 版本默认加密plugin为 `caching_sha2_password`，一般可改为原来的 `mysql_native_password`  
在配置文件 `[mysqld]` 下添加 `default-authentication-plugin = mysql_native_password`即可

* `ORDER BY` 与 `GROUP BY` 同时使用时，`ORDER BY`应在 `GROUP BY` 之后  
`GROUP BY` 中出现的列应包含`ORDER BY`中的列

* 查询时添加自定义字段和值，如添加 column为point 值为1的列 `SELECT *, 1 AS point FROM table`

* [EXPLAIN使用分析](https://segmentfault.com/a/1190000008131735)

* `IFNULL()` 函数 `SELECT IFNULL([表达式或查询], [其他值/表达式]) AS result`

* `DATEDIFF()`函数 比较2个DATE类型的值, 结果为前一个日期减去后一个日期的天数
    ```sql
    # 值为-1
    SELECT DATEDIFF('2018-08-07', '2018-08-08')
    ```