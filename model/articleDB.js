const db = require("./db.js");

module.exports = {
    // 新增文章数据
    addPost: (obj, callback) => {
        // 拼接 sql 语句
        let sql = `INSERT INTO posts (slug, title, feature, created, content, status, user_id, category_id) VALUES ('${obj.slug}', '${obj.title}', '${obj.feature}', '${obj.created}', '${obj.content}', '${obj.status}', ${obj.user_id}, ${obj.category_id})`;

        // 执行 sql 语句
        db.query(sql, (err, result) => {
            callback(err, result);
        });
    },

    // 得到文章数据
    // 查询数据库
    getPostData: (option, callback) => {
        // 拼接 sql
        let sql = `SELECT posts.*,users.nickname, categories.name  FROM posts `;
        // 联表查询：与 users 相联
        sql += `LEFT JOIN users ON posts.user_id = users.id `;
        // 联表查询：与 categories 相联
        sql += `LEFT JOIN categories ON posts.category_id = categories.id WHERE 1 = 1 `;

        // 添加一个筛选条件 WHERE ...  and
        // 判断条件：
        let tiaoJian = ``;

        // 判断分类是否存在
        if (option.sel && option.sel != 0) {
            // 说明有分类条件
            tiaoJian += `and posts.category_id = ${option.sel} `;
        }

        // 判断状态是否存在 
        if (option.sta && option.sta != 0) {
            // 说明有状态条件
            tiaoJian += `and posts.status = '${option.sta}' `;
        }
        // 添加筛选条件
        sql += tiaoJian;

        // 排序：以 posts 表中的 id 进行排序
        sql += `ORDER BY posts.id desc `;

        // 分页： 从 (page - 1) * pagesize 开始，取 pagesize 条数据
        sql += `LIMIT ${(option.page - 1) * option.pageSize}, ${option.pageSize}; `;

        // 搜索数据的总条数
        sql += `SELECT count(*) FROM posts WHERE 1 = 1 `;
        sql += tiaoJian;

        // 执行 sql
        db.query(sql, (err, result) => {
            // 由于执行了两条 sql 语句，得到的结果是两个数组
            callback(err, result);
        });
    },

    // 通过 id 得到文章
    getPostById: (id, callback) => {
        // 拼接 sql
        let sql = `SELECT * FROM posts WHERE id = ${id};SELECT * FROM categories;`;

        // 执行 sql
        db.query(sql, (err, result) => {
            callback(err, result);
        });
    },

    updatePost: (obj, callback) => {
        // 拼接 sql
        let sql = `UPDATE posts SET title='${obj.title}', content='${obj.content}', slug='${obj.slug}', category_id=${obj.category},created='${obj.created}', status='${obj.status}', feature='${obj.feature}' WHERE id = ${obj.id}`;

        // 执行 sql
        db.query(sql, (err, result) => {
            callback(err, result)
        });
    }
}