const db = require('../config/db')
const Sequelize = db.sequelize
const Friend = Sequelize.import('../schema/friend.js')
Friend.sync({ force: false });
//const Friend=Sequelize.import('../')

class FriendModel {
    //创建好友，黑名单，或申请关系
    static async create(friend) {
        let { user_id, friend_id, friendtype } = friend;
        await Friend.create({
            user_id,
            friend_id,
            friendtype
        })
    }

    static async findRelationByPair(user_id, friend_id) {
        return await Friend.findOne(
            {
                where: {
                    user_id,
                    friend_id
                }
            }
        )

    }

    static async findRelationById(user_id) {
        return await Friend.findOne(
            {
                where: {
                    user_id,
                }
            }
        )
    }

    

    static async findAllFriendList(user_id, friendtype) {
        return await Friend.findAll(
            {
                where: {
                    user_id,
                    friendtype,
                    isdeleted:false
                }
            }
        )
    }

    static async setDeletestate(user_id,friend_id) {
        await Friend.update(
            {
                isdeleted: 1
            }, {
                where: {
                    user_id,
                },
                fields: ['isdeleted']
            });
        await Friend.update(
            {
                isdeleted: 1
            }, {
                where: {
                    friend_id,
                },
                fields: ['isdeleted']
            });
        return true;
    }

    static async updateRelation(user_id, friend_id, newRelation) {
        await Friend.update(
            {
                friendtype: newRelation
            }, {
                where: {
                    user_id,
                    friend_id
                },
                fields: ['friendtype']
            });
        return true;
    }

}

module.exports = FriendModel