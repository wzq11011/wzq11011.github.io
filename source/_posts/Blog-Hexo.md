---
title: Blog-Hexo
date: 2023-04-25 16:03:43
tags: Hexo
categories: Blog
---



# 1 Hexo 搭建



## 1.1 Macbook ClashX 终端代理

```shell
export https_proxy=http://127.0.0.1:7890 http_proxy=http://127.0.0.1:7890 all_proxy=socks5://127.0.0.1:7890
```



## 1.2 安装 Homebrew

```shell
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```



## 1.3 安装 node.js、git

```shell
brew install node git
```



## 1.4 安装 Hexo

```shell
npm install -g hexo-cli
```

## 1.5 初始化项目

在 Documents 目录下创建一个 blog 文件夹，使用 hexo 命令初始化

```shell
# ~/Documents
hexo init blog

# 将 hexo 编译生成 HTML 代码
hexo generate  # 简化命令：hexo g

# 在本地运行
hexo serve  # 简化命令：hexo s

# 安装远程部署插件
npm install hexo-deployer-git --save

# 远程部署
hexo deploy  # 简化命令：hexo d
```



远程部署到 Github Pages 需要更改根目录（~/Documents/blog）下的 _config.yml 文件

```yaml
# Deployment
## Docs: https://hexo.io/docs/one-command-deployment
deploy:
  type: git
  repo: git@github.com:wzq11011/wzq11011.github.io.git
  branch: master
```



这个地方会报错，需要将本地 git 公钥添加到 github 中。

## 1.6 同步源码

以上的部署只是将 blog/public 目录下的所有内容上传到 master 分支上，它们实际上是 hexo 编译生成的静态文件。如果要同步博客源码，可以新建一个 hexo 分支，使用 git 命令同步上传所有源码。

```shell
# git 命令

# 创建分支
git branch (branchname)

# 切换分支
git checkout (branchname)

# 合并分支
git merge


```







# 2 Hexo 优化





# 3 Hexo 插件记录



### 1





### 2







### 3





## 参考

1. [如何在 GitHub 上写博客？ - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/371995929)
2. [hexo插件推荐 - 给力经验分享 (glwsq.cn)](https://www.glwsq.cn/post/hexo-plugins/)
3. 
