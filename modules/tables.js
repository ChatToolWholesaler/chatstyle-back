

// // const db = require('../config/db')
// // const Sequelize = db.sequelize;
// const mysql = require('mysql2/promise');
// const config= require('../config/config')
// const Sequelize = require('sequelize');
// mysql.createConnection({
//     user     : config.username,
//     password : config.password
// }).then(() => {
//     this.query('CREATE DATABASE IF NOT EXISTS myRandomDb;').then(() => {
//         // Safe to use sequelize now
//         const sequelize = new Sequelize(config.database, config.username, config.password, {
//                     host: config.host,
//                     dialect: 'mysql',
//                     operatorsAliases: false,
//                     dialectOptions: {
//                         charset: "utf8mb4",
//                         collate: "utf8mb4_unicode_ci",
//                         supportBigNumbers: true,
//                         bigNumberStrings: true
//                     },
                
//                     pool: {
//                         max: 5,
//                         min: 0,
//                         acquire: 30000,
//                         idle: 10000
//                     },
//                     timezone: '+08:00' //东八时区
//                 });
//                 // module.exports = {
//                 //     sequelize
//                 // }
//                     const User = sequelize.import('../schema/user.js');
//                     User.sync({force: false});
//                     //const Profile = Sequelize.import('../schema/profile.js')
//                     //Profile.sync({force: false});
//                     class UserModel {
//                         /**
//                          * 创建用户
//                          * @param user
//                          * @returns {Promise<boolean>}
//                          */
//                         static async create(user) {
//                             let {username, password} = user;
                    
//                             await User.create({
//                                 username,
//                                 password
//                             })
//                             return true
//                         }
                    
//                         /**
//                          * 删除用户
//                          * @param id listID
//                          * @returns {Promise.<boolean>}
//                          */
//                         static async delete(id) {
//                             await User.destroy({
//                                 where: {
//                                     id,
//                                 }
//                             })
//                             return true
//                         }
                    
//                         /**
//                          * 查询用户列表
//                          * @returns {Promise<*>}
//                          */
//                         static async findAllUserList() {
//                             return await User.findAll({
//                                 attributes: ['id', 'username']
//                             })
//                         }
                    
//                         /**
//                          * 查询用户信息
//                          * @param username  姓名
//                          * @returns {Promise.<*>}
//                          */
//                         static async findUserByName(username) {
//                             return await User.findOne({
//                                 where: {
//                                     username
//                                 }
//                             })
//                         }
                    
//                         /**
//                          * 查询用户信息
//                          * @param id  用户id
//                          * @returns {Promise.<*>}
//                          */
//                         static async findUserById(id) {
//                             return await User.findOne({
//                                 where: {
//                                     id
//                                 }
//                             })
//                         }
//                     }
                    
                    
            
//                     const Profile = sequelize.import('../schema/profile.js')
//             Profile.sync({force: false});
//             // const User = Sequelize.import('../schema/user.js')
//             // User.sync({force: false});
//             //Profile.belongsTo(User);
//             class ProfileModel {
//                 /**
//                  * 创建用户的profile
//                  * @param profile
//                  * @returns {Promise<boolean>}
//                  */
//                 static async create(profile) {
//                     let {user_id,nickname, gender} = profile;
//                     await Profile.create({
//                         user_id,
//                         nickname,
//                         gender
//                     })
//                     return true
//                 }
            
//                 // /**
//                 //  * 删除用户
//                 //  * @param id listID
//                 //  * @returns {Promise.<boolean>}
//                 //  */
//                 // static async delete(id) {
//                 //     await User.destroy({
//                 //         where: {
//                 //             id,
//                 //         }
//                 //     })
//                 //     return true
//                 // }
            
//                 /**
//                  * 查询用户的profile列表
//                  * @returns {Promise<*>}
//                  */
//                 static async findAllUserList() {
//                     return await Profile.findAll({
//                         attributes: ['id', 'username']
//                     })
//                 }
            
//                 /**
//                  * 查询用户的profile信息
//                  * @param user_id  姓名
//                  * @returns {Promise.<*>}
//                  */
//                 static async findProfileById(user_id) {
//                     return await Profile.findOne({
//                         where: {
//                             user_id
//                         }
//                     })
//                 }
//             }
            
            
            
//             const Friend = sequelize.import('../schema/friend.js')
//             Friend.sync({force:false});
//             //const Friend=Sequelize.import('../')
            
