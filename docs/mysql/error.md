## ERROR 1055 (42000)
* 全名：
    ```
    ERROR 1055 (42000): Expression #2 of SELECT list is not in GROUP
    BY clause and contains nonaggregated column '...' which
    is not functionally dependent on columns in GROUP BY clause; this
    is incompatible with sql_mode=only_full_group_by
    ```
* 描述：5.7版本后默认启用 `ONLY_FULL_GROUP_BY`，当 `SELECT` 列中未包含 `GROUP BY` 列时出现该错误
* [官方说明](https://dev.mysql.com/doc/refman/5.7/en/group-by-handling.html)
* 方案：
    * 使 `SELECT` 列包含 `GROUP BY` 列
    * 关闭 `ONLY_FULL_GROUP_BY`：  
    `SELECT @@sql_mode` 可查看当前模式，复制结果并去掉 `ONLY_FULL_GROUP_BY` 再写入配置文件的[mysqld]下即可
    ```
    sql_mode = STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION
    ```

## ERROR 1140 (42000)
* 全名：
    ```
    ERROR 1140 (42000): In aggregated query without GROUP BY, expression
    #1 of SELECT list contains nonaggregated column '...'; this
    is incompatible with sql_mode=only_full_group_by
    ```
* 描述：启用 `ONLY_FULL_GROUP_BY` 时，当查询包含聚合函数但未使用 `GROUP BY` 且在 `SELECT`、`HAVING`、`ORDER BY` 中出现非聚合列时出现该错误
* 方案：
    * 去除非聚合列
    * 对非聚合列使用 `ANY_VALUE()` 函数 （结果并不一定是想要的
    * 关闭 `ONLY_FULL_GROUP_BY`