### CSV导出

* [简单CSV导出](https://segmentfault.com/a/1190000005366832)

* 但由于外文可能出现乱码 转成GBK并不普遍 参考知乎@林一二的[解释](https://www.zhihu.com/question/21869078) 考虑保持UTF-8并加入UTF8 BOM头

* [BOM头的解释](https://www.cnblogs.com/qinmengjiao123-123/p/8325646.html)、[PHP如何向CSV添加BOM](https://stackoverflow.com/questions/25686191/adding-bom-to-csv-file-using-fputcsv)

* 参考代码
    ```php
    $filename = 'sample.csv';
    header("Content-Disposition: attachment;filename=\"{$filename}\"");
    header('Content-Type: text/csv; charset=utf-8');
    header('Cache-Control: max-age=0');

    $fp = fopen('php://output', 'a');

    $headers = [
        '姓名',
        '电话号码',
        '身份证',
    ];

    $data = [
        [1, 2, '其他外文あいうえお'],
        [1, 2, 3],
        [1, 2, 3],
        [1, 2, 3],
        [1, 2, 3],
        [1, 2, 3],
        [1, 2, 3],
        [1, 2, 3],
        [1, 2, 3],
    ];

    // 由于是特殊字符 必须是双引号
    $BOM = "\xEF\xBB\xBF";
    fwrite($fp, $BOM);
    fputcsv($fp, $headers);

    $count = 0;
    $limit = 100;
    $length = count($data);

    for ($index = 0; $index < $length; $index++)
    {
        $count++;

        if ($count >= $limit)
        {
            ob_flush();
            flush();
            $count = 0;
        }

        fputcsv($fp, $data[$index]);
    }
    ```