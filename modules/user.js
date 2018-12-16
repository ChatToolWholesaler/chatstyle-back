const db = require('../config/db')
const Sequelize = db.sequelize
const User = Sequelize.import('../schema/user.js')
User.sync({force: false});
const Profile = Sequelize.import('../schema/profile.js')
Profile.sync({force: false});
//User.hasOne(Profile);

class UserModel {
    /**
     * 创建用户
     * @param user
     * @returns {Promise<boolean>}
     */
    static async create(user) {
        let {username, password} = user;

        await User.create({
            username,
            password
        })
        return true
    }

    /**
     * 删除用户
     * @param id listID
     * @returns {Promise.<boolean>}
     */
    static async delete(id) {
        await User.destroy({
            where: {
                id,
            }
        })
        return true
    }

    /**
     * 查询用户列表
     * @returns {Promise<*>}
     */
    static async findAllUserList() {
        return await User.findAll({
            attributes: ['username','isonline','isbanned','createdAt','updatedAt']
        })
    }

    /**
     * 查询用户信息
     * @param username  姓名
     * @returns {Promise.<*>}
     */
    static async findUserByName(username) {
        return await User.findOne({
            where: {
                username
            }
        })
    }

    /**
     * 查询用户信息
     * @param id  用户id
     * @returns {Promise.<*>}
     */
    static async findUserById(id) {
        return await User.findOne({
            where: {
                id
            }
        })
    }

    static async updateOnlinestate(id,newroomno,ison){
        await User.update(
            {
                roomno:newroomno,
                isonline:ison
            },{
                where:{
                    id
                },
                fields:['roomno','isonline']
            });
        return true;
    }

    static async updateOnlinestate(id,ison){
        await User.update(
            {
                isonline:ison
            },{
                where:{
                    id
                },
                fields:['isonline']
            });
        return true;
    }

    static async updateBanstate(id,isban){
        await User.update(
            {
                isbanned:isban
            },{
                where:{
                    id
                },
                fields:['isbanned']
            });
        return true;
    }

    //统计用户信息
    static async getTotalNumber(){
       return await User.count(
            {where:{
                isdeleted:0,
            }            
            }
        )
    }

    static async getTotalOnlineNumber(){
      return await User.count(
            {
                where:{
                    isonline: 1,
                }

            }
        )
    }


    
}

module.exports = UserModel
