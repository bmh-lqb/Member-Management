// 处理所有与用户相关的路由
const express = require("express");
const usersControl = require("../controller/usersControl.js");
const router = express.Router();

router.get('/users', usersControl.getUsers) // 得到静态页面
    .post('/addUser', usersControl.addUser) // 添加用户的路由
    .get('/getAllUsers', usersControl.getAllUsers) // 添加获取所有用户信息的路由
    .get('/delUser', usersControl.delUser) // 添加一个删除数据的路由
    .get('/getUserById', usersControl.getUserById) // 添加一个根据id得到用户的路由
    .post('/updateUser', usersControl.updateUser) // 添加一个修改用户的路由
    .post('/delUsersByIds', usersControl.delUsersByIds); // 添加一个批量删除的路由
// // 得到静态页面
// router.get("/users", (req, res) => {
//     usersControl.getUsers(req, res);
// });

// // 添加用户的路由
// router.post("/addUser", (req, res) => {
//     usersControl.addUser(req, res);
// });

// // 添加获取所有用户信息的路由
// router.get("/getAllUsers", (req, res) => {
//     usersControl.getAllUsers(req, res);
// });

// // 添加一个删除数据的路由
// router.get("/delUser", (req, res) => {
//     usersControl.delUser(req, res);
// });

// 暴露接口
module.exports = router;