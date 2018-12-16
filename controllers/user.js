const userModel = require('../modules/user');
const profileModel = require('../modules/profile');
const jwt = require('jsonwebtoken');
const secret = require('../config/secret');
const bcrypt = require('bcryptjs');
const util = require('util')
const verify = util.promisify(jwt.verify)
const statusCode = require('../util/status-code')

class UserController {

    // static async create(foruser,profile) {

    //     await userModel.create(foruser);     
    //     const newUser = await userModel.findUserByName(user.username);
    //     const forprofile = {
    //         user_id:newUser.id,
    //         nickname: profile.nickname,
    //         gender: profile.gender,
    //     }
    // }

    /**
     * 创建用户
     * @param ctx
     * @returns {Promise<void>}
     */
    static async create(ctx) {
        const user = ctx.request.body;
        if (user.username && user.password) {
            // 查询用户名是否重复
            const existUser = await userModel.findUserByName(user.username)
            if (existUser) {
                // 反馈存在用户名
                ctx.response.status = 200;
                ctx.body = statusCode.ERROR_403('用户已经存在')
            } else {

                // 加密密码
                const salt = bcrypt.genSaltSync();
                const hash = bcrypt.hashSync(user.password, salt);
                user.password = hash;

                // 创建用户
                const foruser = {
                    username: user.username,
                    password: user.password,
                }
                

                await userModel.create(foruser);
                
                const newUser = await userModel.findUserByName(user.username);
                const forprofile = {
                    user_id:newUser.id,
                    nickname: user.nickname,
                    gender: user.gender,
                }
                //console.log(forprofile);
                profileModel.create(forprofile);
                // 签发token
                const userToken = {
                    username: newUser.username,
                    id: newUser.id
                }

                // 储存token失效有效期1小时
                const token = jwt.sign(userToken, secret.sign, {expiresIn: '1h'});

                ctx.response.status = 200;
                const data={user_id:newUser.id}
        
                ctx.body = statusCode.SUCCESS_200(data)
            }
        } else {

            // 参数错误
            ctx.response.status = 200;
            ctx.body = statusCode.ERROR_412('创建失败，参数错误');
        }
    }

    /**
     * 查询用户信息
     * @param ctx
     * @returns {Promise<void>}
     */
    static async getUserInfo(ctx) {
        const data=ctx.request.body;
        const profile=await profileModel.findProfileById(data.user_id)
        console.log(profile);
                //数据库查询,查找user_id的nickname,sign,gender.
        const nickname=profile.nickname;
        const sign=profile.sign;
        const gender=profile.gender;
        const userid=data.user_id
        try{
            ctx.response.status = 200;
            ctx.body = statusCode.SUCCESS_200({nickname,userid,gender,sign});
        }
        catch(err){

            ctx.response.status = 200;
            ctx.body = statusCode.ERROR_412('查询失败!')
        }
        

        // if (token) {
        //     let payload
        //     try {
        //         // 解密payload，获取用户名和ID
        //         payload = await verify(token.split(' ')[1], secret.sign)

        //         const user = {
        //             id: payload.id,
        //             username: payload.username,
        //         }

        //         ctx.response.status = 200;
        //         ctx.body = statusCode.SUCCESS_200('查询成功', user)
        //     } catch (err) {

        //         ctx.response.status = 200;
        //         ctx.body = statusCode.ERROR_412('查询失败，authorization error!')
        //     }
        // }
    }

