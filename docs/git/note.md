## 项目准备使用git的两种情况

* 仓库已存在，本地不存在
```sh
git clone [url] [folder]
cd [folder]
touch README.md
git add README.md
git commit -m 'add README'
git push -u origin master
```

* 本地项目第一次使用
```sh
cd existing_folder
git init
git remote add origin [url]
git add .
git commit -m 'Initial commit'
git push -u origin master
```

## 回退并删除历史
```bash
# --hard选项会舍弃回退版本至今的修改
git reset --hard [commit_hash]
# 需要关闭origin分支的保护
git push origin HEAD --force
```

## 添加远程仓库
port默认为22可不指定  
`git remote add [alias-name] ssh://[user]@[ip]:[port]/data/git/sample.git`

## 服务器创建git仓库
[centos7.4开始废除 RSAAuthentication选项](https://www.cnblogs.com/Leroscox/p/9627809.html)
```bash
# 建立git用账号 (实际不应使用git作为用户名
useradd git
passwd git

# 创建裸仓库
mkdir /data/git && cd /data/git
git init --bare sample.git
chown -R git:git sample.git/

# 开启此三项打开RSA认证
# RSAAuthentication yes (centos7.4后无该选项)
# PubkeyAuthentication yes
# AuthorizedKeysFile .ssh/authorized_keys
vim /etc/ssh/sshd_config
systemctl restart sshd

# 添加公钥
mkdir /home/git/.ssh
vim /home/git/.ssh/authorized_keys
chown -R git:git /home/git/.ssh
chmod 700 /home/git/.ssh
chmod 600 /home/git/.ssh/authorized_keys

# 修改添加的git用户对应行为 git:x:1004:1004::/home/git:/usr/bin/git-shell
vim /etc/passwd
```

## 应用其他分支的commit
当前分支需要直接应用其他分支某次commit的代码时 在当前分支下可使用  
`git cherry-pick [commit_hash]`

## stash(贮存)相关命令

* `git stash` 贮存当前工作区，推荐和commit一样加入message `git stash save 'message'`
* `git stash pop` 应用并删除第一个stash
* `git stash apply` 应用指定stash且不会删除，默认应用 stash@{0} (亦可指定hash)
* `git stash list`
* `git stash drop stash@{0}` 删除指定stash (亦可指定hash)
* `git stash clear` 清除所有stash
* [参考](https://www.cnblogs.com/tocy/p/git-stash-reference.html)

## other

* 查找被忽略的文件 `git ls-files -v | grep '^h\ '`
* 查看某一文件历史 `git log --pretty=oneline [filename]`
* 使用github登录第三方网站时应特别注意授权范围scope的值 [参考](https://developer.github.com/apps/building-oauth-apps/understanding-scopes-for-oauth-apps/)
* 使用`--orphan`选项创建分支，不会继承当前分支，工作区为空 `git checkout --orphan gh-pages`