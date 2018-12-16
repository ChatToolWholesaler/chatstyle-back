const Router = require('koa-router')
//const app=require('../app')
const UserController = require('../controllers/user')
const FriendController = require('../controllers/friend')
const ProfileController = require('../controllers/profile')
const MessageController=require('../controllers/message')
const AdminController=require('../controllers/admin')
const router = new Router({
    prefix: '/api/v1'
})


/**
 * 用户接口
 */
// 用户注册
//
router.post('/user/register', UserController.create);
// 用户登录
router.post('/user/login', UserController.login);
//用户上线或下线
router.post('/user/setOnline', UserController.online);
// 删除用户
router.delete('/user/delete/:id', UserController.delete);
// 获取用户信息
//router.get('/user/info', UserController.getUserInfo);
// 获取用户信息
router.post('/user/getUserInfo', UserController.getUserInfo);
// 修改用户个性签名
router.post('/user/setSign', ProfileController.setSign);
// 获取用户列表
//router.get('/user/list', UserController.getUserList);

/**
 * 好友黑名单接口
 */
//添加好友或者拉黑好友
router.post('/friend/addFriend',FriendController.create);
//删除好友或者移除黑名单
router.post('/friend/deleteFriend',FriendController.delete);

//接受好友请求
router.post('/friend/acceptFriend',FriendController.accept);

//获取好友请求列表，黑名单列表，好友申请列表
router.post('/friend/getFriendsList',FriendController.getList)

/**
 * 消息接口
 */
//上传消息到服务器
router.post('/message/uploadMsg',MessageController.uploadMsg)


 
/**
 * 管理员接口
 */

 /**
 * 管理员
 */
//增加管理员接口
router.post('/admin/addAdmin',AdminController.create)
router.post('/admin/login',AdminController.login)
router.post('/admin/user/getStatistics',AdminController.getStatistics)
router.post('/admin/user/getUserList',AdminController.getUserList)
router.post('/admin/user/forbidLogin',AdminController.forbidLogin)
router.post('/admin/user/permitLogin',AdminController.permitLogin)
router.post('/admin/user/offlineUser',AdminController.offlineUser)


 /**
 * 管理员用户接口
 */


module.exports = router
