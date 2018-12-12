const db = require('../config/db')
const Sequelize = db.sequelize
const Message = Sequelize.import('../schema/message.js')
Message.sync({ force: false });

class MessageModel {

    static async create(message) {
        let { type, position_x, position_y, position_z, roomno, username, nickname, channel, content } = message;
        await Message.create({
            type, position_x, position_y, position_z, roomno, username, nickname, channel, content
        })
    }

}

module.exports = MessageModel;