// 开启服务器
// 引入第三方包
const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");

const usersRouter = require("./router/usersRouter.js");

const app = express();

// 配置 ejs 模板引擎
app.set("views", "./views");
app.set("view engine", "ejs");

// 配置 body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// 配合静态文件
app.use("/assets", express.static("./assets"));
app.use("/static/uploads", express.static("./uploads"));

// 注册路由中间件
app.use(usersRouter);



app.listen(3000, () => {
    console.log("服务器开启成功"); 
});