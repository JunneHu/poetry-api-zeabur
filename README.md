# 诗句管理API系统

基于 Koa2 + MySQL2 + Swagger 构建的诗句管理系统，提供完整的诗句增删改查功能。

## 🚀 功能特性

- ✅ 诗句的增删改查操作
- ✅ 分页查询和条件筛选
- ✅ 全文搜索功能
- ✅ 朝代和作者列表获取
- ✅ 完整的 Swagger API 文档
- ✅ 数据库连接池管理
- ✅ 错误处理和日志记录
- ✅ 健康检查接口

## 📋 技术栈

- **框架**: Koa2
- **数据库**: MySQL2
- **API文档**: Swagger UI
- **数据验证**: Joi
- **其他**: dotenv, cors, body-parser

## 🛠️ 安装和运行

### 1. 克隆项目

```bash
git clone <your-repo-url>
cd poetry-api
```

### 2. 安装依赖

```bash
npm install
```

### 3. 配置数据库

1. 创建 MySQL 数据库：
```sql
CREATE DATABASE poetry_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

2. 修改 `config.env` 文件中的数据库配置：
```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=poetry_db
```

### 4. 启动服务

```bash
# 开发模式
npm run dev

# 生产模式
npm start
```

服务启动后访问：
- API服务: http://localhost:3000
- Swagger文档: http://localhost:3000/swagger
- 健康检查: http://localhost:3000/health

## 📚 API 接口文档

### 基础信息

- **Base URL**: `http://localhost:3000`
- **Content-Type**: `application/json`

### 诗句管理接口

#### 1. 创建诗句
```http
POST /api/poetry
Content-Type: application/json

{
  "title": "静夜思",
  "author": "李白",
  "dynasty": "唐",
  "content": "床前明月光，疑是地上霜。举头望明月，低头思故乡。",
  "translation": "明亮的月光洒在床前的窗户纸上，好像地上泛起了一层霜。",
  "notes": "这是一首写远客思乡之情的诗。",
  "tags": "思乡,月亮,夜晚"
}
```

#### 2. 获取诗句列表
```http
GET /api/poetry?page=1&limit=10&author=李白&dynasty=唐
```

#### 3. 获取诗句详情
```http
GET /api/poetry/{id}
```

#### 4. 更新诗句
```http
PUT /api/poetry/{id}
Content-Type: application/json

{
  "title": "静夜思",
  "author": "李白",
  "dynasty": "唐",
  "content": "床前明月光，疑是地上霜。举头望明月，低头思故乡。",
  "translation": "明亮的月光洒在床前的窗户纸上，好像地上泛起了一层霜。",
  "notes": "这是一首写远客思乡之情的诗。",
  "tags": "思乡,月亮,夜晚"
}
```

#### 5. 删除诗句
```http
DELETE /api/poetry/{id}
```

#### 6. 搜索诗句
```http
GET /api/poetry/search?keyword=明月&page=1&limit=10
```

#### 7. 获取朝代列表
```http
GET /api/poetry/dynasties
```

#### 8. 获取作者列表
```http
GET /api/poetry/authors
```

### 响应格式

所有接口都遵循统一的响应格式：

```json
{
  "success": true,
  "message": "操作成功",
  "data": {
    // 具体数据
  }
}
```

### 分页响应格式

```json
{
  "success": true,
  "data": {
    "list": [
      // 数据列表
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 100,
      "pages": 10
    }
  }
}
```

## 🗄️ 数据库结构

### poetry 表

| 字段名 | 类型 | 说明 | 约束 |
|--------|------|------|------|
| id | INT | 主键ID | AUTO_INCREMENT, PRIMARY KEY |
| title | VARCHAR(255) | 诗题 | NOT NULL |
| author | VARCHAR(100) | 作者 | NOT NULL |
| dynasty | VARCHAR(50) | 朝代 | NOT NULL |
| content | TEXT | 诗句内容 | NOT NULL |
| translation | TEXT | 译文 | NULL |
| notes | TEXT | 注释 | NULL |
| tags | VARCHAR(500) | 标签 | NULL |
| created_at | TIMESTAMP | 创建时间 | DEFAULT CURRENT_TIMESTAMP |
| updated_at | TIMESTAMP | 更新时间 | DEFAULT CURRENT_TIMESTAMP ON UPDATE |

## 🔧 开发说明

### 项目结构

```
poetry-api/
├── app.js                 # 主应用文件
├── package.json           # 项目配置
├── config.env            # 环境配置
├── config/               # 配置文件
│   ├── database.js       # 数据库配置
│   └── swagger.js        # Swagger配置
├── controllers/          # 控制器
│   └── poetryController.js
├── models/               # 数据模型
│   └── Poetry.js
├── routes/               # 路由
│   └── poetry.js
└── README.md            # 项目说明
```

### 添加新功能

1. 在 `models/` 中创建数据模型
2. 在 `controllers/` 中创建控制器
3. 在 `routes/` 中创建路由
4. 在 `app.js` 中注册路由
5. 添加 Swagger 文档注释

### 环境变量

| 变量名 | 说明 | 默认值 |
|--------|------|--------|
| DB_HOST | 数据库主机 | localhost |
| DB_PORT | 数据库端口 | 3306 |
| DB_USER | 数据库用户名 | root |
| DB_PASSWORD | 数据库密码 | - |
| DB_NAME | 数据库名 | poetry_db |
| PORT | 服务端口 | 3000 |
| NODE_ENV | 运行环境 | development |

## 🐛 常见问题

### 1. 数据库连接失败
- 检查 MySQL 服务是否启动
- 确认数据库配置信息正确
- 检查数据库用户权限

### 2. 端口被占用
- 修改 `config.env` 中的 `PORT` 配置
- 或者停止占用端口的进程

### 3. 依赖安装失败
- 使用 `npm cache clean --force` 清理缓存
- 删除 `node_modules` 重新安装

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📞 联系方式

如有问题，请通过以下方式联系：
- Email: support@example.com
- GitHub Issues: [项目Issues页面]
