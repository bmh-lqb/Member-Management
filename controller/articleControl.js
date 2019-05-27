const path = require("path");
const formidable = require("formidable");
const articleDB = require("../model/articleDB.js");

module.exports = {
    // 渲染文章页面
    postAdd: (req, res) => {
        // 去 session 中获取两个参数
        let nickname = req.session.user.nickname;
        let avatar = req.session.user.avatar;

        res.render("post-add", {
            nickname,
            avatar
        });
    },

    // 添加文章
    postSave: (req, res) => {
        // 接收参数
        let form = new formidable.IncomingForm();

        // 将图片保存到 upload 中
        form.uploadDir = path.join(__dirname, "../uploads");
        form.keepExtensions = true;
        form.parse(req, (err, fields, files) => {
            if (err) {
                return res.send({
                    status: 400,
                    msg: "新增失败"
                });
            }

            //  创建一个文章对象
            let obj = {
                slug: fields.slug,
                title: fields.title,
                created: fields.created,
                content: fields.content,
                status: fields.status,
                // 这是作者：去 session 的 user 中的 id 中获取
                user_id: req.session.user.id,
                category_id: fields.category
            }

            // 图片最后处理
            if (files.feature) {
                let name = path.basename(files.feature.path);
                obj.feature = name;
            } else {
                obj.feature = ''
            }

            // 保存到数据库
            articleDB.addPost(obj, (err1, result) => {
                if (err1) {
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
        });
    },

    // 得到所有文章页面
    posts: (req, res) => {
        let nickname = req.session.user.nickname;
        let avatar = req.session.user.avatar;

        res.render("posts", {
            nickname,
            avatar
        });
    },

    // 得到文章数据
    getPostData: (req, res) => {
        // 接收当前页和 pageSize
        let page = req.query.page;
        let pageSize = req.query.pageSize;
        let sel = req.query.sel; //　分类
        let sta = req.query.sta; // 状态

        // 将数据放进对象
        let option = {
            page,
            pageSize,
            sel,
            sta
        }

        // 调用操作数据库的方法
        articleDB.getPostData(option, (err, result) => {
            if (err) {
                return res.send({
                    status: 400,
                    msg: "err"
                });
            }

            res.send({
                status: 200,
                msg: "成功",
                data: result
            });
        });
    },

    // 处理 得到编辑页面
    post_edit: (req, res) => {
        let nickname = req.session.user.nickname;
        let avatar = req.session.user.avatar;

        res.render('post-edit', {
            nickname,
            avatar
        });
    },

    // 通过 id 得到指定的文章
    getPostById: (req, res) => {
        // 接收参数
        let id = req.query.id;

        // 获取数据
        articleDB.getPostById(id, (err, result) => {
            if (err) {
                res.send({
                    status: 400,
                    msg: "出错啦"
                });
            } else {
                res.send({
                    status: 200,
                    msg: "获取数据成功",
                    data: result
                });
            }
        });
    },

    // 修改文章
    updatePost: (req, res) => {
        // 接收参数
        let  form = new formidable.IncomingForm();

        // 设置保存的路径
        form.uploadDir = path.join(__dirname, "../uploads");

        // 保留后缀
        form.keepExtensions = true;

        form.parse(req, (err, fields, files) => {
            // 如果上传了图片，则需要得到这张图片的路径
            if (files.feature) {
                files.feature = '/static/uploads/' + path.basename(files.feature.path);
            }

            // 将对象更新到数据库
            articleDB.updatePost(fields, (err, result) => {
                if (err) {
                    res.send({
                        status: 400,
                        msg: "出错啦"
                    });
                } else {
                    res.send({
                        status: 200,
                        msg: "修改成功",
                    });
                }
            });
        });
    }
}