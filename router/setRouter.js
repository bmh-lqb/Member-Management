const express = require("express");
const setControl = require("../controller/setControl.js");

const router = express.Router();

router.get('/nav-menus', setControl.nav_menus) // 得到导航菜单的静态页面
    .get('/getMenuList', setControl.getMenuList) // 得到导航菜单的所有数据
    .post('/addMenus', setControl.addMenus); // 新增导航菜单

module.exports = router