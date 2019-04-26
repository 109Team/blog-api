const mongoose = require('mongoose');
const PostModel = mongoose.model('PostModel');

const resHandle = require('../core/dbResHandle');


// 获取所有文章，支持分页
exports.getAllPost = (req, res) => {
    let _pageSize = parseInt(req.query.pageSize) || 10,
        _pageNum = parseInt(req.query.pageNum) || 1;
    
    let _options = {
        skip: _pageNum - 1 <= 0 ? 0 : (_pageNum - 1) * _pageSize,
        limit: _pageSize
    }
    
    PostModel.find(null, null, _options)
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

// 读取单个文章
exports.getPostById = (req, res) => {
    PostModel.findById(req.params.postId)
        .then(data => {
            resHandle(res, data, 200, '成功');
        })
        .catch(err => {
            resHandle(res, err);
        })
}

// 更新单个文章
exports.updatePostById = (req, res) => {
    PostModel.update({_id: req.params.postId}, req.body, {new: true})
        .then(data => {
            if(data.n === 1){
                resHandle(res, data, 200, '更新成功');
            }else{
                resHandle(res, data, 200, '文章不存在');
            }
        })
        .catch(err => {
            resHandle(res, err);
        })
}

//删除单个文章
exports.deletePostById = (req, res) => {
    PostModel.remove({_id: req.params.postId})
        .then(data => {
            if(data.n === 1){
                resHandle(res, data, 200, '删除成功');
            }else{
                resHandle(res, data, 200, '文章不存在');
            }
        })
        .catch(err => {
            resHandle(res, err);
        })
}
