const categoryDB = require('../model/categoryDB.js')
module.exports = {
    // 直接返回 categories 页面
    categories: (req, res) => {
        // 传入一个 nickname
        let nickname = req.session.user.nickname;
        let avatar = req.session.user.avatar;
        res.render('categories', {
            nickname,
            avatar
        });
    },

    // 得到所有的分类数据
    getAllData: (req, res) => {
        // 直接调用封装好的方法
        categoryDB.selectAll((err, result) => {
            if (err) {
                return res.send({
                    status: 400,
                    msg: "数据异常"
                });
            }

            res.send({
                status: 200,
                msg: "数据获取成功",
                data: result
            });
        });

        // // 执行sql
        // let selSql = `SELECT * FROM categories`;

        // // 如果执行查询数据时出错了，也应该将错误信息返回给浏览器
        // categoryDB.query(selSql, (err, result) => {
        //     // 如果 err 存在说明，出错误了，返回出错信息
        //     if (err) {
        //         return res.send({
        //             status: 400,
        //             msg: '出错了'
        //         });
        //     }

        //     res.send({
        //         status: 200,
        //         msg: '查询成功',
        //         data: result
        //     });
        // });
    },

    // 新增一个分类
    addData: (req, res) => {
        // 接收参数
        let params = req.body;

        // 提交数据的到 mysql
        categoryDB.addData(params, (err, result) => {
            if (err) {
                return res.send({
                    status: 400,
                    msg: '新增失败'
                });
            }
            res.send({
                status: 200,
                msg: '新增成功'
            });
        });
    },

    // 批量删除
    delAllDataByIds: (req, res) => {
        // 获取要删除的参数
        let ids = req.body.id;
        ids = ids.join(',');

        // 调用方法
        categoryDB.delDataByIds(ids, (err, result) => {
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
    }
}