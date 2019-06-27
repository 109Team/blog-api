### 基于nodejs编写Restful API	

___

#### 

####  0.  Restful API是什么

> RESTful的应用程序使用HTTP执行四种操作CRUD（C：create，R：read，U：update，D：delete）。Create和Update用来提交数据，get来读取数据，delete用来移除数据。
>
> RESTful由基本URL，URL，媒体类型等组成。
>
> ```javascript
> https://api.example.com/api/v1/
> https://api.example.com/api/v1/posts
> https://api.example.com/api/v1/posts/id
> ```
>
> 本次分享如何用Node.js创建REST风格的API

#### 1. 技术栈

> `Node.js` 、`Express`、`MongoDB`、

#### 2.项目目录结构

> ``` javascript
> .
> ├── app.config.js                         // 配置文件
> ├── app.js                                // 入口文件
> ├── global.js                             // 定义全局变量
> ├── bin                                   // 启动脚本
> │   └── www
> ├── common                                // 公共库
> │   ├── resHandle.js                      // -- 处理响应的公共方法
> │   └── util.js                           // -- 公共方法库
> ├── routes                                // 路由
> │   ├── filter.js                         // -- 路由拦截器， 处理所有路由
> │   └── index.js                          // -- 具体路由，处理转发
> ├── controllers                           // 控制层
> │   ├── postController.js
> │   └── testController.js
> ├── services                              // 数据服务层
> │   └── postService.js
> ├── models                                // 数据模型，用于ORM or OEM映射
> │   ├── PostModel.js
> │   ├── index.js
> │   └── testModel.js
> ├── core                                  // 核心库，包含日志服务，数据库连接服务，redis连接等
> │   ├── logger.js
> │   └── mongodb.js
> ├── middleware                            // 中间件
> │   ├── auth.js                           // -- 基于jwt的token验证 中间件
> │   └── request.js                        // -- 处理所有请求 中间件，中间可加入日志服务
> ├── swagger                               // API文档处理
> │   ├── swagger.js
> │   └── swagger.json
> └── views                                 // 模板渲染部分，可忽略
>     ├── error.ejs
>     └── index.ejs
> ```
>
> 

####3. 链路分析

> ```mermaid
> graph TD
> A[请求发起] --> B[filter]
> B[filter]  --> C[router]
> C[router] --> D{是否需要权限访问}
> D{是否需要权限访问} --> |是| E{权限验证中间件}
> D{是否需要权限访问} --> |否| F[对应controller]
> F[对应controller] --> G[对应数据service]
> G[对应数据service] --> H[resHandle]
> E{权限验证中间件} --> |通过|F[对应controller]
> E{权限验证中间件} --> |不通过|H[resHandle]
> ```
>
> 

#### 4. 开始搭建

##### 4.1 基础框架

> 1. 使用`Express`框架快速生成模板
>
>    ```javascript
>    $ npm install express-generator -g
>    $ express --view=ejs myapp
>    ```
>
> 2. 创建`controller`，`service`，`middleware`, `core`, `models`文件夹
>
> 3. 创建`app.config.js`全局配置文件
>
> 4. 创建`global.js`声明全局变量
>
>    ```javascript
>    $ npm install
>    
>    MacOS or Linux
>    DEBUG=blog-api:* npm start
>    
>    windows
>    set DEBUG=blog-api:* npm start
>    ```
>
> 5. 将配置声明为全局变量
>
>    **global.js**
>
>    ```javascript
>    const CONFIG = require('./app.config');
>    module.exports = () => {
>        global.CONFIG = CONFIG;
>    }
>    ```
>
> 6. 初始化全局变量
>
>    **app.js**
>
>    ```javascript
>    const initGlobal = require('./global');
>    ......
>    ......
>    initGlobal();
>    ```
>



##### 4.2 安装mongodb

