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
            ['/', '首页'],
            ['/article/', '文章'],
            {
                title: '笔记',
                collapsable: false,
                children: [
                    ['/linux/note', 'linux'],
                    {
                        title: 'php',
                        collapsable: true,
                        children: [
                            ['/php/', '基本'],
                            ['/php/nginx', 'nginx'],
                            ['php/fpm', 'fpm'],
                            ['/php/xdebug', 'xdebug'],
                            ['/php/export_to_csv', 'CSV导出'],
                            ['/php/apache_bench', 'ApacheBench'],
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
                ]
            },
            {
                title: '读书笔记',
                collapsable: true,
                children: [
                    ['/book/high_performance_mysql', '高性能MySql'],
                    ['/book/modern_php', 'Mordern PHP'],
                ]
            },
            ['/repo/', '常用库'],
        ],
        lastUpdated: 'Last Updated',
    }
}