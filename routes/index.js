var express = require('express');
var router = express.Router();
var db = require('../src/db');
var tagsConn = db.getDb('tags');
var sitesConn = db.getDb('sites');

/* GET home page. */
router.get('/', function(req, res, next) {
    var username = req.session.username;
    if (username) {
        tagsConn.findAll({
            attributes: ['name', 'uuid'],
            where: {
                username: username
            }
        }).then(function (d) {
            if (d.length) {
                var rs = [];
                for (var i = 0, l = d.length; i < l; i++) {
                    var it = d[i];
                    if (it.dataValues && it.dataValues.name) {
                        rs.push({
                            name: it.dataValues.name,
                            value: it.dataValues.uuid
                        });
                    }
                }
                res.render('main', {
                    username: username,
                    showTags: rs
                });
            }
            else {
                res.render('main', {
                    username: username
                });
            }
        }).catch(function (e) {
            console.log('DB Error: ' + e);
        });
    }
    else {
        tagsConn.findAll({
            attributes: ['name', 'uuid'],
            limit: 15
        }).then(function (d) {
            if (d.length) {
                var rs = [];
                for (var i = 0, l = d.length; i < l; i++) {
                    var it = d[i];
                    if (it.dataValues && it.dataValues.name) {
                        rs.push({
                            name: it.dataValues.name,
                            value: it.dataValues.uuid
                        });
                    }
                }
                res.render('main', {
                    username: username,
                    showTags: rs
                });
            }
        }).catch(function (e) {
        });
    }
});

module.exports = router;