> 1. 启动mongodb服务
>
> 2. node环境使用`mongoose`包驱动`MongoDB`数据库，`mongoose`是`MongoDB`的一个对象模型工具，封装了`MongoDB`对文档的的一些增删改查等常用方法，让`NodeJS`操作`Mongodb`数据库变得更加灵活简单
>
>    ``` javascript
>    $ npm install mongoose --save
>    ```
>
> 3. 创建数据库连接服务，在`core`目录下创建`mongodb.js`
>
>    ```javascript
>    const mongoose = require('mongoose');
>    
>    // 初始化mongoose
>    mongoose.set('useFindAndModify', false);
>    mongoose.Promise = global.Promise;
>    
>    exports.mongoose = mongoose;
>    exports.connect = () => {
>        mongoose.connect(CONFIG.MONGODB.uri, {
>            useNewUrlParser: true,
>            useCreateIndex: true,
>            promiseLibrary: global.Promise
>        }).then(
>            () => {
>                LOG.info(`mongoose connected with: ${CONFIG.MONGODB.uri}!`);
>            },
>            err => {
>                LOG.error(`mongoose connect error: ${err}`)
>            }
>        )
>    }
>    ```
>
> 4. 在入口文件中初始化数据库
>
>    **app.js**
>
>    ```javascript
>    const mongodb = require('./core/mongodb');
>    ......
>    ......
>    // 初始化数据库 mongodb
>    mongodb.connect();
>    ```

##### 4.3 路由处理

>1. 修改`routes/index.js`
>
>   ```javascript
>   const PostController = require('../controllers/postController');
>   
>   /**
>    * 统一路由处理
>    * @package {AUTH}          权限验证中间件
>    * @package {filter}        对所有请求拦截过滤
>    * @package {swaggerServer} 定义swagger路由
>    */
>   module.exports = app => {
>     const postControl = new PostController();
>     
>     // 获取文章列表，创建文章接口
>     app.route(`/${CONFIG.VERSION}/posts`)
>       .get((req, res) => {postControl.getAllPost(req, res)})
>   };
>   ```
>
>2. 初始化路由
>
>   ```javascript
>   const initRouter = require('./routes/index');
>   ......
>   ......
>   initRouter(app)
>   ```
>
>3. 现在我们已经可以捕获到这个路由了，接下来要做的是用对应的controller去处理路由

##### 4.4 添加controller

>1. 创建一个`postController.js`
>
>   ```javascript
>   const PostService = require('../services/postService');
>   
>   /**
>    * 文章控制器
>    */
>   class PostController {
>       constructor() {
>           this.postService = new PostService();
>       }
>   
>       // 获取所有文章，支持分页
>       getAllPost(req, res) {
>           let _pageSize = parseInt(req.query.pageSize) || 10,
>               _pageNum = parseInt(req.query.pageNum) || 1;
>   
>           let _options = {
>               skip: _pageNum - 1 <= 0 ? 0 : (_pageNum - 1) * _pageSize,
>               limit: _pageSize
>           }
>   
>           this.postService.find(null, null, _options)
>               .then(data => {
>                   resHandle(res, data, 200, '成功');
>               })
>               .catch(err => {
>                   resHandle(res, err);
>               })
>       }
>   
>   }
>   
>   module.exports = PostController;
>   ```

##### 4.5 添加数据服务层

> 1. 创建一个`postService.js`
>
>    ```javascript
>    const mongoose = require('mongoose');
>    /**
>     * 文章数据服务层
>     */
>    class PostService {
>        constructor(){
>            this.PostModel = mongoose.model('PostModel');
>        }
>    
>        /**
>         * 查询文章详情
>         * @param {object} conditions 查询条件
>         * @param {object} projection 映射， 需要显示的字段设置为1，不需要的设为0
>         * @param {object} options    其他项，如设置skip,limit等
>         */
>        find(conditions, projection, options){
>            return this.PostModel.find(conditions, projection, options);
>        }
>    }
>    
>    module.exports = PostService;
>    ```

##### 4.6 添加model

