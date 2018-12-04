const Router = require('koa-router')
//const app=require('../app')
const UserController = require('../controllers/user')
const FriendController = require('../controllers/friend')

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
router.post('/user/register', UserController.create);
// 用户登录
router.post('/user/login', UserController.login);
// 删除用户
router.delete('/user/delete/:id', UserController.delete);
// 获取用户信息
//router.get('/user/info', UserController.getUserInfo);
// 获取用户信息
router.post('/user/info', UserController.getUserInfo);
// 获取用户列表
router.get('/user/list', UserController.getUserList);

//添加好友或者拉黑好友
router.post('/friend/addFriend',FriendController.create);
/**
 * 其它接口
 */


module.exports = router
