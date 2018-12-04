const db = require('../config/db')
const Sequelize = db.sequelize
const Profile = Sequelize.import('../schema/profile.js')
Profile.sync({force: false});
const User = Sequelize.import('../schema/user.js')
User.sync({force: false});
Profile.belongsTo(User);
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

    // /**
    //  * 查询用户列表
    //  * @returns {Promise<*>}
    //  */
    // static async findAllUserList() {
    //     return await User.findAll({
    //         attributes: ['id', 'username']
    //     })
    // }

    // /**
    //  * 查询用户信息
    //  * @param username  姓名
    //  * @returns {Promise.<*>}
    //  */
    // static async findUserByName(username) {
    //     return await User.findOne({
    //         where: {
    //             username
    //         }
    //     })
    // }
}

module.exports = ProfileModel