> `model` 是`Schema`的一个实例，具备操作数据库的方法，` Schema`是用于定义`MongoDB`中集合`Collection`里面文档`Document`的结构，可以理解为`mongoose`对表结构的定义(不仅仅可以定义文档的结构和属性，还可以定义文档的实例方法、静态模型方法、复合索引等)，每个`schema`会映射到`mongodb`中的一个`collection`，`schema`不具备操作数据库的能力,但实例话的`model` 可以操作数据库。
>
> 本例中，我们创建一个用于描述文章对象的`model`
>
> 1. 在`models`下创建一个`PostModel.js`
>
>    ```javascript
>    const mongoose = require('mongoose');
>    const Schema = mongoose.Schema;
>    
>    //class  Schema {
>        type: mongodb --- > Document -- > key  value  
>       find(){}
>       delete(){}
>    }
>    
>    let PostSchema = new Schema({
>        // 文章标题
>        title: {
>            type: String,
>            required: true,
>            validate: /\S+/
>        },
>    		......
>      	......
>        // 文章创建时间
>        create_time: {
>            type: Date,
>            default: Date.now()
>        }
>    });
>    
>    module.exports = mongoose.model('PostModel', PostSchema);
>    ```
>
> 2. 在`models`下创建一个`index.js`
>
>    ```javascript
>    // 导出所有模型
>    module.exports = () => {
>        require('./testModel');
>        require('./PostModel');
>    }
>    ```
>
> 3. 初始化模型
>
>    **app.js**
>
>    ```javascript
>    const initModel = require('./models/index');
>    ......
>    ......
>    // 初始化数据库 mongodb
>    mongodb.connect();
>    
>    // 初始化 model
>    initModel();
>    ```
>

现在我们可以手动在数据库中创建几条数据来验证我们的接口是否可以用

接下来我们还需要一个web界面来展示我们的接口文档，我们使用`swagger-ui-express`来处理这个问题

#### 4.6 添加swagger

