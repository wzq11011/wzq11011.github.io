| 更换 hexo 为 hugo，hexo 中 next 主题的文章预览一眼难尽。要么全文预览（很蠢）、要么设置摘要（麻烦）、要么手动截断文章一部分作为预览（麻烦）。我想要的是自动截取一段长度（例如150词）作为预览。

references: 

[手把手教你从0开始搭建自己的个人博客 |第二种姿势 | hugo_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1q4411i7gL/?spm_id_from=333.337.search-card.all.click&vd_source=d23a575a65d23de067b1179034802bb8)

[使用 Hugo + Github 搭建个人博客 - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/105021100)



# 1 hugo 安装

在 mac 上配置：

```bash
# 安装
brew install hugo

# 查看版本
hugo version

# 创建 blog 目录
cd Documents
hugo new site hugoBlog

# 添加主题
cd hugoBlog
git init  # 在当前目录下初始化一个新的 Git 仓库
git submodule add https://github.com/adityatelange/hugo-PaperMod.git themes/paperMod

# 更改主题：根目录下的 config.toml 文件
cho 'theme = "paperMod"' >> config.toml

# 新建一篇文章
hugo new posts/my-first-post.md

# 启动 Hugo 服务器
hugo server -D
```

