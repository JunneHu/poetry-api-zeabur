const Poetry = require('../models/Poetry');

class PoetryController {
  // 创建诗句
  static async createPoetry(ctx) {
    try {
      const { title, author, dynasty, content, translation, notes, tags } = ctx.request.body;

      // 验证必填字段
      if (!title || !author || !dynasty || !content) {
        ctx.status = 400;
        ctx.body = {
          success: false,
          message: '诗题、作者、朝代和内容为必填字段'
        };
        return;
      }

      const poetryId = await Poetry.create({
        title,
        author,
        dynasty,
        content,
        translation,
        notes,
        tags
      });

      ctx.status = 201;
      ctx.body = {
        success: true,
        message: '诗句创建成功',
        data: { id: poetryId }
      };
    } catch (error) {
      ctx.status = 500;
      ctx.body = {
        success: false,
        message: error.message
      };
    }
  }

  // 获取诗句详情
  static async getPoetryById(ctx) {
    try {
      const { id } = ctx.params;
      const poetry = await Poetry.findById(id);

      if (!poetry) {
        ctx.status = 404;
        ctx.body = {
          success: false,
          message: '诗句不存在'
        };
        return;
      }

      ctx.body = {
        success: true,
        data: poetry
      };
    } catch (error) {
      ctx.status = 500;
      ctx.body = {
        success: false,
        message: error.message
      };
    }
  }

  // 获取诗句列表
  static async getPoetryList(ctx) {
    try {
      const page = parseInt(ctx.query.page) || 1;
      const limit = parseInt(ctx.query.limit) || 10;
      const filters = {};

      // 构建过滤条件
      if (ctx.query.author) filters.author = ctx.query.author;
      if (ctx.query.dynasty) filters.dynasty = ctx.query.dynasty;
      if (ctx.query.title) filters.title = ctx.query.title;
      if (ctx.query.content) filters.content = ctx.query.content;

      // 添加调试信息
      console.log('查询参数:', { page, limit, filters });

      // 先尝试简单的查询
      try {
        const poetryList = await Poetry.findAll(page, limit, filters);
        const total = await Poetry.count(filters);

        ctx.body = {
          success: true,
          data: {
            list: poetryList,
            pagination: {
              page,
              limit,
              total,
              pages: Math.ceil(total / limit)
            }
          }
        };
      } catch (dbError) {
        console.error('数据库查询错误:', dbError);
        // 如果复杂查询失败，尝试简单查询
        const simpleList = await Poetry.findAll(1, 10, {});
        ctx.body = {
          success: true,
          data: {
            list: simpleList,
            pagination: {
              page: 1,
              limit: 10,
              total: simpleList.length,
              pages: 1
            }
          }
        };
      }
    } catch (error) {
      console.error('获取诗句列表错误:', error);
      ctx.status = 500;
      ctx.body = {
        success: false,
        message: `获取诗句列表失败: ${error.message}`
      };
    }
  }

  // 更新诗句
  static async updatePoetry(ctx) {
    try {
      const { id } = ctx.params;
      const updateData = ctx.request.body;

      // 检查诗句是否存在
      const existingPoetry = await Poetry.findById(id);
      if (!existingPoetry) {
        ctx.status = 404;
        ctx.body = {
          success: false,
          message: '诗句不存在'
        };
        return;
      }

      const success = await Poetry.update(id, updateData);
      if (success) {
        ctx.body = {
          success: true,
          message: '诗句更新成功'
        };
      } else {
        ctx.status = 400;
        ctx.body = {
          success: false,
          message: '诗句更新失败'
        };
      }
    } catch (error) {
      ctx.status = 500;
      ctx.body = {
        success: false,
        message: error.message
      };
    }
  }

  // 删除诗句
  static async deletePoetry(ctx) {
    try {
      const { id } = ctx.params;

      // 检查诗句是否存在
      const existingPoetry = await Poetry.findById(id);
      if (!existingPoetry) {
        ctx.status = 404;
        ctx.body = {
          success: false,
          message: '诗句不存在'
        };
        return;
      }

      const success = await Poetry.delete(id);
      if (success) {
        ctx.body = {
          success: true,
          message: '诗句删除成功'
        };
      } else {
        ctx.status = 400;
        ctx.body = {
          success: false,
          message: '诗句删除失败'
        };
      }
    } catch (error) {
      ctx.status = 500;
      ctx.body = {
        success: false,
        message: error.message
      };
    }
  }

  // 搜索诗句
  static async searchPoetry(ctx) {
    try {
      const { keyword } = ctx.query;
      const page = parseInt(ctx.query.page) || 1;
      const limit = parseInt(ctx.query.limit) || 10;

      if (!keyword) {
        ctx.status = 400;
        ctx.body = {
          success: false,
          message: '搜索关键词不能为空'
        };
        return;
      }

      const poetryList = await Poetry.search(keyword, page, limit);
      const total = await Poetry.count({ content: keyword });

      ctx.body = {
        success: true,
        data: {
          list: poetryList,
          pagination: {
            page,
            limit,
            total,
            pages: Math.ceil(total / limit)
          }
        }
      };
    } catch (error) {
      ctx.status = 500;
      ctx.body = {
        success: false,
        message: error.message
      };
    }
  }

  // 获取朝代列表
  static async getDynasties(ctx) {
    try {
      const dynasties = await Poetry.getDynasties();
      ctx.body = {
        success: true,
        data: dynasties
      };
    } catch (error) {
      ctx.status = 500;
      ctx.body = {
        success: false,
        message: error.message
      };
    }
  }

  // 获取作者列表
  static async getAuthors(ctx) {
    try {
      const authors = await Poetry.getAuthors();
      ctx.body = {
        success: true,
        data: authors
      };
    } catch (error) {
      ctx.status = 500;
      ctx.body = {
        success: false,
        message: error.message
      };
    }
  }
}

module.exports = PoetryController;
