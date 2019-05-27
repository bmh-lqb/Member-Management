// 封装了 db.js 之后的代码
// 用来封装所有操作数据库的代码
const db = require('./db.js');

module.exports = {
    query: db.query,

    // 用来获取所有的数据分类
    selectAll: function (callback) {
        // 接收 sql 语句
        let selSql = `SELECT * FROM categories`;

        // 执行 sql 语句
        db.query(selSql, (err, result) => {
            callback(err, result);
        });
    },

    // 根据接收到的数据插入一条数据到 mysql
    // obj: 包括将来要插入到数据库中的别名和name
    addData: function (obj, callback) {
        // 接收 sql 语句
        let insertSql = `INSERT INTO categories (slug, name) VALUES ('${obj.slug}', '${obj.name}')`;

        // 执行 
        db.query(insertSql, (err, result) => {
            callback(err, result);
        });
    },

    // 批量删除
    delDataByIds: function (ids, callback) {
        // 接收 sql 语句
        let sql = `DELETE FROM categories WHERE id in (${ids})`;

        // 执行 sql 代码
        db.query(sql, (err, result) => {
            callback(err, result);
        });
    }
}



//------------------- 没有封装 db.js 文件之前的代码 -----------------------
// // 执行分类表的 db 文件
// // 执行所有与用户表相关的数据库操作
// const mysql = require("mysql");

// module.exports.query = (sql, callback) => {
//     // 创建一个连接对象
//     const connection = mysql.createConnection({
//         host: "localhost",
//         user: "root",
//         password: "root",
//         database: "baixiu"
//     });

//     // 用户链接
//     connection.connect();

//     // 执行 sql 语句
//     connection.query(sql, (err, result) => {
//         if (err) {
//             return callback(err, null);
//         }

//         // 执行回调函数
//         callback(null, result);
//     });

//     // 关闭连接
//     connection.end();
// }