    /**
     * 
     * @param  ctx 
     */
    static async online(ctx){
        const getdata=ctx.request.body
        const user=await userModel.findUserById(getdata.userId)
        //console.log(user)
        if(!user){//没有这个用户,返回错误码
            ctx.response.status = 200;
            ctx.body = statusCode.ERROR_400();
        }else{
           // console.log(user.isonline)
            
            if(parseInt(getdata.type)==1){//type=1,上线
                
                //上线之前先判断,该用户是否已经在线
                if(user.isonline){
                    
                     //用户已经在线
                     //不允许上线
                     ctx.response.status = 200;
                    ctx.body = statusCode.ERROR_400();
                }else {//用户不在线,允许上线
                    await userModel.updateOnlinestate(getdata.userId,getdata.roomno,true)
                    ctx.response.status = 200;
                    ctx.body = statusCode.SUCCESS2_200();
                }
           }else if(parseInt(getdata.type)==0){//type=0, 下线
            if(user.isonline){
                //console.log(user.isonline)
                //用户已经在线
                //允许下线
                await userModel.updateOnlinestate(getdata.userId,-1,false)
                ctx.response.status = 200;
                ctx.body = statusCode.SUCCESS2_200();
               
           }else {//用户不在线,不允许下线
               
               ctx.response.status = 200;
               ctx.body = statusCode.ERROR_400();

           }
           }
        }  
        // ctx.response.status = 200;
        // ctx.body = statusCode.ERROR_400();
    }

    /**
     * 删除用户
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async delete(ctx) {
        let id = ctx.params.id;

        if (id && !isNaN(id)) {
            await userModel.delete(id);

            ctx.response.status = 200;
            ctx.body = statusCode.SUCCESS_200('删除用户成功')
        } else {

            ctx.response.status = 200;
            ctx.body = statusCode.ERROR_412('用户ID必须传')
        }
    }

    /**
     * 登录
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async login(ctx) {//登录
        const data = ctx.request.body
        // 查询用户
        const user = await userModel.findUserByName(data.username)
        // 判断用户是否存在
        if (user) {
            // 判断前端传递的用户密码是否与数据库密码一致
            if (bcrypt.compareSync(data.password, user.password)) {
                // 用户token
                const userToken = {
                    username: user.username,
                    id: user.id
                }
                // 签发token
                const token = jwt.sign(userToken, secret.sign, {expiresIn: '1h'});
                
                const user_id=user.id;
                const profile=await profileModel.findProfileById(user_id)
                //console.log(profile);
                //数据库查询,查找user_id的nickname,sign,gender.
                const nickname=profile.nickname;
                const sign=profile.sign;
                const gender=profile.gender;
                ctx.response.status = 200;
                //,{ user_id,nickname,sign,gender,token}
                ctx.body = statusCode.SUCCESS_200({user_id,nickname,sign,gender,token});
            } else {

                ctx.response.status = 200;
                ctx.body = statusCode.ERROR_412('用户名或密码错误');
            }
        } else {

            ctx.response.status = 200;
            ctx.body = statusCode.ERROR_403('用户不存在');
        }
    }

    /**
     * 获取用户列表
     */
    static async getUserList() {
            const data = await userModel.findAllUserList();
            return data;
    }

    //根据username, 获得用户ID.
    static async getUserIdByName(username){//异步操作一定会返回Promise对象.
        const User = await userModel.findUserByName(username);
       // console.log(User)
        return User;
    }
    static async getUserById(userId){//异步操作一定会返回Promise对象.
        const User = await userModel.findUserById(userId);
       // console.log(User)
        return User;
    }

    //获取用户信息: 在线人数,总用户人数
    static async getUsersStatistic(){//异步操作一定会返回Promise对象.
        const totoalNum = await userModel.getTotalNumber();
        const onlineNum= await userModel.getTotalOnlineNumber();
       // console.log(User)
       const data={
        totalUserNumber:totoalNum,
        onlineUserNumber:onlineNum
       }
        return data;
    }

    //禁止或者允许用户登录
    static async setBanned(username,isbanned){
       const user=await userModel.findUserByName(username)
       if(!user){
           return false;
       }else{
        await userModel.updateBanstate(user.id,isbanned)
        return true;
       }
    }

    //强制用户下线
    static async setOffline(username){
        const user=await userModel.findUserByName(username)
       if(!user){
           return false;
       }else{
        await userModel.updateOnlinestate(user.id,false)
        return true;
       }
    }
    

}

module.exports = UserController