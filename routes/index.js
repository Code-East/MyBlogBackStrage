var express = require('express');
var router = express.Router();
var { getData, setData, addData } = require('../public/javascripts/mysql');

/* GET home page. */
/* GET home page. */
router.get('/', async function(req, res, next) {
    res.render('index', { title: 'Express' });
});
// 判断用户是否存在接口
router.post('/userdata', async function(req, res, next) {
    var sql = 'select * from bloguser where username = ? and password = ?';
    var arr = [req.query.username, req.query.password];
    // 获取数据库数据
    let list = await getData(sql, arr);
    // 判断是否存在数据
    if (list == '') {
        console.log('-1');
        res.send('-1') //表示用户不存在，即用户名或密码错误
    } else {
        // mycookie = true;
        res.send('0') //表示用户存在，用户名或密码正确
        console.log('0');
    }

});
// 获取是否登入接口
router.get('/isLogin', async function(req, res, next) {
    // 判断传过来的username是否为空，为空表示没有登入，则返回false
    if (req.query.username == '') {
        res.send(false); //没登入了返回true
    } else {
        let sql = 'select * from bloguser where username = ?';
        let arr = [req.query.username];
        let token = await getData(sql, arr);
        if (token[0].token == 'true') {
            res.send(true); //登入了返回true
            console.log('该用户已登入：', true);
        } else {
            res.send(false); //没登入了返回true
            console.log('该用户未登入:', false);
        }
    }
});
// 修改token接口
router.get('/setToken', async function(req, res, next) {
    var sql = 'UPDATE  bloguser SET  token = ? WHERE  username = ?'
    var arr = [req.query.token, req.query.username];
    //调用修改token函数
    var message = await setData(sql, arr);
    console.log('修改token为:', req.query.token);
});
//获取评论
router.get('/getcomment', async function(req, res) {
    let sql = 'select * from comment where articleid = ?';
    let arr = [req.query.id];
    console.log(req.query.id);
    let data = await getData(sql, arr);
    if (data == '') {
        res.send(false);
    } else {
        res.json(Array.from(data));
    }
});
// 增加评论
router.post('/addcomment', async function(req, res) {
    // let sql = 'insert into article(title,type,state,timer,mdcontext,htmlcontext,imgsrc) values(?,?,?,?,?,?,?)'
    let sql = 'insert into comment(user,email,time,content,articleid) values(?,?,?,?,?)';
    let arr = [req.query.user, req.query.email, req.query.time, req.query.content, req.query.articleid];
    let data = await addData(sql, arr);
    if (data) {
        res.send(true);
    } else {
        res.send(false);
    }
})
module.exports = router;