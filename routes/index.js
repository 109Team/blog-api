const mongoose = require('mongoose');

const filter = require('./filter');
const AUTH = require('../core/auth');
const CONFIG = require('../app.config');
const swaggerServer = require('../swagger/swagger');

const PostController = require('../controllers/postController');

/**
 * 统一路由处理
 * @package {AUTH}          权限验证中间件
 * @package {filter}        对所有请求拦截过滤
 * @package {swaggerServer} 定义swagger路由
 */
module.exports = app => {
  // 初始化filter
  filter(app);

  // 重定向到swagger
  app.route('/')
    .get((req, res) => {
      res.redirect('/api-docs');
    });

  // API swagger
  app.use('/api-docs', ...swaggerServer());

  // 实例化controller
  const postControl = new PostController(mongoose);

  // APIs
  // 获取文章列表，创建文章接口
  app.route(`/${CONFIG.VERSION}/posts`)
    .get((req, res) => {postControl.getAllPost(req, res)})
    .post(AUTH, (req, res)=> {postControl.createAPost(req, res)});

  // 修改文章和删除文章接口
  app.route(`/${CONFIG.VERSION}/post/:postId`)
    .get((req, res) => {postControl.getPostById(req, res)})
    .put(AUTH, (req, res) => {postControl.updatePostById(req, res)})
    .delete(AUTH, (req, res) => {postControl.deletePostById(req, res)});
};