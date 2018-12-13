const friendModel = require("../modules/friend");
const ProfileController = require('../controllers/profile')
const UserController = require("../controllers/user");
const jwt = require("jsonwebtoken");
const secret = require("../config/secret");
const bcrypt = require("bcryptjs");
const util = require("util");
const verify = util.promisify(jwt.verify);
const statusCode = require("../util/status-code");

class FriendController {
  //创建用户之间的关系：type:0 添加好友；1：拉黑
  //0：好友，1：黑名单，2：请求列表，3：陌生人
  static async create(ctx) {
    const data = ctx.request.body;
    if (parseInt(data.type) == 0) {
      //添加好友请求
      //根据好友的名字找到好友
      //再找到id
      const passiveUser = await UserController.getUserById(
        data.passiveAddId
      );
      console.log(passiveUser);
      //应该先判断,user_id,friend_id对是否存在数据库中:
      const existRelation = await friendModel.findRelationByPair(
        passiveUser.id,
        data.initiativeAddId
      );
      if (existRelation) {
        //如果存在：陌生人关系可以继续请求! stone==1 
        if (existRelation.friendtype == 3) {
          //更新friendtype=2,变为对方的请求列表
          await friendModel.updateRelation(
            passiveUser.id,
            data.initiativeAddId,
            2
          );
          ctx.response.status = 200;
          ctx.body = statusCode.SUCCESS2_200();
        }
        //如果存在:非陌生人关系.数据库都不进行任何操作.
        //黑名单:拒绝添加
        //好友:不需要添加
        //请求:不需要继续请求
        else {
          ctx.response.status = 200;
          ctx.body = statusCode.ERROR_400();
        }
      } else {//如果不存在:新建关系 //stone==1
        const forfriend = {
          user_id: passiveUser.id,
          friend_id: data.initiativeAddId,
          friendtype: 2 //请求之后只是在请求列表里面.
        };
        //console.log(forfriend);
        await friendModel.create(forfriend);
        ctx.response.status = 200;
        ctx.body = statusCode.SUCCESS2_200();
      }
    }
    //
    else if (parseInt(data.type) == 1) {
      //拉黑好友
      //根据好友的名字找到好友
      //再找到id
      const passiveUser = await UserController.getUserById(
        data.passiveAddId
      );
      //console.log(passiveUser);
      //应该先判断,user_id,friend_id对是否存在数据库中:
      const existRelation = await friendModel.findRelationByPair(
        data.initiativeAddId,
        passiveUser.id
      );
      if (existRelation) {
        //如果存在:
        //如果是好友关系
        //更改(initid, passiveid).friendtype=1 为黑名单
        //更改( passiveid,initid).friendtype=3 为陌生人

        //修改：不管是什么关系,拉黑就直接拉黑.尽量减少不必要的错误.
        //if (existRelation.friendtype == 0) {
          await friendModel.updateRelation(
            data.initiativeAddId,
            passiveUser.id,
            1
          );
          await friendModel.updateRelation(
            passiveUser.id,
            data.initiativeAddId,
            3
          );
          ctx.response.status = 200;
          ctx.body = statusCode.SUCCESS2_200();
        // } else {
        //   //如果不是好友关系
        //   //不进行任何操作
        //   //返回这是错误的请求
        //   ctx.response.status = 200;
        //   ctx.body = statusCode.ERROR_400();
        // }
      } else {
        //如果不存在,数据库不进行任何操作.
        //如果不存在,也应该可以进行拉黑.
        // ctx.response.status = 200;
        // ctx.body = statusCode.ERROR_400();
        const forblack = {
          user_id: data.initiativeAddId,
          friend_id: passiveUser.id,
          friendtype: 1 //黑名单
        };
        //console.log(forfriend);
        await friendModel.create(forblack);
        ctx.response.status = 200;
        ctx.body = statusCode.SUCCESS2_200();

      }
    } else {
      ctx.response.status = 200; //错误的请求
      ctx.body = statusCode.ERROR_400();
    }
  }

