module.exports = function (sequelize, DataTypes) {
    return sequelize.define('message', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        type:{//消息类型
            type: DataTypes.INTEGER(11),
            allowNull: false,
        },
        position_x:{//位置坐标
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        position_y:{//位置坐标
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        position_z:{//位置坐标
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        roomno:{//场景号
            type: DataTypes.INTEGER(11),
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        nickname: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        channel: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
        },
        content: {
            type: DataTypes.STRING(255),
            allowNull: false,
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