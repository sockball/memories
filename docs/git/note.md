## 项目git初始化

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

## remote
```sh
# port默认为22可不指定
git remote add [alias-name] ssh://[user]@[ip]:[port]/data/git/sample.git
git remote remove [alias-name]
git remote set-url [alias-name] ssh://...
```

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
```sh
git cherry-pick [commit_hash]
```

## stash(贮存)相关命令

* `git stash` 贮存当前工作区，推荐和commit一样加入message `git stash save 'message'`
* `git stash pop` 应用并删除第一个stash
* `git stash apply` 应用指定stash且不会删除，默认应用 stash@{0} (亦可指定hash)
* `git stash list`
* `git stash drop stash@{0}` 删除指定stash (亦可指定hash)
* `git stash clear` 清除所有stash
* `git pull --rebase --autostash` pull 时即可自动 rebase + stash + stash pop
* [参考](https://www.cnblogs.com/tocy/p/git-stash-reference.html)

## tag相关命令

* `git tag` 查看所有 tag
* `git tag -a 'v0.1.0' -m '0.1.0'` 创建 v0.1.0 tag 并加上注释 0.1.0
* `git push origin v0.1.0` 推送指定 tag
* `git push --tags` 推送所有本地 tag
* `git tag -d v0.1.0` 删除某个分支

## checkout相关命令

* `git checkout [-b] new_branch` 切换(并创建) 分支
* `git checkout [commit] filename` 恢复指定文件到指定版本 默认为HEAD

## 服务端钩子

* **pre-receive**  
    处理客户端推送时首次被调用的脚本，以非0值退出时拒绝推送

* **update**  
    类似 **pre-receive**，为每个分支执行一次，以非0值退出时拒绝当前分支的更新

* **post-receive**  
    在整个过程结束后运行的脚本，用于自动部署(如自动拉取、自动打包等  
    该脚本不会终止推送，但在结束前都与客户端保持连接状态（如npm需打包完后才与客户端断开连接  
    要注意的是，需要保证推送时使用的用户应拥有**该脚本的执行权限**，以及**更新项目的权限**  
    脚本示例
    ```sh
    #!/bin/sh

    # 指定项目GIT后方可执行git相关命令
    GIT_DIR=/data/wwwroot/app/.git
    APP_PATH=/data/wwwroot/app/frontend

    git reset --hard
    git pull

    # 注意也要保证npm的执行权限...
    cd ${APP_PATH} && npm run build
    ```

* [官方参考](https://git-scm.com/book/zh/v2/%E8%87%AA%E5%AE%9A%E4%B9%89-Git-Git-%E9%92%A9%E5%AD%90)

## rebase
* pull时的自动合并后使用 `git rebase` 减少一条合并commit
* `git rebase` 解决冲突后使用 `git rebase --continue` 减少一条合并commit
* 交互式修改历史commit `git rebase -i HEAD~3` （HEAD~3 指修改最新至后2条commit？
* pull时即可自动rebase `git pull --rebase`  
也可全局配置 `git config --global pull.rebase true`
* [参考](https://baijiahao.baidu.com/s?id=1633418495146592435&wfr=spider&for=pc)

## other

* 查找被忽略的文件 `git ls-files -v | grep '^h\ '`
* 查看某一文件历史 `git log --pretty=oneline [filename]`
* 使用github登录第三方网站时应特别注意授权范围scope的值 [参考](https://developer.github.com/apps/building-oauth-apps/understanding-scopes-for-oauth-apps/)
* 使用 `--orphan` 选项创建分支，不会继承当前分支，工作区为空 `git checkout --orphan gh-pages`
* 删除已加入版本控制的文件 `git rm --cache filename`
* 显示指定commit的变更 `git show [commit_hash]`
* `git log --graph --pretty=oneline --abbrev-commit` (abbrev 缩写)
* 将本次提交添加至最近一次提交（会要求重新编辑一次commit内容）`git commit --amend`
* 直接提交所有修改的文件(不包括untracked files) `git commit -a -m 'update'`
* 关于 no fast forward 选项 `git merge --no-ff [branch]` [参考](https://backlog.com/git-tutorial/cn/stepup/stepup1_4.html)
* `git pull --allow-unrelated-histories` 允许无相关（无相同commit）项目的拉取