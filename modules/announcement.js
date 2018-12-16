const db = require('../config/db')
const Sequelize = db.sequelize
const Announcement = Sequelize.import('../schema/announcement.js')
Announcement.sync({ force: false });

global.newAnnou={
    title: '',
    detail:'',
    isnew:false
}

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

     //存一个全局变量:新的公告
    //修改新的公告
    static setNew(title,detail){
        newAnnou={
            title:title,
            detail:detail,
            isnew:true
        }

    }

    static getNew(){
        let tmp={
            title:newAnnou.title,
            detail:newAnnou.detail,
            isnew:newAnnou.isnew
        };
        newAnnou.isnew=false;
        return tmp;

    }
}

module.exports = AnnouncementModel;