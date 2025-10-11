const { pool } = require('../config/database');

class Poetry {
  constructor(data) {
    this.id = data.id;
    this.title = data.title;
    this.author = data.author;
    this.dynasty = data.dynasty;
    this.content = data.content;
    this.translation = data.translation;
    this.notes = data.notes;
    this.tags = data.tags;
    this.created_at = data.created_at;
    this.updated_at = data.updated_at;
  }

  // 创建诗句
  static async create(poetryData) {
    try {
      const { title, author, dynasty, content, translation, notes, tags } = poetryData;
      const sql = `
        INSERT INTO poetry (title, author, dynasty, content, translation, notes, tags)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `;
      const [result] = await pool.execute(sql, [title, author, dynasty, content, translation, notes, tags]);
      return result.insertId;
    } catch (error) {
      throw new Error(`创建诗句失败: ${error.message}`);
    }
  }

  // 根据ID获取诗句
  static async findById(id) {
    try {
      const sql = 'SELECT * FROM poetry WHERE id = ?';
      const [rows] = await pool.execute(sql, [id]);
      return rows.length > 0 ? new Poetry(rows[0]) : null;
    } catch (error) {
      throw new Error(`获取诗句失败: ${error.message}`);
    }
  }

  // 获取所有诗句（分页）
  static async findAll(page = 1, limit = 10, filters = {}) {
    try {
      const offset = (page - 1) * limit;
      let sql = 'SELECT * FROM poetry WHERE 1=1';
      const params = [];

      // 添加过滤条件
      if (filters.author) {
        sql += ' AND author LIKE ?';
        params.push(`%${filters.author}%`);
      }
      if (filters.dynasty) {
        sql += ' AND dynasty = ?';
        params.push(filters.dynasty);
      }
      if (filters.title) {
        sql += ' AND title LIKE ?';
        params.push(`%${filters.title}%`);
      }
      if (filters.content) {
        sql += ' AND content LIKE ?';
        params.push(`%${filters.content}%`);
      }

      // 添加排序和分页
      sql += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
      params.push(parseInt(limit), parseInt(offset));

      console.log('SQL查询:', sql);
      console.log('查询参数:', params);

      const [rows] = await pool.execute(sql, params);
      return rows.map(row => new Poetry(row));
    } catch (error) {
      console.error('数据库查询错误:', error);
      throw new Error(`获取诗句列表失败: ${error.message}`);
    }
  }

  // 获取总数
  static async count(filters = {}) {
    try {
      let sql = 'SELECT COUNT(*) as total FROM poetry WHERE 1=1';
      const params = [];

      if (filters.author) {
        sql += ' AND author LIKE ?';
        params.push(`%${filters.author}%`);
      }
      if (filters.dynasty) {
        sql += ' AND dynasty = ?';
        params.push(filters.dynasty);
      }
      if (filters.title) {
        sql += ' AND title LIKE ?';
        params.push(`%${filters.title}%`);
      }
      if (filters.content) {
        sql += ' AND content LIKE ?';
        params.push(`%${filters.content}%`);
      }

      const [rows] = await pool.execute(sql, params);
      return rows[0].total;
    } catch (error) {
      throw new Error(`获取诗句总数失败: ${error.message}`);
    }
  }

  // 更新诗句
  static async update(id, updateData) {
    try {
      const fields = [];
      const values = [];

      Object.keys(updateData).forEach(key => {
        if (updateData[key] !== undefined) {
          fields.push(`${key} = ?`);
          values.push(updateData[key]);
        }
      });

      if (fields.length === 0) {
        throw new Error('没有要更新的字段');
      }

      values.push(id);
      const sql = `UPDATE poetry SET ${fields.join(', ')} WHERE id = ?`;
      const [result] = await pool.execute(sql, values);
      
      return result.affectedRows > 0;
    } catch (error) {
      throw new Error(`更新诗句失败: ${error.message}`);
    }
  }

  // 删除诗句
  static async delete(id) {
    try {
      const sql = 'DELETE FROM poetry WHERE id = ?';
      const [result] = await pool.execute(sql, [id]);
      return result.affectedRows > 0;
    } catch (error) {
      throw new Error(`删除诗句失败: ${error.message}`);
    }
  }

  // 搜索诗句（全文搜索）
  static async search(keyword, page = 1, limit = 10) {
    try {
      const offset = (page - 1) * limit;
      const sql = `
        SELECT * FROM poetry 
        WHERE MATCH(content) AGAINST(? IN NATURAL LANGUAGE MODE)
        OR title LIKE ? OR author LIKE ?
        ORDER BY created_at DESC
        LIMIT ? OFFSET ?
      `;
      const searchTerm = `%${keyword}%`;
      const [rows] = await pool.execute(sql, [keyword, searchTerm, searchTerm, parseInt(limit), parseInt(offset)]);
      return rows.map(row => new Poetry(row));
    } catch (error) {
      throw new Error(`搜索诗句失败: ${error.message}`);
    }
  }

  // 获取所有朝代
  static async getDynasties() {
    try {
      const sql = 'SELECT DISTINCT dynasty FROM poetry ORDER BY dynasty';
      const [rows] = await pool.execute(sql);
      return rows.map(row => row.dynasty);
    } catch (error) {
      throw new Error(`获取朝代列表失败: ${error.message}`);
    }
  }

  // 获取所有作者
  static async getAuthors() {
    try {
      const sql = 'SELECT DISTINCT author FROM poetry ORDER BY author';
      const [rows] = await pool.execute(sql);
      return rows.map(row => row.author);
    } catch (error) {
      throw new Error(`获取作者列表失败: ${error.message}`);
    }
  }
}

module.exports = Poetry;
