var express = require('express');
var router = express.Router();
var db = require('../src/db');
var utils = require('../utils/utils');
var userConn = db.getDb('user');
var config = require('../src/config').path('../config/config_app.json');

/**
 * 修改密码
 * */
router.get('/password', function (req, res, next) {
    var username = req.session.username;
    res.render('password', {
        username: username
    });
});

router.post('/password', function (req, res, next) {
    var username = req.session.username;
    var opsw = req.body.opsw;
    var password = req.body.password;
    var hashNewPsw = utils.getHash(password);
    if (opsw && username && password) {
        userConn.findOne({
            attributes: ['password'],
            where: {
                username: username
            }
        }).then(function (result) {
            var p = result.get('password');
            var hashPsw = utils.getHash(opsw);
            if (p === hashPsw) {
                return userConn.update({
                    password: hashNewPsw
                }, {
                    where: {
                        username: username
                    }
                });
            }
        }).then(function (r) {
            var returnStatus = 1;
            if (r) {
                returnStatus = 0;
            }
            res.returnJson({
                status: returnStatus
            });
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
            res.render('infos', {
                username: username,
                nickname: nickname,
                sex: sex,
                email: email,
                description: description,
                sign: sign
            });
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
    res.render('main');
});

/**
 * 注册
 * */
router.get('/signup', function (req, res, next) {
    res.render('signup');
});

router.post('/signup', function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    var hashPsw = utils.getHash(password);
    if (username && password) {
        req.session.username = username;
        userConn.findOne({
            attributes: ['password'],
            where: {
                username: username
            }
        }).then(function (user) {
            if (user.length) {
                res.returnJson({
                    status: 1
                });
            }
            else {
                return userConn.create({
                    username: username,
                    password: hashPsw,
                    uuid: utils.getUUID()
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
    res.render('login');
});

router.post('/login', function (req, res, next) {
    var userName = req.body.username;
    var password = req.body.password;
    if (userName && password) {
        userConn.findOne({
            attributes: ['password'],
            where: {
                username: userName
            }
        }).then(function (user) {
            var psw = user.get('password');
            var hashPsw = utils.getHash(password);
            if (psw === hashPsw) {
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
