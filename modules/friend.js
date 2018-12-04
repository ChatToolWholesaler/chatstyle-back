const db = require('../config/db')
const Sequelize = db.sequelize
const Friend = Sequelize.import('../schema/friend.js')
Friend.sync({force:false});
//const Friend=Sequelize.import('../')

class FriendModel{
    //创建好友，黑名单，或申请关系
    static async create(friend){
        let{user_id,friend_id,friendtype}=friend;
        await Friend.create({
            user_id,
            friend_id,
            friendtype
        })
    }
}

module.exports = FriendModel