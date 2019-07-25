## 安装brew
```sh
# 地址较长 "\"仅用于换行 实为一条命令
/usr/bin/ruby -e \
"$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```
* [参考](https://blog.csdn.net/fxp850899969/article/details/53284193)

## 编译安装php扩展
* 环境：MAMP
* 依赖：扩展、同版本php源码包，本例php为7.1.12
```bash
# 只有此处会用到源码包
/源码包目录/configure

cd /扩展目录
# MAMP下的php
/Applications/MAMP/bin/php/php7.1.12/bin/phpize
./configure --with-php-config=/Applications/MAMP/bin/php/php7.1.12/bin/php-config
make && make install
```
* 相关链接：[扩展集合](http://pecl.php.net/)、[php源码包](http://php.net/releases/)
* [参考redis扩展安装](https://blog.csdn.net/u013332865/article/details/49638923)

## NTFS分区的可写挂载
* 主要用于NTFS格式的U盘或移动硬盘
* 通过磁盘工具找到硬盘的设备名 此处为 `disk4s2`
```bash
# unmount 或选择推出
sudo umount /Volumes/disk4s2

# 目录名可任意起
sudo mkdir /Volumes/myNTFS
sudo mount -t ntfs -o rw,auto,nobrowse /dev/disk4s2 /Volumes/myNTFS/

# 或做一个软连接到桌面 sudo ln -s /Volumes/myNTFS/ ~/Desktop/myNTFS
open /Volumes/myNTFS
```
* [参考](https://www.cnblogs.com/thatsit/p/6218117.html)

## other

* 对于Mac认为已损坏的文件，终端使用命令`sudo spctl --master-disable`信任所有来源后再打开即可