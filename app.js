const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const cors = require('koa-cors');
const serve = require('koa-static');
const { koaSwagger } = require('koa2-swagger-ui');
const swaggerSpec = require('./config/swagger');
const { testConnection, initDatabase } = require('./config/database');

// 导入路由
const poetryRoutes = require('./routes/poetry');

const app = new Koa();
const router = new Router();

// 中间件配置
app.use(cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept']
}));

app.use(bodyParser({
  enableTypes: ['json', 'form', 'text'],
  jsonLimit: '10mb',
  formLimit: '10mb',
  textLimit: '10mb'
}));

// 错误处理中间件
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = {
      success: false,
      message: err.message || '服务器内部错误'
    };
    console.error('Error:', err);
  }
});

// 请求日志中间件
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// 健康检查接口
router.get('/health', async (ctx) => {
  ctx.body = {
    success: true,
    message: '服务运行正常',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  };
});

// API信息接口
router.get('/api', async (ctx) => {
  ctx.body = {
    success: true,
    message: '诗句管理API',
    version: '1.0.0',
    endpoints: {
      poetry: '/api/poetry',
      swagger: '/swagger',
      health: '/health'
    }
  };
});

// 注册路由
router.use(poetryRoutes.routes(), poetryRoutes.allowedMethods());

// Swagger文档路由
router.get('/swagger', koaSwagger({
  routePrefix: '/swagger',
  swaggerOptions: {
    url: '/swagger.json'
  }
}));
router.get('/swagger.json', async (ctx) => {
  ctx.set('Content-Type', 'application/json');
  ctx.body = swaggerSpec;
});

// 静态文件服务
app.use(serve('public'));

// 应用路由
app.use(router.routes());
app.use(router.allowedMethods());

// 404处理
app.use(async (ctx) => {
  ctx.status = 404;
  ctx.body = {
    success: false,
    message: '接口不存在'
  };
});

// 启动服务器
const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    // 测试数据库连接
    console.log('🔍 正在测试数据库连接...');
    const dbConnected = await testConnection();
    
    if (!dbConnected) {
      console.error('❌ 数据库连接失败，请检查配置');
      process.exit(1);
    }

    // 初始化数据库表
    console.log('🔧 正在初始化数据库表...');
    await initDatabase();

    // 启动服务器
    app.listen(PORT, '0.0.0.0', () => {
      console.log('🚀 服务器启动成功!');
      console.log(`📡 服务地址: http://0.0.0.0:${PORT}`);
      console.log(`📚 API文档: http://0.0.0.0:${PORT}/swagger`);
      console.log(`❤️  健康检查: http://0.0.0.0:${PORT}/health`);
      console.log(`📋 API信息: http://0.0.0.0:${PORT}/api`);
      console.log(`🌍 环境: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (error) {
    console.error('❌ 服务器启动失败:', error.message);
    process.exit(1);
  }
};

// 优雅关闭
process.on('SIGINT', () => {
  console.log('\n🛑 正在关闭服务器...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n🛑 正在关闭服务器...');
  process.exit(0);
});

// 启动应用
startServer();

module.exports = app;
