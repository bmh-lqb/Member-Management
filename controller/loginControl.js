// 引入 loginDB
const loginDB = require('../model/loginDB.js');

module.exports = {
    // 渲染 login 页面
    getLogin: (req, res) => {
        res.render('login', {});
    },

    // 提交登录数据的方法
    loginPostData: (req, res) => {
        // 接收提交的参数
        let params = req.body;

        // 调用 db 中的方法来验证参数的合法性(路由邮箱验证密码)
        loginDB.getPwdByEmail(params.email, (err, result) => {
            if (err) {
                return res.send({
                    status: 400,
                    msg: '验证出错'
                });
            }

            if (result.length == 0) {
                return res.send({
                    status: 401,
                    msg: '邮箱或者密码不正确'
                });
            } 

            if (result[0].password != params.password) {
                // 登录不成功
                return res.send({
                    status: 402,
                    msg: '密码错误'
                });
            }

            // 登录成功
            // 要将用户的登录信息保存起来
            req.session.user = {
                email: params.email,
                password: params.password,

                // 保存一个用户的昵称
                nickname: result[0].nickname,
                avatar:  result[0].avatar,
                id: result[0].id
            }

            res.send({
                status: 200,
                msg: "登陆成功"
            });
        });
    },

    // 退出登录
    loginOut: (req, res) => {
        // 服务器: 清除 session
        req.session.user = null;

        // 响应成功的信息给浏览器
        res.send({
            status: 200,
            msg: "退出成功"
        });
    }
}