  //软删除好友或 移除黑名单 type:0 删除好友,1 移除黑名单
  //0：好友，1：黑名单，2：请求列表，3：陌生人
  static async delete(ctx)
  {
    const getdata = ctx.request.body;
    const friend = await UserController.getUserById(getdata.passiveAddId);
    const friendId = friend.id;
    const existRelation1 = await friendModel.findRelationByPair(
      getdata.initiativeAddId,
      friendId
    );
    const existRelation2 = await friendModel.findRelationByPair(
      friendId,
      getdata.initiativeAddId
    );
    //删除或者拉黑好友之前,需要先进行是否是好友的判断
    //两个人必须得先是好友关系
    if (!existRelation1) {
      //测试成功
      //数据库不做任何操作
      //判断该请求是错误的请求
      ctx.response.status = 200; //错误的请求
      ctx.body = statusCode.ERROR_400();
    } else {
      if (parseInt(getdata.type) == 0) {
        //删除好友
        //friendtype设置为3,双方的friendType都设置为3
        await friendModel.updateRelation(getdata.initiativeAddId, friendId, 3);
        ctx.response.status = 200; //测试
        ctx.body = statusCode.test("更新好友1成功");
        if (existRelation2) {
          //防止存在B是A的好友,但是A不是B的好友的数据库错误.
            await friendModel.updateRelation(
            friendId,
            getdata.initiativeAddId,
            3
          );
        } else {
          //为了防止那种错误,新建为B和A新建一个陌生人的关系
          const forstranger = {
            user_id: friendId,
            friend_id: getdata.initiativeAddId,
            friendtype: 3
          };
          await friendModel.create(forstranger);
          //如果不存在:新建
          ctx.response.status = 200;
          ctx.body = statusCode.SUCCESS2_200();
        }
        ctx.response.status = 200;
        ctx.body = statusCode.SUCCESS2_200();
      } 
      else if (parseInt(getdata.type) == 1) {
        //移除黑名单
        //A,B 对 关系和B，A 对关系都变为 0
        await friendModel.updateRelation(getdata.initiativeAddId, friendId, 0);
        if (existRelation2) {
          //防止存在B是A的好友,但是A不是B的好友的数据库错误.
          await friendModel.updateRelation(
            friendId,
            getdata.initiativeAddId,
            0
          );
          ctx.response.status = 200;
          ctx.body = statusCode.SUCCESS2_200();
        } else {
          //为了防止那种错误,新建为B和A新建一个好友的关系
          const forfriend = {
            user_id: friendId,
            friend_id: getdata.initiativeAddId,
            friendtype: 0
          };
          await friendModel.create(forfriend);
          //如果不存在:新建
          ctx.response.status = 200;
          ctx.body = statusCode.SUCCESS2_200();
        }
      } else {
        ctx.response.status = 200; //错误的请求
        ctx.body = statusCode.ERROR_400();
      }
    }
}

  //接受或者拒绝好友
  static async accept(ctx) {
    const getdata = ctx.request.body; //
    if (getdata.agree == 1) {
      //接受: agree=1
      //找到user_id, friendId pair的关系,friendtype=0
      //friendID,user_id pair ,friendtype=0
      const friend = await UserController.getUserById(getdata.friendId);
      const friendId = friend.id;
      const existRelation1 = await friendModel.findRelationByPair(
        getdata.userId,
        friendId
      );
      const existRelation2 = await friendModel.findRelationByPair(
        friendId,
        getdata.userId
      );
      console.log(existRelation2);
      //先判断他们之间是否存在关系
      if (!existRelation1 || existRelation1.friendtype != 2) {
        //如果他们之间没有关系,或者他们之间的关系不是请求关系,则请求不进行任何操作
        //返回请求错误
        ctx.response.status = 200;
        ctx.body = statusCode.ERROR_400();
      } else {
        await friendModel.updateRelation(getdata.userId, friendId, 0);
        if (existRelation2) {
          //如果存在,直接更新不必新建
          await friendModel.updateRelation(friendId, getdata.userId, 0);
        } else {
          //新建
          const fornew = {
            user_id: friendId,
            friend_id: getdata.userId,
            friendtype: 0
          };
          console.log(fornew);
          await friendModel.create(fornew);
        }
      }
      ctx.response.status = 200;
      ctx.body = statusCode.SUCCESS2_200();
    } else if (getdata.agree == 0) {
      //拒绝: type=0
      //找到user_id, friendId pair的关系,friendtype=3//
      const existRelation1 = await friendModel.findRelationByPair(
        getdata.userId,
        friendId
      );
      if (!existRelation1 || existRelation1.friendtype != 2) {
        //如果他们之间没有关系,或者他们之间的关系不是请求关系,则请求不进行任何操作
         ctx.response.status = 200;
         ctx.body = statusCode.ERROR_400();
      } else {
        await friendModel.updateRelation(getdata.userId, friendId, 3); //更改为陌生人关系
      }
      ctx.response.status = 200;
      ctx.body = statusCode.SUCCESS2_200();
    } else {
      ctx.response.status = 200;
      ctx.body = statusCode.ERROR_400();
    }
  }

  static async getList(ctx){
    const getdata = ctx.request.body; 
    const existRelation= await friendModel.findRelationById(getdata.userId)
    //先判断关系里面是否有这ID
    if(!existRelation){
       //没有返回,查询失败,没有获得数据
       ctx.response.status = 200;
       ctx.body = statusCode.ERROR_400();

    }else{//有  //parseInt,不确定是否需要转换类型
       //type=0, 获取好友列表
       //type=1  获取黑名单列表
       //type=2  获取申请列表
        const data=await friendModel.findAllFriendList(getdata.userId,getdata.type)
        //返回的是一个数组
        let arrayObj=new Array();
        for(let i=0;i<data.length;i++){
          let friend=await ProfileController.getProfileById(data[i].friend_id)
          let returndata={
            nickname:friend.nickname,
            friendId:friend.user_id,
            gender:friend.gender,
            sign:friend.sign
          }
          arrayObj.push(returndata)
        }
        if(arrayObj.length>0){
          ctx.response.status = 200;
          ctx.body = statusCode.SUCCESS_200(arrayObj);
          return true
        }
      
      }//不返回任何数据
        ctx.response.status = 200;
        ctx.body = statusCode.ERROR_400();
    }


}

module.exports = FriendController;
