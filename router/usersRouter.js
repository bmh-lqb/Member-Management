// 处理所有与用户相关的路由
const express = require("express");
const userControl = require("../controller/usersControl.js");
const router = express.Router();

// 得到静态页面
router.get("/users", (req, res) => {
    userControl.getUsers(req, res);
});

// 暴露接口
module.exports.router = router;