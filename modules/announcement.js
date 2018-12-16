const db = require('../config/db')
const Sequelize = db.sequelize
const Announcement = Sequelize.import('../schema/announcement.js')
Announcement.sync({ force: false });

class AnnouncementModel {
    // static async findAdminByName(adminname) {
    //    return await Admin.findOne(
    //         {
    //             where:{
    //                 adminname
    //             }
    //         }
    //     )

    // }

    static async create(announ) {
        let {title, detail} = announ;

        await Announcement.create({
            title, 
            detail
        })
        return true
    }

    static async getTotalNumber(){
        return await Announcement.count(
             {where:{
                 isdeleted:0,
             }            
             }
         )
     }

     static async getList() {
        return await Announcement.findAll({
            attributes: ['title','detail']
        })
    }
}

module.exports = AnnouncementModel;