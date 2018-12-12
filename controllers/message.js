const messgaeModel = require("../modules/message");
// const ProfileController = require('../controllers/profile')
// const UserController = require("../controllers/user");
const jwt = require("jsonwebtoken");
const secret = require("../config/secret");
const bcrypt = require("bcryptjs");
const util = require("util");
const verify = util.promisify(jwt.verify);
const statusCode = require("../util/status-code");


class MessageController {

    static async uploadMsg(ctx) {
        const getdata = ctx.request.body;
        let message = {
            type: getdata.type,
            position_x: getdata.position_x,
            position_y: getdata.position_y,
            position_z: getdata.position_z, 
            roomno: getdata.roomno, 
            username: getdata.username, 
            nickname: getdata.nickname, 
            channel: getdata.channel, 
            content: getdata.content
        }
        await messgaeModel.create(message);
        ctx.response.status = 200;
        ctx.body = statusCode.SUCCESS2_200()
    }
}

module.exports = MessageController;