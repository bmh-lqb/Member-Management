// 处理所有与分类路由相关的请求
const express = require("express");
const categoryControl = require("../controller/categoryControl.js");

const router = express.Router();

router.get("/categories", categoryControl.categories) // 添加一个 categories 路由
    .get("/getAllData", categoryControl.getAllData); // 添加一个获取所有参数的路由

// 暴露接口
module.exports = router;