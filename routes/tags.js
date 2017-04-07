/**
 * Created by schoeu on 2017/4/3.
 */
var express = require('express');
var router = express.Router();
var db = require('../src/db');
var tagsConn = db.getDb('tags');
var utils = require('../utils/utils');

router.get('/list', function (req, res, next) {
    var username = req.session.username;
    tagsConn.findAll({
        where: {
            username: username
        }
    }).then(function (result) {
        res.render('main', {title: 'Ztags'});
    }).catch(function (err) {
        res.returnJson({
            status: 1
        });
    });

});

router.post('/add', function (req, res, next) {
    var username = req.session.username;
    var tagname = req.body.tagname;
    if (username && tagname) {
        tagsConn.findAll({
            attributes: ['name'],
            where: {
                username: username,
                name: tagname
            }
        }).then(function (user) {
            if (user.length) {
                res.returnJson({
                    status: 1
                });
            }
            else {
                return tagsConn.create({
                    username: username,
                    name: tagname,
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
    else {
        res.returnJson({
            status: 1
        });
    }
});

module.exports = router;
