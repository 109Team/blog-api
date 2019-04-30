class PostService {
    constructor(mongoose){
        this.PostModel = mongoose.model('PostModel');
    }

    // 查找
    find(conditions, projection, options){
        return this.PostModel.find(conditions, projection, options);
    }

    // 新建
    save(body){
        let _body = new this.PostModel(body);
        return _body.save();
    }

    //查找单个
    findOne(conditions){
        return this.PostModel.findOne(conditions);
    }

    //更新单个
    update(conditions, body, options){
        return this.PostModel.update(conditions, body, options);
    }

    // 删除单个
    delete(conditions){
        return this.PostModel.remove(conditions);
    }
}

module.exports = PostService;