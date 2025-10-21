const Router = require('koa-router');
const PoetryController = require('../controllers/poetryController');

const router = new Router({
  prefix: '/api/poetry'
});

/**
 * @swagger
 * components:
 *   schemas:
 *     Poetry:
 *       type: object
 *       required:
 *         - title
 *         - author
 *         - dynasty
 *         - content
 *       properties:
 *         id:
 *           type: integer
 *           description: 诗句ID
 *         title:
 *           type: string
 *           description: 诗题
 *         author:
 *           type: string
 *           description: 作者
 *         dynasty:
 *           type: string
 *           description: 朝代
 *         content:
 *           type: string
 *           description: 诗句内容
 *         translation:
 *           type: string
 *           description: 译文
 *         notes:
 *           type: string
 *           description: 注释
 *         tags:
 *           type: string
 *           description: 标签
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: 创建时间
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: 更新时间
 *     ApiResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           description: 请求是否成功
 *         message:
 *           type: string
 *           description: 响应消息
 *         data:
 *           type: object
 *           description: 响应数据
 */

/**
 * @swagger
 * /api/poetry:
 *   post:
 *     summary: 创建诗句
 *     tags: [Poetry]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - author
 *               - dynasty
 *               - content
 *             properties:
 *               title:
 *                 type: string
 *                 description: 诗题
 *               author:
 *                 type: string
 *                 description: 作者
 *               dynasty:
 *                 type: string
 *                 description: 朝代
 *               content:
 *                 type: string
 *                 description: 诗句内容
 *               translation:
 *                 type: string
 *                 description: 译文
 *               notes:
 *                 type: string
 *                 description: 注释
 *               tags:
 *                 type: string
 *                 description: 标签
 *     responses:
 *       201:
 *         description: 创建成功
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       400:
 *         description: 请求参数错误
 *       500:
 *         description: 服务器错误
 */
router.post('/', PoetryController.createPoetry);

/**
 * @swagger
 * /api/poetry/list:
 *   get:
 *     summary: 获取诗句列表
 *     tags: [Poetry]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: 页码
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: 每页数量
 *       - in: query
 *         name: author
 *         schema:
 *           type: string
 *         description: 作者筛选
 *       - in: query
 *         name: dynasty
 *         schema:
 *           type: string
 *         description: 朝代筛选
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: 诗题筛选
 *       - in: query
 *         name: content
 *         schema:
 *           type: string
 *         description: 内容筛选
 *     responses:
 *       200:
 *         description: 获取成功
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     list:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Poetry'
 *                     pagination:
 *                       type: object
 *                       properties:
 *                         page:
 *                           type: integer
 *                         limit:
 *                           type: integer
 *                         total:
 *                           type: integer
 *                         pages:
 *                           type: integer
 */
router.get('/list', PoetryController.getPoetryList);

/**
 * @swagger
 * /api/poetry/search:
 *   get:
 *     summary: 搜索诗句
 *     tags: [Poetry]
 *     parameters:
 *       - in: query
 *         name: keyword
 *         required: true
 *         schema:
 *           type: string
 *         description: 搜索关键词
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: 页码
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: 每页数量
 *     responses:
 *       200:
 *         description: 搜索成功
 *       400:
 *         description: 搜索关键词不能为空
 *       500:
 *         description: 服务器错误
 */
router.get('/search', PoetryController.searchPoetry);

/**
 * @swagger
 * /api/poetry/dynasties:
 *   get:
 *     summary: 获取朝代列表
 *     tags: [Poetry]
 *     responses:
 *       200:
 *         description: 获取成功
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     type: string
 */
router.get('/dynasties', PoetryController.getDynasties);

/**
 * @swagger
 * /api/poetry/authors:
 *   get:
 *     summary: 获取作者列表
 *     tags: [Poetry]
 *     responses:
 *       200:
 *         description: 获取成功
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     type: string
 */
router.get('/authors', PoetryController.getAuthors);

/**
 * @swagger
 * /api/poetry/getPoetryById:
 *   get:
 *     summary: 获取诗句详情
 *     tags: [Poetry]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 诗句ID
 *     responses:
 *       200:
 *         description: 获取成功
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Poetry'
 *       404:
 *         description: 诗句不存在
 *       500:
 *         description: 服务器错误
 */
router.get('/getPoetryById', PoetryController.getPoetryById);

/**
 * @swagger
 * /api/poetry/updatePoetry:
 *   post:
 *     summary: 更新诗句
 *     tags: [Poetry]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 诗句ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: 诗题
 *               author:
 *                 type: string
 *                 description: 作者
 *               dynasty:
 *                 type: string
 *                 description: 朝代
 *               content:
 *                 type: string
 *                 description: 诗句内容
 *               translation:
 *                 type: string
 *                 description: 译文
 *               notes:
 *                 type: string
 *                 description: 注释
 *               tags:
 *                 type: string
 *                 description: 标签
 *     responses:
 *       200:
 *         description: 更新成功
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       404:
 *         description: 诗句不存在
 *       500:
 *         description: 服务器错误
 */
router.post('/updatePoetry', PoetryController.updatePoetry);

/**
 * @swagger
 * /api/poetry/deletePoetry:
 *   post:
 *     summary: 删除诗句
 *     tags: [Poetry]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 诗句ID
 *     responses:
 *       200:
 *         description: 删除成功
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       404:
 *         description: 诗句不存在
 *       500:
 *         description: 服务器错误
 */
router.post('/deletePoetry', PoetryController.deletePoetry);

module.exports = router;
