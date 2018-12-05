
# 登录注册接口调用的方法

## 一 本地调用配置
### 1.下载或者git clone
> 下载地址: https://github.com/ChatToolWholesaler/chatstyle-back
>
>git clone: git@github.com:ChatToolWholesaler/chatstyle-back.git

### 2.在vscode中打开下载的chatstyle-back文件夹
### 3.安装
在VScode的终端或者在cmd的该文件夹下输入以下命令
> npm install
>
### 4.对数据库进行配置
在config/config.js中配置本地数据库
> 修改 config.js下的database,username,password
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
或者终端输出了:
> Executing (default): SHOW INDEX FROM `profile`  
Executing (default): SHOW INDEX FROM `user`  
Executing (default): SHOW INDEX FROM `friend`    
等创建数据库的操作信息
>

## 二 路由说明
router/index.js文件下有详细说明

用户接口  
>// 用户注册  
router.post('/user/register', UserController.create);  
// 用户登录  
router.post('/user/login', UserController.login);  
// 删除用户  
router.delete('/user/delete/:id', UserController.delete);  
// 获取用户信息  
router.post('/user/info', UserController.getUserInfo);  
// 获取用户列表  
router.get('/user/list', UserController.getUserList);  
>

好友黑名单接口  
>//添加好友或者拉黑好友
router.post('/friend/addFriend',FriendController.create);  
//删除好友或者接触黑名单
router.post('/friend/deleteFriend',FriendController.delete);
>


## 三 接口的使用方法

> 因为暂时而言,接口部署在本地,所以接口的url为:  
前缀"http://localhost:3000/api/v1" + 接口文档里面写的url;  
接口文档有些api的url已经直接带上了前缀.
>
* 附:chatstyle-doc下develop分支里面api.html接口文档里面有详细的请求参数和返会参数,以及 url,故此处不赘诉.接口文档里面注意接口的状态,只有测试或者对接状态的api可以用.  
* **api开发人员**可以直接在eolinker里面测试,点击接口,找到测试按钮,根据提示即可完成测试.  
* **非api开发人员**需要自行下载postman等接口测试工具,结合接口文档里给定的请求方法,请求url,请求参数配置http请求,详情自己百度教程. 如果想加入我们小组在eolinker的工作间请私聊我~ 


### 举例: 注册接口
>http://localhost:3000/api/v1/user/register
>
#### 请求方式
> POST
>
#### 参数
参数 | 说明 |  类型  
- | :-: | -:  
username | 用户名| string  
password | 密码 | string   
nickname | 昵称 | string  
gender | 性别| Boolean   

### 登录接口
 >http://localhost:3000/api/v1/user/login
>
#### 请求方式
> POST
>
#### 参数
参数 | 说明 |  类型  
- | :-: | -:  
username | 用户名| string    
password | 密码 | string  

<!-- #### 返回的示例结果
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
``` -->