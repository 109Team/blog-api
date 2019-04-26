const filter = require('./filter');
const AUTH = require('../core/auth');
const CONFIG = require('../app.config');
const swaggerServer = require('../swagger/swagger');

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

  // 引入schema
  const testControl = require('../controllers/testController');
  const postControl = require('../controllers/postController');

  // APIs
  // 测试接口
  app.route(`/${CONFIG.VERSION}/test`)
    .get(testControl.testGetAll);

  // 获取文章列表，创建文章接口
  app.route(`/${CONFIG.VERSION}/posts`)
    .get(postControl.getAllPost)
    .post(AUTH, postControl.createAPost);

  // 修改文章和删除文章接口
  app.route(`/${CONFIG.VERSION}/post/:postId`)
    .get(postControl.getPostById)
    .put(AUTH, postControl.updatePostById)
    .delete(AUTH, postControl.deletePostById);
};