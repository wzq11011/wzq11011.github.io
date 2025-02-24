
## 主题

* 更新主题
```bash
# next8
git clone https://github.com/next-theme/hexo-theme-next.git next8

# butterfly
git clone -b master https://github.com/jerryc127/hexo-theme-butterfly.git themes/butterfly
npm install hexo-renderer-pug hexo-renderer-stylus

# matery
git clone https://github.com/blinkfox/hexo-theme-matery.git themes/matery

hexo clean && hexo g && hexo s
```


```bash
# 更换主题 Fluid ： https://hexo.fluid-dev.com/docs/start/#%E8%8E%B7%E5%8F%96%E6%9C%80%E6%96%B0%E7%89%88%E6%9C%AC

npm install --save hexo-theme-fluid

# 然后在博客目录下创建 _config.fluid.yml，将主题的 _config.yml (opens new window)内容复制过去。
# https://github.com/fluid-dev/hexo-theme-fluid/blob/master/_config.yml

# 方法二：下载 最新 release 版本 (opens new window)解压到 themes 目录，并将解压出的文件夹重命名为 fluid。

wget https://github.com/fluid-dev/hexo-theme-fluid/archive/refs/tags/v1.9.8.tar.gz

# 指定主题：_config.yml
```