//             class FriendModel{
//                 //创建好友，黑名单，或申请关系
//                 static async create(friend){
//                     let{user_id,friend_id,friendtype}=friend;
//                     await Friend.create({
//                         user_id,
//                         friend_id,
//                         friendtype
//                     })
//                 }
//             }
//             module.exports={
//                 ProfileModel,
//                 UserModel,
//                 FriendModel
            
//             }

//     })
// })
// //var createTable=async function(){
// //Sequelize.query(" Create Database If Not Exists chatstyle;").then(
// //   //      function(){
// //         const User = Sequelize.import('../schema/user.js');
// //         User.sync({force: false});
// //         //const Profile = Sequelize.import('../schema/profile.js')
// //         //Profile.sync({force: false});
// //         class UserModel {
// //             /**
// //              * 创建用户
// //              * @param user
// //              * @returns {Promise<boolean>}
// //              */
// //             static async create(user) {
// //                 let {username, password} = user;
        
// //                 await User.create({
// //                     username,
// //                     password
// //                 })
// //                 return true
// //             }
        
// //             /**
// //              * 删除用户
// //              * @param id listID
// //              * @returns {Promise.<boolean>}
// //              */
// //             static async delete(id) {
// //                 await User.destroy({
// //                     where: {
// //                         id,
// //                     }
// //                 })
// //                 return true
// //             }
        
// //             /**
// //              * 查询用户列表
// //              * @returns {Promise<*>}
// //              */
// //             static async findAllUserList() {
// //                 return await User.findAll({
// //                     attributes: ['id', 'username']
// //                 })
// //             }
        
// //             /**
// //              * 查询用户信息
// //              * @param username  姓名
// //              * @returns {Promise.<*>}
// //              */
// //             static async findUserByName(username) {
// //                 return await User.findOne({
// //                     where: {
// //                         username
// //                     }
// //                 })
// //             }
        
// //             /**
// //              * 查询用户信息
// //              * @param id  用户id
// //              * @returns {Promise.<*>}
// //              */
// //             static async findUserById(id) {
// //                 return await User.findOne({
// //                     where: {
// //                         id
// //                     }
// //                 })
// //             }
// //         }
        
        

// //         const Profile = Sequelize.import('../schema/profile.js')
// // Profile.sync({force: false});
// // // const User = Sequelize.import('../schema/user.js')
// // // User.sync({force: false});
// // //Profile.belongsTo(User);
// // class ProfileModel {
// //     /**
// //      * 创建用户的profile
// //      * @param profile
// //      * @returns {Promise<boolean>}
// //      */
// //     static async create(profile) {
// //         let {user_id,nickname, gender} = profile;
// //         await Profile.create({
// //             user_id,
// //             nickname,
// //             gender
// //         })
// //         return true
// //     }

// //     // /**
// //     //  * 删除用户
// //     //  * @param id listID
// //     //  * @returns {Promise.<boolean>}
// //     //  */
// //     // static async delete(id) {
// //     //     await User.destroy({
// //     //         where: {
// //     //             id,
// //     //         }
// //     //     })
// //     //     return true
// //     // }

// //     /**
// //      * 查询用户的profile列表
// //      * @returns {Promise<*>}
// //      */
// //     static async findAllUserList() {
// //         return await Profile.findAll({
// //             attributes: ['id', 'username']
// //         })
// //     }

// //     /**
// //      * 查询用户的profile信息
// //      * @param user_id  姓名
// //      * @returns {Promise.<*>}
// //      */
// //     static async findProfileById(user_id) {
// //         return await Profile.findOne({
// //             where: {
// //                 user_id
// //             }
// //         })
// //     }
// // }



// // const Friend = Sequelize.import('../schema/friend.js')
// // Friend.sync({force:false});
// // //const Friend=Sequelize.import('../')

// // class FriendModel{
// //     //创建好友，黑名单，或申请关系
// //     static async create(friend){
// //         let{user_id,friend_id,friendtype}=friend;
// //         await Friend.create({
// //             user_id,
// //             friend_id,
// //             friendtype
// //         })
// //     }
// // }
// // module.exports={
// //     ProfileModel,
// //     UserModel,
// //     FriendModel

// // }
// // module.exports = ProfileModel
// // module.exports = UserModel
// // module.exports = FriendModel

//        // return User


// //         }
// // );



// // const Profile = Sequelize.import('../schema/profile.js')
// // Profile.sync({force: false});
// //User.hasOne(Profile);


