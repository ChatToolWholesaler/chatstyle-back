拯救README
# 登录注册接口调用的方法

## 一 本地调用配置
### 1.下载或者git clone
> 下载地址: https://github.com/ChatToolWholesaler/chatstyle-back/tree/develop
>
>git clone: git@github.com:ChatToolWholesaler/chatstyle-back.git

### 2.在vscode中打开下载的loginregister文件夹
### 3.安装
在VScode的终端或者在cmd的该文件夹下输入以下命令
> npm install
>
### 4.对数据库进行配置
在config/db.js中配置本地数据库
> 修改 const sequelize=new Sequelize('数据库','数据库用户名','数据库密码',{})
为自己本地的数据库名字, 用户名, 密码
>

### 5.开启服务
同样是在终端里敲打命令
> npm start
>

### 6.验证服务是否开启
浏览器中打开下面地址, 若是返回了401(需要用户登录)则说明服务开启成功
> http://localhost:3000/api/v1
>

## 二 路由说明
router/index.js文件下有详细说明
>// 用户注册  
router.post('/user/register', UserController.create);  
// 用户登录  
router.post('/user/login', UserController.login);  
// 删除用户  
router.delete('/user/delete/:id', UserController.delete);   
// 获取用户信息   
router.get('/user/info', UserController.getUserInfo);  
// 获取用户列表  
router.get('/user/list', UserController.getUserList);  
>

## 三 注册接口
>http://localhost:3000/api/v1/user/register
>
### 请求方式
> POST
>
### 参数
参数 | 说明 |  类型  
- | :-: | -:  
username | 用户名| string  
password | 密码 | string 

## 四 登录接口
 >http://localhost:3000/api/v1/user/login
>
### 请求方式
> POST
>
### 参数
参数 | 说明 |  类型  
- | :-: | -:  
username | 用户名| string  
password | 密码 | string 
### 返回的示例结果
```JavaScript
{
    "code": 200,
    "msg": "登录成功",
    "data": {
        "id": 2,
        "username": "zl",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InpsIiwiaWQiOjIsImlhdCI6MTU0MjI0NjQ5NiwiZXhwIjoxNTQyMjUwMDk2fQ.1gXpArxf1wmyGRaC7DKdKG4S8Dd4MxkBbJP1Ty1AJ8c"
    }
}
```