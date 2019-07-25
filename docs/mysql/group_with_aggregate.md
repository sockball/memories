### 分组求最值测试

> 环境：mysql 8.0+  
  数据来源：[https://github.com/datacharmer/test_db](https://github.com/datacharmer/test_db)  
  测试表：salaries  
  数据量：2,838,426  
  测试目标：查询每个employee最高工资的所有信息

* 最佳通用方式： `耗时 ≈ 0.5s`
```sql
SELECT
    s.emp_no,
    s.salary,
    s.from_date,
    s.to_date
FROM
    salaries s,
    (
        SELECT
            emp_no,
            max(salary) max_salary
        FROM
            salaries
        GROUP BY
            emp_no
    ) tmp
WHERE
    s.emp_no = tmp.emp_no
AND
    s.salary = tmp.max_salary 
LIMIT
    10
```

* mysql 5.6 及以下常用方式改写：`耗时 ≈ 3s` <span class='info'>（子句不加LIMIT结果秒出，但是结果实则非期望值</span>
```sql
SELECT 
    *
FROM
(
    SELECT
        emp_no,
        salary,
        from_date,
        to_date
    FROM
        salaries
    ORDER BY
        emp_no,
        salary DESC
    LIMIT
        9999999
) tmp
GROUP BY
    emp_no
LIMIT
    10
```

* 秒出方案，实际受LIMIT影响，LIMIT越大耗时越长，LIMIT在15,000左右耗时约为 `0.5s`
```sql
SELECT
        s.emp_no,
        s.salary,
        s.from_date,
        s.to_date
FROM
    salaries s
WHERE
    salary =
    (
        SELECT
            MAX(salary)
        FROM
            salaries
        WHERE
            emp_no = s.emp_no
    )
LIMIT
    10
```

* `RANK()` 函数：`耗时 ≈ 2.7s`
```sql
SELECT
    emp_no,
    salary,
    from_date,
    to_date
FROM
(
    SELECT
        *,
        RANK() OVER(PARTITION BY emp_no ORDER BY salary DESC) row_num
    FROM
        salaries
) tmp
WHERE
    row_num < 2
LIMIT
    10
```

* `LAST_VALUE()` 函数方法一：`耗时 ≈ 5s`
```sql
SELECT
    emp_no,
    salary,
    from_date,
    to_date
FROM
(
    SELECT
        *,
        LAST_VALUE(salary) OVER(PARTITION BY emp_no ORDER BY salary) max_salary
    FROM
        salaries
) tmp
WHERE
    salary = max_salary
LIMIT
    10
```

* `LAST_VALUE()` 函数方法二：直接僵死
```sql
SELECT
    DISTINCT emp_no,
    LAST_VALUE(s.salary) OVER(PARTITION BY emp_no ORDER BY s.salary) salary,
    LAST_VALUE(from_date) OVER(PARTITION BY emp_no ORDER BY s.salary) from_date,
    LAST_VALUE(to_date) OVER(PARTITION BY emp_no ORDER BY s.salary) to_date
FROM
    salaries s
LIMIT
    10
```