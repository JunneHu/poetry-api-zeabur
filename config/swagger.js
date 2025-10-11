const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: '诗句管理API',
      version: '1.0.0',
      description: '基于Koa2+MySQL2+Swagger的诗句管理系统API文档',
      contact: {
        name: 'API Support',
        email: 'support@example.com'
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: '开发环境'
      },
      {
        url: 'https://api.example.com',
        description: '生产环境'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    tags: [
      {
        name: 'Poetry',
        description: '诗句相关操作'
      }
    ]
  },
  apis: ['./routes/*.js', './controllers/*.js'] // 扫描这些文件中的swagger注释
};

const specs = swaggerJSDoc(options);

module.exports = specs;
