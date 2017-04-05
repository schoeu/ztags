var express = require('express');
var uuid = require('uuid/v4');
var router = express.Router();
var db = require('../src/db');
var utils = require('../utils/utils');
var userConn = db.getDb();
var config = require('../src/config').path('../config/config_app.json');

var defaultInfos = {
    title: config.getItem('title')
};

/**
 * 修改密码
 * */
router.get('/password', function (req, res, next) {
    var username = req.session.username;
    res.render('password', Object.assign({}, {
        username: username
    }, defaultInfos));
});

router.post('/password', function (req, res, next) {
    var username = req.session.username;
    var opsw = req.body.opsw;
    var password = req.body.password;
    if (opsw && username) {
        userConn.findOne({
            attributes: ['password'],
            where: {
                username: username
            }
        }).then(function (result) {
            var p = result.get('password');
            if (p === opsw) {
                return userConn.update({
                    password: password
                }, {
                    where: {
                        username: username
                    }
                });
            }
        }).then(function (r) {
            if (r) {
                res.returnJson({
                    status: 0
                });
            }
        }).catch(function (err) {
            res.returnJson({
                status: 1
            });
        });
    }
    else {
        res.returnJson({
            status: 1
        });
    }
});

/**
 * 修改个人信息
 * */
router.get('/infos', function (req, res, next) {
    var username = req.session.username;
    if (username) {
        userConn.findOne({
            attributes: ['nickname', 'sex', 'email', 'description', 'sign', 'sex'],
            where: {
                username: username
            }
        }).then(function (user) {
            var nickname = user.get('nickname');
            var sex = user.get('sex');
            var email = user.get('email');
            var description = user.get('description');
            var sign = user.get('sign');
            res.render('infos', Object.assign({}, {
                username: username,
                nickname: nickname,
                sex: sex,
                email: email,
                description: description,
                sign: sign
            }, defaultInfos));
        }).catch(function (e) {
            console.log(e);
        });
    }
});

router.post('/infos', function (req, res, next) {
    var username = req.session.username;
    var nickname = req.body.nickname;
    var sex = req.body.sex;
    var email = req.body.email;
    var description = req.body.description;
    var sign = req.body.sign;
    if (username) {
        userConn.update({
            nickname: nickname,
            sex: sex,
            email: email,
            description: description,
            sign: sign
        }, {
            where: {
                username: username
            }
        }).then(function (result){
            res.returnJson({
                status: 0
            });
        }).catch(function(err){
            res.returnJson({
                status: 1
            });
        });
    }
});

/**
 * 注销
 * */
router.get('/signout', function (req, res, next) {
    req.session.username = '';
    res.render('main', defaultInfos);
});

/**
 * 注册
 * */
router.get('/signup', function (req, res, next) {
    res.render('signup', defaultInfos);
});

router.post('/signup', function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    if (username && password) {
        req.session.username = username;
        userConn.findOne({
            attributes: ['password'],
            where: {
                username: username
            }
        }).then(function (user) {
            if (user && user.$options.raw) {
                res.returnJson({
                    status: 1
                });
            }
            else {
                return userConn.create({
                    username: username,
                    password: password,
                    uuid: uuid()
                });
            }
        }).then(function (u) {
            if (u) {
                res.returnJson({
                    status: 0
                });
            }
        }).catch(function (e) {
            res.returnJson({
                status: 1
            });
        });

    }
});

/**
 * 登录
 * */
router.get('/login', function (req, res, next) {
    res.render('login', defaultInfos);
});

router.post('/login', function (req, res, next) {
    var userName = req.body.username;
    var password = req.body.password;
    if (userName && password) {
        userConn.findOne({
            where: {
                username: userName
            }
        }).then(function (user) {
            var psw = user.get('password');
            if (psw === password) {
                req.session.username = userName;
                userConn.update({
                    lastLogin: utils.dateFormat(new Date(), 'yyyy-MM-dd HH:mm:ss')
                }, {
                    where: {
                        username: userName
                    }
                });
                res.returnJson({
                    status: 0
                });
            }
            else {
                res.returnJson({
                    status: 1
                });
            }
        }).catch(function (e) {
        });
    }
});

module.exports = router;
