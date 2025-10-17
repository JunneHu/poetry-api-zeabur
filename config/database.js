const mysql = require('mysql2/promise');
require('dotenv').config({ path: './config.env' });

// 数据库连接配置
const dbConfig = {
  host: process.env.DB_HOST || 'mysql',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'lOHhJ13t2UdG4zT7RXCbpe90S6V8B5qa',
  database: process.env.DB_NAME || 'zeabur',
  charset: 'utf8mb4',
  timezone: '+08:00'
};

// 创建连接池
const pool = mysql.createPool({
  ...dbConfig,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// 测试数据库连接
const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('✅ 数据库连接成功');
    connection.release();
    return true;
  } catch (error) {
    console.error('❌ 数据库连接失败:', error.message);
    return false;
  }
};

// 初始化数据库表
const initDatabase = async () => {
  try {
    const connection = await pool.getConnection();
    
    // 创建诗句表
    const createPoetryTable = `
      CREATE TABLE IF NOT EXISTS poetry (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL COMMENT '诗题',
        author VARCHAR(100) NOT NULL COMMENT '作者',
        dynasty VARCHAR(50) NOT NULL COMMENT '朝代',
        content TEXT NOT NULL COMMENT '诗句内容',
        translation TEXT COMMENT '译文',
        notes TEXT COMMENT '注释',
        tags VARCHAR(500) COMMENT '标签，用逗号分隔',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
        INDEX idx_author (author),
        INDEX idx_dynasty (dynasty),
        INDEX idx_title (title),
        FULLTEXT idx_content (content)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='诗句表';
    `;
    
    await connection.execute(createPoetryTable);
    console.log('✅ 数据库表初始化成功');
    
    connection.release();
  } catch (error) {
    console.error('❌ 数据库表初始化失败:', error.message);
    throw error;
  }
};

module.exports = {
  pool,
  testConnection,
  initDatabase
};
