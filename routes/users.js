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

/* GET users listing. */
router.get('/password', function (req, res, next) {
    res.render('password');
});

router.post('/password', function (req, res, next) {
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

/* GET users listing. */
router.get('/login', function (req, res, next) {
    res.render('login', defaultInfos);
});

/* GET users listing. */
router.get('/signout', function (req, res, next) {
    req.session.username = '';
    res.render('main', defaultInfos);
});

/* GET users listing. */
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
