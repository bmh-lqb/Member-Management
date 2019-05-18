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
    getAllUsers: (req, res) => {

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
    },

    // 根据用户 id 得到用户对象
    getUserById: (req, res) => {
        let id = req.query.id;

        let selSql = `SELECT * FROM users WHERE id = ${id}`;

        userDB.query(selSql, result => {
            res.send({
                status: 200,
                msg: "查询成功",
                data: result[0]
            });
        });
    },
    // 修改用户
    updateUser: (req, res) => {
        // 接收参数
        let params = req.body;

        // 修改数据到 mysql
        let updateSql = `UPDATE users SET email = '${params.email}', nickname = '${params.nickname}', password = '${params.password}' WHERE id = ${params.id}`;
        userDB.query(updateSql, result => {
            res.send({
                status: 200,
                msg: '修改成功'
            });
        });
    },
    // 批量删除
    delUsersByIds: (req, res) => {
        // 获取 参数 id
        let ids = req.body.id;

        // 将数组转为字符串，用逗号隔开
        let idStr = ids.join(',');

        // 执行 sql 语句：
        let delSql = `DELETE FROM users WHERE id in (${idStr})`;
        userDB.query(delSql, result => {
            res.send({
                status: 200,
                msg: '删除成功'
            });
        });
    }
}