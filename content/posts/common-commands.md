+++
title = 'Common Commands Record'
date = 2023-04-26T20:14:54+08:00
draft = true
+++

# 1 压缩、解压

> tar 参数含义

* -c：建立压缩档案
* -x：解压
* -t：查看内容
* -z：有 gzip 属性的
* -j：有 bz2 属性的
* -Z：有 compress 属性的
* -v：显示所有过程
* -f：使用档案名字。该参数为最后一个参数，后面只能接档案名字
* -O：将文件解开到标准输出

> 常用压缩和解压命令

压缩：

```shell
# 将目录里所有 jpg 文件打包成 jpg.tar
tar -cvf jpg.tar *.jpg

# 将目录里所有的 jpg 文件打包成 jpg.tar 后，使用 gzip 压缩，生成 jpg.tar.gz
tar -czvf jpg.tar.gz *.jpg

# 将目录内指定文件打包为 tar.bz2 形式
tar -cjvf jpg.tar.bz2 *.jpg
```



解压：

```shell
# 解压 tar 包
tar -xvf fileName.tar

# 解压 *.tar.gz 或者 *.tgz
tar -xzvf fileName.tar.gz

# 解压 tar.bz2
tar -xjvf fileName.tar.bz2

# 解压 rar
unrar e fileName.rar

# 解压 zip
unzip fileName.zip
```





参考：[(126条消息) linux tar 解压命令总结_Young_2717的博客-CSDN博客](https://blog.csdn.net/imyang2007/article/details/7634470)

