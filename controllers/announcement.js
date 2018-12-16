const announcementModel = require("../modules/announcement");
const UserController = require('../controllers/user')
const jwt = require("jsonwebtoken");
const secret = require("../config/secret");
const bcrypt = require("bcryptjs");
const util = require("util");
const verify = util.promisify(jwt.verify);
const statusCode = require("../util/status-code");


class AnnouncementController {
    //发布公告
    static async publish(ctx){
        const getdata = ctx.request.body
        if(getdata.title&&getdata.detail){
            //如果参数正确,参数非空
            const forAnnoun={
                title:getdata.title,
                detail:getdata.detail
            }
            await announcementModel.create(forAnnoun)
            ctx.response.status = 200;
            ctx.body = statusCode.SUCCESS2_200()
        }else{
            ctx.response.status = 200;
            ctx.body = statusCode.ERROR_400();
        }
    }


 

}

module.exports=AnnouncementController;
