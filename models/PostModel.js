const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let PostModel = new Schema({
    // 文章标题
    title: {
        type: String,
        required: true,
        validate: /\S+/
    },

    // 关键字（SEO）
    keywards: {
        type: [
            {
                type: String,
                default: ''
            }
        ],
        default: []
    },

    // 作者
    author: {
        type: String,
        required: true,
        validate: /\S+/
    },

    // 文章描述
    desc: {
        type: String,
        default: ''
    },

    // 文章内容
    content: {
        type: String,
        default: ''
    },

    // 文章总字数
    words_count: {
        type: Number,
        default: 0
    },

    // 文章封面图
    img_url: {
        type: String,
        default: ''
    },

    // 文章类型 0: 普通文章， 1: 简历  2: 个人简介
    type: {
        type: Number,
        enum: [0, 1, 2],
        default: 0
    },

    // 文章状态： 0: 草稿， 1: 发布  2: 删除
    status: {
        type: Number,
        enum: [0, 1, 2],
        default: 1
    },

    // 文章出处 0: 原创  1: 转载
    origin: {
        type: Number,
        enum: [0, 1],
        default: 0
    },

    // 文章标签
    tags: {
        type: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Tag',
                required: true
            }
        ],
        default: []
    },

    // 文章评论
    comments: {
        type: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Comment',
                required: true
            }
        ],
        default: []
    },

    // 文章分类
    categrey: {
        type: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Categrey',
                required: true
            }
        ],
        default: []
    },

    // meta data 其他信息
    meta_data: {
        views: {
            type: Number,
            default: 0
        },
        likes: {
            type: Number,
            default: 0
        },
        unlikes: {
            type: Number,
            default: 0
        },
        comments: {
            type: Number,
            default: 0
        }
    },

    // 文章创建时间
    create_time: {
        type: Date,
        default: Date.now()
    },

    // 文章最后更新时间
    update_time: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('PostModel', PostModel);