const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const jwt = require('koa-jwt')
const logger = require('koa-logger')
const cors = require('koa-cors');
const index = require('./routes/index')
const secret = require('./config/secret')
const err = require('./middleware/error')
//const UserController = require('../controllers/user')
//const FriendController = require('../controllers/friend')
// error handler
onerror(app)



app.use(err())
app.use(cors());


// 过滤不用jwt验证
app.use(jwt({secret: secret.sign}).unless({
    path: [
        // 注册接口
        /^\/api\/v1\/user\/register/,
        // 登录接口
        /^\/api\/v1\/user\/login/,
        //上下线接口
        /^\/api\/v1\/user\/setOnline/,
        // 获取用户列表接口
        /^\/api\/v1\/user\/list/,
         // 获取用户列表接口信息
         /^\/api\/v1\/user\/getUserInfo/,
         //请求添加好友或拉黑好友
         /^\/api\/v1\/friend\/addFriend/,
         //删除好友或拉出黑名单
         /^\/api\/v1\/friend\/deleteFriend/,
          //修改用户个性签名
          /^\/api\/v1\/user\/setSign/,
          //接受或拒绝好友请求
          /^\/api\/v1\/friend\/acceptFriend/,
          //获取好友申请列表、黑名单列表，好友列表
          /^\/api\/v1\/friend\/getFriendsList/,
          //上传消息到服务器
          /^\/api\/v1\/message\/uploadMsg/,

          //管理员相关接口
          /^\/api\/v1\/admin\/addAdmin/,
          //管理员登录
          /^\/api\/v1\/admin\/login/,

    ]
}))

// http://localhost:3000/api/v1/

// middlewares
app.use(bodyparser({
    enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
    extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})


//routes
app.use(index.routes(), index.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
});



module.exports = app
