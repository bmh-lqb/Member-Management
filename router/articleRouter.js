const express = require("express");
const articleControl = require("../controller/articleControl.js");

const router = express.Router();

router.get("/post-add", articleControl.postAdd) // 处理写文章的路由
    .post("/post-save", articleControl.postSave) // 处理新增文章的路由
    .get("/posts", articleControl.posts) // 得到所有文章页面
    .get("/getPostData", articleControl.getPostData) // 得到文章数据
    .get('/post-edit', articleControl.post_edit) // 得到编辑文章静态文件
    .get('/getPostById', articleControl.getPostById) // 根据 id 得到文章数据
    .post('/updatePost', articleControl.updatePost); // 修改文章参数

module.exports = router;