// 引入 userDB
const path = require("path");
const formidable = require("formidable");
const userDB = require("../model/userDB.js");

// 处理所有与用户相关的逻辑
module.exports = {
    // 获取所有用户
    getUsers: (req, res) => {
        if (isBroLogin(req, res)) {
            return;
        }

        // 将所有的用户数据查询出来
        userDB.query("SELECT * FROM users", (err, result) => {
            if (err) {
                return res.send('<script>alert("' + err.message + '")</script>');
            }

            // 渲染页面, 渲染数据
            // 将昵称渲染到页面上
            let nickname = req.session.user.nickname;
            let avatar = req.session.user.avatar;

            res.render("users", {
                result: result,
                nickname,
                avatar
            });
        });
    },

    // 添加用户数据
    addUser: (req, res) => {
        if (isXhrLogin(req, res)) {
            return;
        }

        // 接收用户参数
        let params = req.body;

        // 将数据提交到数据库
        let addSql = `INSERT INTO users (slug, email, password, nickname, avatar, status)
                    VALUES ('${params.slug}','${params.email}','${params.password}',
                            '${params.nickname}', '/assets/img/default.png', 'activated')`;

        // 执行 sql 语句
        userDB.query(addSql, (err, result) => {
            if (err) {
                return res.send({
                    status: 400,
                    msg: '新增用户失败'
                });
            }
            res.send({
                status: 200,
                msg: "新增用户成功"
            });
        });
    },

    // 动态获取所有用户信息
    getAllUsers: (req, res) => {
        if (isXhrLogin(req, res)) {
            return;
        }

        // 到数据库中获取所有数据
        let selSql = `SELECT * FROM users`;

        // 将结果响应回浏览器
        userDB.query(selSql, (err, result) => {
            if (err) {
                return res.send({
                    status: 400,
                    msg: '数据获取失败'
                });
            }
            res.send({
                data: result,
                status: 200,
                msg: "数据获取成功"
            });
        });
    },

    // 根据用户 id 删除用户
    delUser: (req, res) => {
        if (isXhrLogin(req, res)) {
            return;
        }

        // 接收 id
        let id = req.query.id;

        // 执行 sql
        let delSql = `DELETE FROM users WHERE id = ${id}`;

        userDB.query(delSql, (err, result) => {
            if (err) {
                return res.send({
                    status: 400,
                    msg: '删除不成功'
                });
            }
            res.send({
                status: 200,
                msg: "删除成功"
            });
        });
    },

    // 根据用户 id 得到用户对象
    getUserById: (req, res) => {
        if (isXhrLogin(req, res)) {
            return;
        }

        // 接收 id
        let id = req.query.id;

        // 根据 id 查询数据
        let selSql = `SELECT * FROM users WHERE id = ${id}`;

        userDB.query(selSql, (err, result) => {
            if (err) {
                res.send({
                    status: 400,
                    msg: '查询失败'
                });
            }

            res.send({
                status: 200,
                msg: "查询成功",
                data: result[0]
            });
        });
    },

    // 修改用户
    updateUser: (req, res) => {
        if (isXhrLogin(req, res)) {
            return;
        }

        // 接收参数
        let params = req.body;

        // 修改数据到 mysql
        let updateSql = `UPDATE users SET email = '${params.email}', nickname = '${params.nickname}', password = '${params.password}' WHERE id = ${params.id}`;
        userDB.query(updateSql, (err, result) => {
            if (err) {
                return res.send({
                    status: 400,
                    msg: '修改失败'
                });
            }
            res.send({
                status: 200,
                msg: '修改成功'
            });
        });
    },

    // 批量删除
    delUsersByIds: (req, res) => {
        if (isXhrLogin(req, res)) {
            return;
        }

        // 获取 参数 id
        let ids = req.body.id;

        // 将数组转为字符串，用逗号隔开
        let idStr = ids.join(',');

        // 执行 sql 语句：
        let delSql = `DELETE FROM users WHERE id in (${idStr})`;
        userDB.query(delSql, (err, result) => {
            if (err) {
                return res.send({
                    status: 400,
                    msg: '删除失败'
                });
            }
            res.send({
                status: 200,
                msg: '删除成功'
            });
        });
    },

    // 响应个人中心
    profile: (req, res) => {
        // 得到当前登录用户的 id
        let id = req.session.user.id;

        // 根据 id 去数据库中获取数据
        userDB.getUserById(id, (err, result) => {
            if (err) {
                // 跳转回 users 页面 (404)
                return res.send(`<script>alert('出错啦');window.location='/users'</script>`);
            }
            res.render("profile", result[0]);
        });
    },

    // 修改个人信息
    updateProfile: (req, res) => {
        // 接收参数
        let form = new formidable.IncomingForm();

        // 修改图片上传后保存的路径
        let imgPath = path.join(__dirname, '../uploads');
        form.uploadDir = imgPath;

        // 保留图片后缀
        form.keepExtensions = true;

        form.parse(req, (err, fields, files) => {
            if (err) {
                return res.send({
                    status: 400,
                    msg: '出错啦'
                });
            }

            // 判断图片是否存在 
            if (files.img) {
                let name = path.basename(files.img.path);
                fields.img = '/static/uploads/' + name;
            }

            // 当修改了个人中的图片和昵称后需要将 session 中的信息进行更新
            req.session.user.nickname = fields.nickname;
            req.session.user.avatar = fields.img;

            // 将参数更新到数据库
            userDB.updateMsgById(fields, (err1, result) => {
                if (err1) {
                    return res.send({
                        status: 400,
                        msg: '出错啦'
                    });
                }

                res.send({
                    status: 200,
                    msg: '更新数据成功'
                });
            });
        });
    },

    // 得到修改密码的页面
    password_reset: (req, res) => {
        // 将修改密码的页面响应到浏览器
        // 从 session 获取登录用户名和头像
        let nickname = req.session.user.nickname;
        let avatar = req.session.user.avatar;

        res.render("password-reset", {
            nickname,
            avatar
        });
    },

    // 修改密码
    updatePwd: (req, res) => {
        // 接收参数
        let id = req.session.user.id;

        userDB.getPwdById(id, (err, result) => {
            // 验证密码是否正确
            if (req.body.old == result[0].password) {
                // 将新密码存入到数据库
                userDB.updateUsersPwd(id, req.body.password, (err, result) => {
                    if (err) {
                        return res.send({
                            status: 400,
                            msg: "出错了"
                        });
                    }

                    // 清除 session
                    req.session.user = null;

                    res.send({
                        status: 200,
                        msg: "密码更新成功"
                    });
                });
            } else {
                res.send({
                    status: 300,
                    msg: "旧密码验证失败"
                });
            }
        });
    }
}

//
function isXhrLogin(req, res) {
    if (!req.session.user) {
        res.send({
            status: 304,
            msg: "还没有登录"
        });
        return true;
    }
    return false;
}

//  
function isBroLogin(req, res) {
    if (!req.session.user) {
        return res.send('<script>alert("还没有登录");window.location="/login"</script>');
    }
}