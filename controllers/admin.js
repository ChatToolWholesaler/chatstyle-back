const adminModel = require("../modules/admin");
// const ProfileController = require('../controllers/profile')
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
            if (bcrypt.compareSync(data.password, admin.password)){
                ctx.response.status = 200;
                ctx.body = statusCode.SUCCESS_200();
            } else {
                ctx.response.status = 200;
                ctx.body = statusCode.ERROR_412('用户名或密码错误');
            }
        }else{
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
}

module.exports=AdminController;