> 1. 安装依赖包
>
>    ```javascript
>    $ npm install swagger-ui-express --save
>    ```
>
> 2. 创建`swagger/swagger.js`
>
>    ```javascript
>    const swaggerUi = require('swagger-ui-express');
>    
>    const swaggerDocument = require('./swagger.json');
>    
>    module.exports = () => {
>        return [swaggerUi.serve, swaggerUi.setup(swaggerDocument)];
>    }
>    ```
>
> 3. 在`swagger.json`编写接口文档， 也可以使用工具生成，也可以在[这里](http://editor.swagger.io/#/)编辑导出
>
> 4. 创建`swagger`路由，在`routes/index.js`中添加路由
>
>    ```javascript
>      const swaggerServer = require('../swagger/swagger');
>    	......
>      ......
>      // 重定向到swagger
>      app.route('/')
>        .get((req, res) => {
>          res.redirect('/api-docs');
>        });
>    	// API swagger
>      app.use('/api-docs', ...swaggerServer());
>    ```

现在我们打开`127.0.0.1:3000/api-docs`就可以看到接口文档了

##### 4.7 接口添加权限

> Restfull API 是无状态的， 我们使用[jwt](https://jwt.io/)为接口增加权限。
>
> **jwt（JSON web Token）**是一个字符串，由三部分组成： 头部`Header`,有效载荷`Paylod`,签名`signature`
>
> 头部（Header）里面说明类型和使用的算法, 使用`base64`加密：
>
> ```javascript
> {
>   "alg": "HS256",
>   "typ": "JWT"
> }
> // jwt类型，使用了hmac sha 算法
> ```
>
> **载荷（Payload）**载荷就是存放有效信息的地方,含三个部分:
>
> 1.标准中注册的声明
>
> ```javascript
> iss: jwt签发者
> sub: jwt所面向的用户
> aud: 接收jwt的一方
> exp: jwt的过期时间，这个过期时间必须要大于签发时间
> nbf: 定义在什么时间之前，该jwt都是不可用的.
> iat: jwt的签发时间
> jti: jwt的唯一身份标识，主要用来作为一次性token,从而回避重放攻击
> ```
>
> 2.公共的声明,私有的声明，自定义的，对称加密，不可存敏感信息
>
> ```javascript
> {
>   "_id": "yhsuaewe2323"
> }
> ```
>
> **signature** 是签证信息，该签证信息是通过`header`和`payload`，加上`secret`，通过算法加密生成。
>
> 公式 `signature = 加密算法(header + "." + payload, 密钥);`
>
> ```javascript
> const secret = 'secret';
> 
> const headerBuffer = Buffer.from(JSON.stringify({
>     "alg": "HS256",
>     "typ": "JWT"
> }));
> const header = headerBuffer.toString("base64");
> 
> const payloadBuffer = Buffer.from(JSON.stringify({
>     "_id": "yhsuaewe2323"
> }));
> const payload = payloadBuffer.toString("base64");
> 
> const crypto = require("crypto");
> 
> const signature = crypto.createHmac('sha256',secret)
>     .update(`${header}.${payload}`)
>     .digest('base64')
>     .replace(/=/g, '')
>     .replace(/\+/g, '-')
>     .replace(/\//g, '_')
> 
> console.log(`${header}.${payload}.${signature}`)
> 
> ```
>
> 我们使用`jsontokenweb`包来验签，进而来控制接口权限
>
> ```javascript
> $ npm install jsontokenweb --save
> ```
>
> 创建`middleware/auth.js`
>
> ```javascript
> const jwt = require('jsonwebtoken');
> 
> const resHandle = require('../common/resHandle');
> 
> module.exports = (req, res, next) => {
>     const _token = req.headers.authoriation;
>     if(!_token){
>         return resHandle(res, null, 403, '无权访问');
>     }
>     
>     jwt.verify(_token, CONFIG.JWTSECRET, (err, decode) => {
>         if(err){
>             return resHandle(res, err, 403, '无权访问');
>         }else{
>             req.user = decode;
>             return next();
>         }
>     })
> }
> ```
>
> 在`routes/index.js`中添加权限守卫
>
> ```javascript
> const AUTH = require('../middleware/auth');
> 
> app.route(`/${CONFIG.VERSION}/posts`)
>     .get(AUTH, (req, res) => {postControl.getAllPost(req, res)})
> ```

##### 4.8 增加日志处理

> 使用`log4js	`包处理日志，使用`log4js-logstash-tcp` 通过tcp方式将日志推送到`logstash`(elk)
>
> ```javascript
> const log4js = require('log4js');
> 
> const CONFIG = require('../app.config');
> 
> log4js.configure({
>     appenders: {
>         console: { type: "console" },
>         logstash: {
>             type: 'log4js-logstash-tcp',
>             host: CONFIG.LOGSTASH.host,
>             port: CONFIG.LOGSTASH.port,
>             fields: {
>                 instanceId: CONFIG.APPNAME || 'appName',
>                 appName: CONFIG.APPNAME
>             }
>         }
>     },
>     categories: {
>         default: { appenders: ['logstash', 'console'], level: 'debug' }
>         appjs
>     }
> });
> 
> module.exports = log4js.getLogger('default');
> 
> ```
>
> ```mermaid
> graph LR
> 应用 --> logger
> logger --> appenders
> logger --> console
> logger --> File
> logger --> SMTP
> logger --> logstash
> ```
>
> 这种方式存在的问题就是当elk服务挂掉的话，会出现部分日志丢失的问题，为此可以考虑加入kafka等消息中间件做代理层，或者退一步，当elk挂掉后将日志写入文件，elk重启后先读取丢失的文本日志，push到elk再转接elk
>
> http://116.62.56.222:5601/

####5 总结

> 目前我们的API服务整体框架搭建基本完成了， 包含了数据库连接服务，日志服务，API文档，后期还可以集成redis服务等等。：