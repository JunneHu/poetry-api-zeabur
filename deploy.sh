#!/bin/bash

# 部署脚本
echo "🚀 开始部署到 Zeabur..."

# 添加所有更改
git add .

# 提交更改
git commit -m "Fix database query parameter issue for Zeabur deployment"

# 推送到远程仓库
git push origin main

echo "✅ 部署完成！"
echo "📡 请检查 Zeabur 控制台中的部署状态"
