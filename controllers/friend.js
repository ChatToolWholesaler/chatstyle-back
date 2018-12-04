const friendModel = require('../modules/friend');
const jwt = require('jsonwebtoken');
const secret = require('../config/secret');
const bcrypt = require('bcryptjs');
const util = require('util')
const verify = util.promisify(jwt.verify)
const statusCode = require('../util/status-code')

class FriendController{
    //创建用户之间的关系：type:0 添加好友；1：拉黑
    //0：好友，1：黑名单，2：请求列表，3：陌生人
    static async create(ctx){
        const data=ctx.request.body;
        if(parseInt(data.type)==0)//添加好友请求
        {
            //添加好友前先判断是不是好友
            //判断是不是被对方拉黑了,如果是返回请求失败.
            const forfriend = {
                user_id: data.passiveAddId,
                friend_id: data.initiativeAddId,
                friendtype: 2
            }
            console.log(forfriend);
           await friendModel.create(forfriend);
           ctx.response.status = 200;
           ctx.body = statusCode.SUCCESS_200('好友请求发送成功')
        }
        //
        else if(parseInt(data.type)==1){//拉黑好友
            //拉黑好友前需要进行是否是好友的判断，暂时没写。
            const forblack = {
                user_id: data.initiativeAddId,
                friend_id: data.passiveAddId,
                friendtype: 1
            }
            await friendModel.create(forblack);
            ctx.response.status = 200;
            ctx.body = statusCode.SUCCESS_200('拉黑成功')
        }
        else{
            ctx.response.status = 400;//错误的请求
            ctx.body = statusCode.ERROR_400()
        }
    }

    //软删除好友或 移除黑名单 type:0 删除好友,1 移除黑名单
    static async delete(ctx){
        const data=ctx.request.body;
        if(parseInt(data.type)==0)//删除好友
        {
        }
        else if(parseInt(data.type)==1){//拉黑好友
            //拉黑好友前需要进行是否是好友的判断，暂时没写。
            const forblack = {
                user_id: data.initiativeAddId,
                friend_id: data.passiveAddId,
                friendtype: 1
            }
            await friendModel.create(forblack);
            ctx.response.status = 200;
            ctx.body = statusCode.SUCCESS_200('拉黑成功')
        }
        else{
            ctx.response.status = 400;//错误的请求
            ctx.body = statusCode.ERROR_400()
        }
    }
    
}

module.exports = FriendController