module.exports = {
    title: 'Memories', 
    description: 'note',
    head: [
        ['link', { rel: 'icon', href: '/img/favicon.png' }],
        ['link', { rel: 'stylesheet', href: '/css/common.css' }],
        // ['link', { rel: 'manifest', href: '/manifest.json' }],
    ],
    themeConfig: {
        nav: [
            { text: 'Home', link: '/' },
            { text: 'Github', link: 'https://github.com/sockball/memories' },
            { text: 'Twitter', link: 'https://twitter.com/yuzu_hime07' },
        ],
        sidebar: [
            ['/changelog/', 'CHANGELOG'],
            ['/', '首页'],
            ['/article/', '文章'],
            {
                title: '笔记',
                collapsable: true,
                children: [
                    ['/linux/note', 'linux'],
                    {
                        title: 'php',
                        collapsable: true,
                        children: [
                            ['/php/', '基本'],
                            ['/php/nginx', 'nginx'],
                            ['/php/redis', 'redis'],
                            ['php/fpm', 'fpm'],
                            ['/php/xdebug', 'xdebug'],
                            ['/php/export_to_csv', 'CSV导出'],
                            ['/php/apache_bench', 'ApacheBench'],
                            ['/php/wx_test', '微信测试公众号接入'],
                            ['/php/composer_publish', '简单发布个人composer包'],
                            ['/php/php_yield', 'PHP yield'],
                            ['/php/static_and_inherit', '静态修饰符static与继承'],
                            ['/php/interview', '面试'],
                        ]
                    },
                    {
                        title: 'mysql',
                        collapsable: true,
                        children: [
                            ['/mysql/', '基本'],
                            ['/mysql/8.0_install', '8.0.13二进制包安装流程'],
                            ['mysql/group_with_aggregate', '分组求最值测试'],
                            ['/mysql/8.0_new', '窗口函数与通用表表达式'],
                        ]
                    },
                    ['/js/note', 'js'],                    
                    ['/git/note', 'git'],
                    ['/docker/note', 'docker'],
                    ['/mac/note', 'mac'],
                    ['/other/note', 'other'],
                ]
            },
            {
                title: '错误收集',
                collapsable: true,
                children: [
                    ['/mysql/error', 'mysql'],
                    ['/git/error', 'git'],
                    ['/php/error', 'php'],
                    ['/linux/error', 'linux'],
                    ['/python/error', 'python'],
                ]
            },
            {
                title: '读书笔记',
                collapsable: true,
                children: [
                    ['/book/high_performance_mysql', '高性能MySql'],
                    ['/book/modern_php', 'Mordern PHP'],
                    ['/book/weixi_python', '魏曦Python基础'],
                    ['/book/weixi_python_oop', '魏曦Python面向对象开发'],
                    {
                        title: '廖雪峰Python教程',
                        collapsable: true,
                        children: [
                            ['/book/liaoxuefeng_python/1', 'Part I'],
                            ['/book/liaoxuefeng_python/2', 'Part II'],
                            ['/book/liaoxuefeng_python/3', 'Part III'],
                            ['/book/liaoxuefeng_python/4', 'Part IV'],
                            ['/book/liaoxuefeng_python/5', 'Part V'],
                        ],
                    },
                    ['/book/php_docs', 'PHP手册'],
                    {
                        title: 'Linux高性能服务器编程',
                        collapsable: true,
                        children: [
                            ['/book/high_performance_linux_server_programming/1', '第1章 TCP/IP协议族'],
                            ['/book/high_performance_linux_server_programming/2', '第2章 IP协议详解'],
                            ['/book/high_performance_linux_server_programming/3', '第3章 TCP协议详解'],
                            ['/book/high_performance_linux_server_programming/4', '第4章 TCP/IP通信案例'],
                            ['/book/high_performance_linux_server_programming/5-7', '第5-7章'],
                            ['/book/high_performance_linux_server_programming/8', '第8章 高性能服务器程序框架'],
                        ],
                    },
                ]
            },
            {
                title: '语言',
                collapsable: true,
                children: [
                    ['/language/accel_world_22', 'アクセル·ワールド 22'],
                    ['/language/Deathly_Hollows_Part_II', 'Deathly.Hollows.Part.II'],
                    ['/language/accel_world_23', 'アクセル·ワールド 23'],
                ]
            },
            ['/repo/', '常用库'],
            {
                title: 'Leetcode',
                collapsable: true,
                children: [
                    ['/leetcode/self', 'self'],
                    ['/leetcode/best', 'best'],
                ],
            },
            {
                title: 'DEMO',
                collapsable: true,
                children: [
                    ['/demo/gojs', 'GoJS'],
                    ['/demo/constant_width', 'calc等宽分配'],
                ]
            },
        ],
        lastUpdated: 'Last Updated',
    }
}