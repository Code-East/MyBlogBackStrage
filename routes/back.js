var express = require('express');
var router = express.Router();
var { getData, setData, delData, addData } = require('../public/javascripts/mysql');
const url = require('url');
const { send } = require('process');



/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});
// 获取一表格文章接口
router.get('/article', async function(req, res, next) {
    let sql;
    let arr;
    if (req.query.hasOwnProperty('id')) {
        sql = 'select * from article where id = ?';
        arr = [req.query.id];
    } else {
        sql = 'select * from article limit ?,?';
        arr = [Number.parseFloat(req.query.start), Number.parseFloat(req.query.end)];
    }
    let articleData = await getData(sql, arr);
    res.json(Array.from(articleData));
});
// 获取文章总数接口
router.get('/articlelen', async function(req, res, next) {
    let sql = 'select * from article ';
    let articleData = await getData(sql);
    res.send(articleData);
});
// 存入文章接口
router.post('/store', async function(req, res, next) {
    let sql = 'insert into article(title,type,state,timer,mdcontext,htmlcontext,imgsrc) values(?,?,?,?,?,?,?)'
        // 因为文章的分类可能有多种所以要循环，使用-组合成一组存入
    let type = '';
    for (let i of req.query.type) {
        type = i + ' ' + type;
    }
    var arr = [req.query.title, type, req.query.state, req.query.timer, req.query.mdcontext, req.query.htmlcontext, req.query.imgsrc];
    let message = addData(sql, arr);
    if (message) {
        res.send(true)
    } else {
        res.send(false)
    }
});
// 搜索文章接口
router.post('/search', async function(req, res, next) {
    // 使用模糊查询
    let sql;
    // 传过的其中一个可能是空的所以要判断
    if (req.query.title == '') {
        sql = 'select * from article where type like "%' + req.query.type + '%"';
    } else if (req.query.type == '') {
        sql = 'select * from article where title like "%' + req.query.title + '%"';
    } else {
        sql = 'select * from article where title like "%' + req.query.title + '%"' + ' or type like "%' + req.query.type + '%"';
    }
    // 获取数据库数据
    let data = await getData(sql);
    if (data == '') {
        // 将数据和信息传到前端
        let message = false;
        res.json({ data, message });
    } else {
        // 将数据和信息传到前端
        let message = true;
        res.json({ data, message });
    }
});
// 删除文章接口
router.post('/del', async function(req, res, next) {
        let sql = 'delete from article where id = ?';
        let arr = [req.query.id];
        let message = await delData(sql, arr);
        if (message != '') {
            res.send(true); //成功返回true
        } else {
            res.send(false); //失败返回false
        }
    })
    // 修改文章接口
router.post('/setarticle', async function(req, res, next) {
    let sql = 'UPDATE  article SET title = ?, type = ?, state = ?,timer = ?, mdcontext = ?, htmlcontext = ?, imgsrc = ? where id = ?';
    let type = '';
    for (let i of req.query.type) {
        type = i + ' ' + type;
    }
    var arr = [req.query.title, type, req.query.state, req.query.timer, req.query.mdcontext, req.query.htmlcontext, req.query.imgsrc, req.query.id];
    let message = await getData(sql, arr);
    console.log(message);
    if (message) {
        res.send(true);
    } else {
        res.send(false);
    }
})
module.exports = router;