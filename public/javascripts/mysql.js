const mysql = require('mysql');
const con = mysql.createConnection({
    // 传入参数，host为本机，port端口可不写默认为3306,
    //user:用户，password：密码,database:接连的数据库名
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '123456',
    database: 'blog'
});
//创建连接
con.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('连接数据库成功');
    }
});

// 查看
function getData(sql, arr = []) {
    return new Promise((resolve, reject) => {
        con.query(sql, arr, (err, res, filed) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        })
    })
};

// 修改
function setData(sql, arr) {
    return new Promise((resolve, reject) => {
        con.query(sql, arr, (err, res, filed) => {
            if (err) {
                reject(err);
            } else {
                resolve(true);
            }
        })
    })
};

// 增加
function addData(sql, arr) {
    return new Promise((resolve, reject) => {
        con.query(sql, arr, (err, res, filed) => {
            if (err) {
                reject(err);
            } else {
                resolve(true);
            }
        })
    })
};

// 删除
function delData(sql, arr) {
    return new Promise((resolve, reject) => {
        con.query(sql, arr, (err, res, filed) => {
            if (err) {
                reject(err);
            } else {
                resolve(true);
            }
        })
    })
};
module.exports = {
    getData,
    setData,
    addData,
    delData
}