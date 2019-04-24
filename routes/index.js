const swaggerServer = require('../swagger/swagger');
const CONFIG = require('../app.config');
module.exports = app => {

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

  // 文章接口
  app.route(`/${CONFIG.VERSION}/posts`)
    .get(postControl.getAllPost)
    .post(postControl.createAPost);
};