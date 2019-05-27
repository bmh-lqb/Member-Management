// 负责所有的与登录相关的路由
const express = require('express');
const loginControl = require('../controller/loginControl.js');
const router = express.Router();


router.get('/login', loginControl.getLogin) // 添加一个得到登录页面的路由
    .post('/loginPostData', loginControl.loginPostData) // 添加一个提交登录数据的路由
    .get("/loginOut", loginControl.loginOut);   // 添加一个退出登录的路由

module.exports = router;