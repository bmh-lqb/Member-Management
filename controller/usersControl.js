// 引入 userDB
const userDB = require("../model/userDB.js");

// 处理所有与用户相关的逻辑
module.exports = {
    // 获取所有用户
    getUsers: (req, res) => {
        // 将所有的用户数据查询出来
        userDB.query("SELECT * FROM users", result => {
            // 渲染页面，渲染数据
            res.render("users", {
                result: result
            });
        });
    },

    // 添加用户数据
    addUser: (req, res) => {
        // 接收用户参数
        let params = req.body;

        // 将数据提交到数据库
        let addSql = `INSERT INTO users (slug, email, password, nickname, status)
                    VALUES ('${params.slug}','${params.email}','${params.password}',
                            '${params.nickname}','activated')`;
                    
        // 执行 sql 语句
        userDB.query(addSql, result => {
            res.send({
                status: 200,
                msg: "新增用户成功"
            });
        });
    },

    // 动态获取所有用户信息
    getAllUser: (req, res) => {
        // 到数据库中获取所有数据
        let selSql = `SELECT * FROM users`;

        // 将结果响应回浏览器
        userDB.query(selSql, result => {
            res.send({
                data: result,
                status: 200,
                msg: "数据获取成功"
            });
        });
    },

    // 根据用户 id 删除用户
    delUser: (req, res) => {
        // 接收 id
        let id = req.query.id;

        // 执行 sql
        let delSql = `DELETE FROM users WHERE id = ${id}`;

        userDB.query(delSql, result => {
            res.send({
                status: 200,
                msg: "删除成功"
            });
        });
    }
}