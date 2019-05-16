// 处理所有与用户相关的路由
const express = require("express");
const usersControl = require("../controller/usersControl.js");
const router = express.Router();

// 得到静态页面
router.get("/users", (req, res) => {
    usersControl.getUsers(req, res);
});

// 添加用户的路由
router.post("/addUser", (req, res) => {
    usersControl.addUser(req, res);
});

// 添加获取所有用户信息的路由
router.get("/getAllUser", (req, res) => {
    usersControl.getAllUser(req, res);
});

// 添加一个删除数据的路由
router.get("/delUser", (req, res) => {
    usersControl.delUser(req, res);
});

// 暴露接口
module.exports = router;