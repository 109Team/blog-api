const mongoose = require('mongoose');
/**
 * 文章数据服务层
 */
class PostService {
    constructor(){
        this.PostModel = mongoose.model('PostModel');
    }

    /**
     * 查询文章详情
     * @param {object} conditions 查询条件
     * @param {object} projection 映射， 需要显示的字段设置为1，不需要的设为0
     * @param {object} options    其他项，如设置skip,limit等
     */
    find(conditions, projection, options){
        return this.PostModel.find(conditions, projection, options);
    }

    /**
     * 新建单个数据
     * @param {object} body 文章具体信息
     */
    save(body){
        let _body = new this.PostModel(body);
        return _body.save();
    }

    /**
     * 查找单个数据
     * @param {object} conditions 查询条件
     */
    findOne(conditions){
        return this.PostModel.findOne(conditions);
    }

    /**
     * 更新单个数据
     * @param {object} conditions  过滤条件
     * @param {object} body        新的值
     * @param {object} options     其他项配置
     */
    update(conditions, body, options){
        return this.PostModel.update(conditions, body, options);
    }

    /**
     * 删除单个数据
     * @param {object} conditions  过滤条件
     */
    delete(conditions){
        return this.PostModel.remove(conditions);
    }

    /**
     * 查询总数
     * @param {object} conditions 过滤条件
     */
    getCount(conditions){
        return this.PostModel.countDocuments(conditions);
    }
}

module.exports = PostService;