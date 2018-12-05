const Router = require('koa-router')
//const app=require('../app')
const UserController = require('../controllers/user')
const FriendController = require('../controllers/friend')
const ProfileController = require('../controllers/profile')

const router = new Router({
    prefix: '/api/v1'
})


// const foruser = {
//     username: 'pili',
//     password: '234',
// }
// const forprofile = {
//     nickname: 'nickname',
//     gender: 1,
// }
// UserController.create(foruser,forprofile)

/**
 * 用户接口
 */
// 用户注册
//
router.post('/user/register', UserController.create);
// 用户登录
router.post('/user/login', UserController.login);
// 删除用户
router.delete('/user/delete/:id', UserController.delete);
// 获取用户信息
//router.get('/user/info', UserController.getUserInfo);
// 获取用户信息
router.post('/user/getUserInfo', UserController.getUserInfo);
// 修改用户个性签名
router.post('/user/setSign', ProfileController.setSign);
// 获取用户列表
router.get('/user/list', UserController.getUserList);

/**
 * 好友黑名单接口
 */
//添加好友或者拉黑好友
router.post('/friend/addFriend',FriendController.create);
//删除好友或者移除黑名单
router.post('/friend/deleteFriend',FriendController.delete);

/**
 * 其它接口
 */


module.exports = router
