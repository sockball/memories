## warning: LF will be replaced by CRLF
* 环境：Windows
* 描述：编辑器Tab、Space混用, git add时提示
* 方案：正式环境为linux, 将所有CRLF转换为LF, 更改git配置 `git config --global core.autocrlf input`
* [参考](https://www.jianshu.com/p/450cd21b36a4)

## fatal: The remote end hung up unexpectedly
* 描述：项目或文件过大push失败
* 方案：增大postBuffer `git config --global http.postBuffer 524288000`
* [参考](https://stackoverflow.com/questions/6842687/the-remote-end-hung-up-unexpectedly-while-git-cloning)
