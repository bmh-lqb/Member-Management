// 引入 userDB
const userDB = require("../model/userDB.js");

// 处理所有与用户相关的逻辑
exports.getUsers = (req, res) => {
    // 将所有的用户数据查询出来
    userDB.query("SELECT * FROM users", result => {
        // 渲染页面，渲染数据
        res.render("users", {result: result });
    });
}