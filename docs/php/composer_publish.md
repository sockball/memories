### 简单发布个人composer包

1. 创建一个新目录并进入执行 `composer init`
    ```sh
    mkdir test && cd test
    composer init
    ```

    ```bash
    Welcome to the Composer config generator

    This command will guide you through creating your composer.json config.

    # 包名 用于区分其他包，一般为 creator/name 形式
    Package name (<vendor>/<name>) [sockball/test]: sockball/test

    # 包描述
    Description []: 一个composer测试包
    
    # 作者及邮件
    Author [sockball <sockball@yahoo.com>, n to skip]:

    # 最低包版本稳定性，从低到高依次为 dev、alpha、beta、RC、stable
    # 更多参考 http://webtips.krajee.com/setting-composer-minimum-stability-application/
    Minimum Stability []: stable

    # 包类型 参考 https://docs.phpcomposer.com/04-schema.html#type
    Package Type (e.g. library, project, metapackage, composer-plugin) []: library

    # 开源许可证类型
    License []: MIT

    Define your dependencies.

    # 交互指定必须的依赖，比如php，也可之后指定
    Would you like to define your dependencies (require) interactively [yes]? yes
    Search for a package: php
    Enter the version constraint to require (or leave blank to use the latest version): ~7.0

    # 交互指定仅开发时需要的依赖，比如 phpunit，也可之后指定
    Would you like to define your dependencies (require-dev) interactively [yes]? yes
    Search for a package: phpunit/phpunit
    Enter the version constraint to require (or leave blank to use the latest version): ~6.5.5

    # 确认
    Do you confirm generation [yes]? yes

    # 是否立即安装依赖
    Would you like to install dependencies now [yes]? no
    ```

2. 安装依赖
    ```bash
    # 生产环境应加入--no-dev选项
    composer intall
    ```
    加入 `autoload` 指定命名空间的映射关系  
    ```json
    {
        "name": "sockball/test",
        "description": "一个composer测试包",
        "type": "library",
        "require": {
            "php": "~7.0"
        },
        "require-dev": {
            "phpunit/phpunit": "~6.5.5"
        },
        "license": "MIT",
        "authors": [
            {
                "name": "sockball",
                "email": "sockball@yahoo.com"
            }
        ],
        "autoload": {
            "psr-4": {
                "sockball\\test\\": "src/"
            }
        }
    }
    ```

3. 撰写
    ```sh
    mkdir src && cd src
    touch Test.php
    ```

    ```php
    <?php
    namespace sockball\test;

    class Test
    {
        public function say(string $str)
        {
            echo $str;
        }
    }
    ```

4. 测试
    ```sh
    mkdir tests && cd tests
    touch test.php
    ```

    ```php
    <?php
    require_once __DIR__ . '/../vendor/autoload.php';
    use sockball\test\Test;

    $instance = new Test();
    $instance->say('hello world');
    ```
    运行测试 `php tests/test.php`

5. 其他文件
* `.gitignore`
    ```
    /vendor
    /composer.lock
    ```

* `README.md`
    ```markdown
    ## About
    一个composer测试包

    ## License
    [MIT](https://github.com/sockball/test/blob/master/LICENSE)
    ```

* `LICENSE` 可以在github创建库时选择许可证辅助生成

    ![](/img/LICENSE.png)

* 最终目录结构
    ```
    ├─test
    │  ├─src
    │  │  ├─Test.php
    │  ├─tests
    │  │  ├─test.php
    │  ├─.gitignore
    │  ├─composer.json
    │  ├─LICENSE
    │  └─README.md
    ```

6. 推送至github
    ```sh
    git init
    git add .
    git commit -m 'first version'
    git remote add origin git@github.com:sockball/test.git
    git push -u origin master

    # 标签版本号
    git tag -a 'v0.1.0' -m '0.1.0'
    git push origin v0.1.0
    ```

7. 提交至Packagist
* 使用github账号注册登录（自动更新包）
* 点击右上角菜单 Submit
* 输入 HTTPS 仓库地址 `https://github.com/sockball/test.git` 并 CHECK (检测是否符合要求以及查找相似包名)
* 确认后 Submit，得到Packagist包[地址](https://packagist.org/packages/sockball/test) （确认即从相似的包中寻找有无类似功能的包，尽量减少重复功能的包）

### 其他
* 本测试包github[地址](https://github.com/sockball/test)
* [包版本](https://docs.phpcomposer.com/01-basic-usage.html#Package-Versions)
* [composer.json 架构](https://docs.phpcomposer.com/04-schema.html)
* 参考：[开发 Composer 包详细步骤](https://www.jianshu.com/p/3b871acc6259)
