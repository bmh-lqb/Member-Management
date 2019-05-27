// 连接数据库

const mysql = require("mysql");

module.exports.query = (sql, callback) => {
    // 创建一个连接对象
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'baixiu',
        multipleStatements: true // 允许 mysql 执行多条 sql 语句
    });

    // 用户链接
    connection.connect();

    // 执行 sql 语句
    connection.query(sql, (err, result) => {
        if (err) {
            return callback(err, null); // 将错误信息交给了回调函数
        }

        // 执行成回调函数
        callback(null, result);
    });
    
    // 关闭连接
    connection.end();
}