# 部署指南

## Zeabur 部署配置

### 1. 环境变量配置

在 Zeabur 控制台中设置以下环境变量：

```bash
# 数据库配置（从 Zeabur 数据库服务获取）
DB_HOST=your-database-host
DB_PORT=3306
DB_USER=your-database-user
DB_PASSWORD=your-database-password
DB_NAME=poetry_db

# 服务器配置
NODE_ENV=production
PORT=3000
```

### 2. 数据库服务

在 Zeabur 中创建 MySQL 数据库服务：
1. 在项目中选择 "Add Service" -> "Database" -> "MySQL"
2. 记录数据库连接信息
3. 在应用服务中设置相应的环境变量

### 3. 部署步骤

1. 将代码推送到 GitHub 仓库
2. 在 Zeabur 中连接 GitHub 仓库
3. 选择此项目进行部署
4. 配置环境变量
5. 部署完成

### 4. 健康检查

应用包含健康检查端点：`/health`

### 5. API 文档

部署完成后，可以通过以下端点访问：
- API 文档：`https://your-app.zeabur.app/swagger`
- 健康检查：`https://your-app.zeabur.app/health`
- API 信息：`https://your-app.zeabur.app/api`
