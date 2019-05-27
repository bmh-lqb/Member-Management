// 开启服务器
// 引入第三方包
const express = require("express");
const bodyParser = require("body-parser");
const cookieSession = require('cookie-session');
const ejs = require("ejs");

const usersRouter = require("./router/usersRouter.js");
const categoryRouter = require("./router/categoryRouter.js");
const loginRouter = require("./router/loginRouter.js");
const articleRouter = require("./router/articleRouter.js");
const setRouter = require('./router/setRouter.js');

const app = express();

// 配置 ejs 模板引擎
app.set("views", "./views");
app.set("view engine", "ejs");

// 配置 body-parser
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// 配置 session
app.use(cookieSession({
    name: 'session',
    keys: ['key1', 'key2']
}));

// 配合静态文件
app.use("/assets", express.static("./assets"));
app.use("/static/uploads", express.static("./uploads"));

// 注册路由中间件
app.use(loginRouter); // 与 登录 相关的路由
app.use(usersRouter); // 与 用户 相关的路由
app.use(categoryRouter); // 与 分类 相关的路由
app.use(articleRouter); // 与 文章 相关的路由
app.use(setRouter); // 与 设置 相关的路由

app.listen(3000, () => {
    console.log("服务器开启成功");
});