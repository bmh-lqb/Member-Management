// 执行所有与用户表相关的数据库操作
const mysql = require("mysql");

module.exports.query = (sql, callback) => {
    // 创建一个连接对象
    const connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "baixiu"
    });

    // 链接用户表
    connection.connect();

    // 执行 sql 语句
    connection.query(sql, (err, result) => {
        if (err) {
            throw new Error;
        }

        // 执行回调函数
        callback(result);
    });

    // 关闭连接
    connection.end();
}