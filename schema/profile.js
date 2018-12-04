// const db = require('../config/db')
// const Sequelize = db.sequelize
// const User = Sequelize.import('../schema/user.js')
// User.sync({force: false});

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('profile', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        user_id:{
            type: DataTypes.INTEGER(11),
            allowNull: false,
            //外键引用
            // references:{
            //     model:User,
            //     key: 'id'
            // }
        },
        nickname: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        sign: {
            type: DataTypes.STRING(255),
            allowNull: true,
            defaultValue:" "
        }
        ,
        gender:{
            type:DataTypes.BOOLEAN,
            defaultValue:1
        },
        isdeleted:{
            type:DataTypes.BOOLEAN,
            defaultValue:0
        }
    }, {
        // 如果为 true 则表的名称和 model 相同，即 user
        // 为 false MySQL创建的表名称会是复数 users
        // 如果指定的表名称本就是复数形式则不变
        freezeTableName: true
    })
}
