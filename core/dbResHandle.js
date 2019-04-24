/**
 * dbResHandle 统一处理处理数据库操作Handle函数
 * @param {object} res  http response对象
 * @param {number} code 设置接口返回状态码
 * @param {string} msg  设置接口返回提示信息
 * @param {object} data 数据操作执行后promise返回的data数据
 */
module.exports = (res, data = null, code = 10000, msg = '太火爆了') => {
    // res 参数必传
    if(!res){
        console.error(`invalid caller, res argument is required!`);
        return;
    }

    // 打印错误日志
    if(code !== 200){
        console.error(`[ERROR]: ${data}`);
        data = null;
    }

    // 统一返回体格式
    let _resData = {code, msg, data};
    res.json(_resData)
}