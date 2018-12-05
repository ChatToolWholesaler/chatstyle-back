const friendModel = require('../modules/friend');
const UserController=require('../controllers/user');
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
            //根据好友的名字找到好友
            //再找到id
            const passiveUser=await UserController.getUserIdByName(data.passiveAddName)
            console.log(passiveUser);
            //应该先判断,user_id,friend_id对是否存在数据库中:
            const existRelation = await friendModel.findRelationByPair(passiveUser.id,data.initiativeAddId)
            if(existRelation){
             //如果存在:不管是什么关系.数据库都不进行任何操作. 
                //黑名单:拒绝添加
                //好友:不需要添加
                //请求:不需要继续请求
            }else{
                const forfriend = {
                    user_id: passiveUser.id,
                    friend_id: data.initiativeAddId,
                    friendtype: 2//请求之后只是在请求列表里面.
                }
                //console.log(forfriend);
               await friendModel.create(forfriend);
            }
            //如果不存在:新建
           ctx.response.status = 200;
           ctx.body = statusCode.SUCCESS_200('好友请求发送成功')
        }
        //
        else if(parseInt(data.type)==1){//拉黑好友

            //根据好友的名字找到好友
            //再找到id
            const passiveUser=await UserController.getUserIdByName(data.passiveAddName)
            console.log(passiveUser);
            //应该先判断,user_id,friend_id对是否存在数据库中:
            const existRelation = await friendModel.findRelationByPair(data.initiativeAddId,passiveUser.id)
            if(existRelation){
             //如果存在:
                //更改(initid, passiveid).friendtype=1 为黑名单
                await friendModel.updateRelation(data.initiativeAddId,passiveUser.id,1)
                //更改(passiveid,initid ).friendtype=3 为陌生人
                await friendModel.updateRelation(passiveUser.id,data.initiativeAddId,3)
            }else{
                //如果不存在,数据库不进行任何操作.
                
            }
            //如果不存在:新建
           ctx.response.status = 200;
           ctx.body = statusCode.SUCCESS_200('拉黑成功')
       
        }
        else{
            ctx.response.status = 400;//错误的请求
            ctx.body = statusCode.ERROR_400()
        }
    }

    //软删除好友或 移除黑名单 type:0 删除好友,1 移除黑名单
    //0：好友，1：黑名单，2：请求列表，3：陌生人
    static async delete(ctx){
        const data=ctx.request.body;
        if(parseInt(data.type)==0)//删除好友
        {//friendtype设置为3
         //isdeleted 设置为1

        }
        else if(parseInt(data.type)==1){//移除黑名单
            //拉黑好友前需要进行是否是好友的判断，暂时没写。
            const foruser = {
                user_id: data.sourceId,
                friend_id: data.friendId,
                friendtype: 0
            }
            const forfriend = {
                user_id: data.friendId,
                friend_id: data.sourceId,
                friendtype: 0
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