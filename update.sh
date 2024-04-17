# 将博客打包到 /docs 文件夹
hugo -d docs

# 推送代码到远程仓库
git add .
git commit -m "update"
git push origin hugo