const db = require('../config/db')
const Sequelize = db.sequelize
const Admin = Sequelize.import('../schema/admin.js')
Admin.sync({ force: false });

class AdminModel {
    static async findAdminByName(adminname) {
       return await Admin.findOne(
            {
                where:{
                    adminname
                }
            }
        )

    }

    static async create(admin) {
        let {adminname, password} = admin;

        await Admin.create({
            adminname,
            password
        })
        return true
    }
}

module.exports = AdminModel;