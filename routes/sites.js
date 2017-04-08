/**
 * Created by schoeu on 2017/4/3.
 */
var express = require('express');
var router = express.Router();
var db = require('../src/db');
var sitesConn = db.getDb('sites');
var utils = require('../utils/utils');

router.post('/add', function (req, res, next) {
    var username = req.session.username;
    var sitename = req.body.sitename;
    var sitetags = req.body.sitetags;
    var siteurl = req.body.siteurl;
    var sitedesc = req.body.sitedesc;
    if (username && sitename && sitetags && siteurl) {
        sitesConn.findAll({
            attributes: ['name'],
            where: {
                username: username,
                name: sitename,
                tag: sitetags
            }
        }).then(function (user) {
            if (user.length) {
                res.returnJson({
                    status: 1
                });
            }
            else {
                return sitesConn.create({
                    username: username,
                    name: sitename,
                    uuid: utils.getUUID(),
                    tag: sitetags,
                    url: siteurl,
                    description: sitedesc
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
