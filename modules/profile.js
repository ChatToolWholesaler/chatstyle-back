const db = require('../config/db')
const Sequelize = db.sequelize
const Profile = Sequelize.import('../schema/profile.js')
Profile.sync({force: false});
const User = Sequelize.import('../schema/user.js')
User.sync({force: false});
//Profile.belongsTo(User);
class ProfileModel {
    /**
     * 创建用户的profile
     * @param profile
     * @returns {Promise<boolean>}
     */
    static async create(profile) {
        let {user_id,nickname, gender} = profile;
        await Profile.create({
            user_id,
            nickname,
            gender
        })
        return true
    }

    // /**
    //  * 删除用户
    //  * @param id listID
    //  * @returns {Promise.<boolean>}
    //  */
    // static async delete(id) {
    //     await User.destroy({
    //         where: {
    //             id,
    //         }
    //     })
    //     return true
    // }

    static async setDeletestate(user_id){
        await Profile.update(
            {
                isdeleted:true
            },{
                where:{
                    user_id
                },
                fields:['isdeleted']
            });
        return true;
    }

    /**
     * 查询用户的profile列表
     * @returns {Promise<*>}
     */
    static async findAllUserList() {
        return await Profile.findAll({
            attributes: ['id', 'username']
        })
    }

    /**
     * 查询用户的profile信息
     * @param user_id  姓名
     * @returns {Promise.<*>}
     */
    static async findProfileById(user_id) {
        return await Profile.findOne({
            where: {
                user_id
            }
        })
    }

    /**
     * 修改用户的profile信息
     * @param user_id  用户id
     * @returns {Promise.<*>}
     */
    static async updateSign(user_id,newSign){
        await Profile.update(
            {
                sign:newSign
            },{
                where:{
                    user_id
                },
                fields:['sign']
            });
        return true;
    }
}

module.exports = ProfileModel
