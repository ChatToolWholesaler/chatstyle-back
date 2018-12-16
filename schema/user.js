// const db = require('../config/db')
// const Sequelize = db.sequelize
// const Profile = Sequelize.import('../schema/profile.js')
// Profile.sync({force: false});
const moment = require('moment');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('user', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        roomno:{
            type:DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue:-1
        },
        isonline:{
            type:DataTypes.BOOLEAN,//在线或是下线
            allowNull: false,
            defaultValue:false
        },
        isbanned:{
            type:DataTypes.BOOLEAN,//是否被管理员设置为禁止登录
            allowNull: false,
            defaultValue:false
        },
        isdeleted:{
            type:DataTypes.BOOLEAN,
            defaultValue:0
        },
        createdAt: {
            type: DataTypes.DATE,
            get() {
                return moment(this.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm');
            }
        },
        updatedAt: {
            type: DataTypes.DATE,
            get() {
                return moment(this.getDataValue('updatedAt')).format('YYYY-MM-DD HH:mm');
            }
        }
    }, {
        // 如果为 true 则表的名称和 model 相同，即 user
        // 为 false MySQL创建的表名称会是复数 users
        // 如果指定的表名称本就是复数形式则不变
        freezeTableName: true
    })
}
