module.exports = function (sequelize, DataTypes) {
    return sequelize.define('friend', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        user_id:{//外键
            type: DataTypes.INTEGER(11),
            allowNull: false,
        },

        friend_id: {//外键引用
            type: DataTypes.INTEGER(11),
            allowNull: false,
        }
        ,
        friendtype:{
            type:DataTypes.INTEGER(11),
            allowNull:false
        },
        isdeleted:{
            type:DataTypes.BOOLEAN,
            defaultValue:1
        }
    }, {
        // 如果为 true 则表的名称和 model 相同，即 user
        // 为 false MySQL创建的表名称会是复数 users
        // 如果指定的表名称本就是复数形式则不变
        freezeTableName: true
    })
}