const adminModel = require("../modules/admin");
const UserController = require('../controllers/user')
const AnnouncementController = require('../controllers/announcement')
const jwt = require("jsonwebtoken");
const secret = require("../config/secret");
const bcrypt = require("bcryptjs");
const util = require("util");
const verify = util.promisify(jwt.verify);
const statusCode = require("../util/status-code");


class AdminController {

    /**
     * 登录
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async login(ctx) {//登录
        const data = ctx.request.body
        // 查询用户
        const admin = await adminModel.findAdminByName(data.adminname)
        // 判断管理员账号是否存在
        if (admin) {
            // 判断前端传递的管理员密码是否与数据库密码一致
            if (bcrypt.compareSync(data.password, admin.password)) {
                ctx.response.status = 200;
                ctx.body = statusCode.SUCCESS_200();
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
     * 创建root管理员,只暴露给管理员
     * @param ctx
     * @returns {Promise<void>}
     */
    static async create(ctx) {
        const admin = ctx.request.body;
        if (admin.adminname && admin.password) {
            // 查询用户名是否重复
            const existadmin = await adminModel.findAdminByName(admin.adminname)
            if (existadmin) {
                // 反馈存在用户名
                ctx.response.status = 200;
                ctx.body = statusCode.ERROR_403('用户已经存在')
            } else {
                // 加密密码
                const salt = bcrypt.genSaltSync();
                const hash = bcrypt.hashSync(admin.password, salt);
                admin.password = hash;
                // 创建用户
                const foradmin = {
                    adminname: admin.adminname,
                    password: admin.password,
                }
                await adminModel.create(foradmin);
                const newadmin = await adminModel.findAdminByName(admin.adminname);
                ctx.response.status = 200;
                ctx.body = statusCode.SUCCESS2_200()
            }
        } else {
            // 参数错误
            ctx.response.status = 200;
            ctx.body = statusCode.ERROR_412('创建失败，参数错误');
        }
    }
    /**
         * 获取用户数据
         * @param ctx
         * @returns {Promise<void>}
         */
    static async getStatistics(ctx) {
        //获取总的用户人数
        //获取当前在线用户人数
        const data = await UserController.getUsersStatistic()
        if (!data) {
            ctx.response.status = 200;
            ctx.body = statusCode.ERROR_400();
        }
        else {
            ctx.response.status = 200;
            ctx.body = statusCode.SUCCESS_200(data)
        }
    }


    //获取用户列表
    static async getUserList(ctx){
        const data=await UserController.getUserList();
        let arrayObj=new Array();
        for(let i=0;i<data.length;i++){
          let returndata={
            username:data[i].username,
            isOnline:data[i].isonline,
            createTime:data[i].createdAt,
            lastOnlineTime :data[i].updatedAt,
            isBanned:data[i].isbanned,
          }
          arrayObj.push(returndata)
        }
          ctx.response.status = 200;
          ctx.body = statusCode.SUCCESS_200(arrayObj);
          return true
    }

    //禁止用户登录
    static async forbidLogin(ctx){
        const getdata = ctx.request.body;
        await UserController.setBanned(getdata.username,true)
        ctx.response.status = 200;
        ctx.body = statusCode.SUCCESS2_200()
    }

    //允许用户登录
    static async permitLogin(ctx){
        const getdata = ctx.request.body;
        await UserController.setBanned(getdata.username,false)
        ctx.response.status = 200;
        ctx.body = statusCode.SUCCESS2_200()
    }

    //强制用户下线
    static async offlineUser(ctx){
        const getdata = ctx.request.body;
        await UserController.setOffline(getdata.username)
        ctx.response.status = 200;
        ctx.body = statusCode.SUCCESS2_200()
    }

    //删除用户: 注意删除为软删除,即isdelete字段改为true.
    //被删除的用户不能登录: 即直接改user表
    //所有表中涉及到该userid的isdeleted都改为 1
    static async deleteUser(ctx){
        const getdata = ctx.request.body;
        await UserController.delete(getdata.username)
        ctx.response.status = 200;
        ctx.body = statusCode.SUCCESS2_200()
    }

    //轮询接口
    static async polling(ctx){
        //确定是否有用户被强制下线,获取强制下线的用户ID,放在内存里面
        let id= UserController.getofflineUser();
        if(id>0){
            let returndata={
                title:id.toString(),
                detail:''
            }
            ctx.response.status = 200;
          ctx.body = statusCode.SUCCESS3_200(returndata);
          return true;

        }

        //确定是否有新公告
        const announ=AnnouncementController.getNew();
        if(announ.isnew){//是新公告
          let returndata={
              title:announ.title,
              detail:announ.detail
          }
          ctx.response.status = 200;
          ctx.body = statusCode.SUCCESS_200(returndata);
          return true;

        }
        ctx.response.status = 200;
        ctx.body = statusCode.SUCCESS2_200()




    }
}

module.exports = AdminController;