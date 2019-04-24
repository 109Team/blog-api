const mongoose = require('mongoose');
const PostModel = mongoose.model('PostModel');

const resHandle = require('../core/dbResHandle');


// 获取所有文章，支持分页
exports.getAllPost = (req, res) => {
    
    PostModel.find({})
            .then(data => {
                resHandle(res, data, 200, '成功');
            })
            .catch(err => {
                resHandle(res, err);
            })
}


// 创建一个文章
exports.createAPost = (req, res) => {
    let _post = new PostModel(req.body);
    _post.save()
        .then(data => {
            resHandle(res, data, 200, '创建成功');
        })
        .catch(err => {
            resHandle(res, err);
        })
}