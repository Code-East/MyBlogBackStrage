var express = require('express');
var router = express.Router();
var { getData, setData, delData, addData } = require('../public/javascripts/mysql');

// 获取分类数据
router.get('/', async function(req, res, next) {
    let sql, arr;
    console.log(req.query.hasOwnProperty('id'));
    if (req.query.hasOwnProperty('id')) {
        sql = 'select * from classify where id = ?';
        arr = [req.query.id];
    } else {
        sql = 'select * from classify';
        arr = [];
    }
    let classdata = await getData(sql, arr);
    if (classdata == '') {
        res.send(false);
    } else {
        res.json(Array.from(classdata));
    }
});
// 删除分类数据
router.post('/delclassify', async function(req, res, next) {
    let sql = 'delete from classify where id = ?';
    let arr = [Number.parseInt(req.query.id)];
    let classdata = await delData(sql, arr);
    if (classdata) {
        res.send(true);
    } else {
        res.send(false);
    }
});
// 增加分类
router.post('/addclassify', async function(req, res, next) {
    let sql = 'insert into classify (name) values (?)';
    let arr = [req.query.name]
    let classdata = await addData(sql, arr);
    if (classdata) {
        console.log(true);
        res.send(true);
    } else {
        console.log(false);
        res.send(false);
    }
});
// 修改分类
router.post('/setclassify', async function(req, res, next) {
    let sql = 'update classify set name = ? where id = ?';
    let arr = [req.query.name, req.query.id]
    let classdata = await setData(sql, arr);
    if (classdata) {
        console.log(true);
        res.send(true);
    } else {
        console.log(false);
        res.send(false);
    }
});
module.exports = router;