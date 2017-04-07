var express = require('express');
var router = express.Router();
var db = require('../src/db');
var tagsConn = db.getDb('tags');

var defaultInfos = {
    title: 'Ztags'
};

/* GET home page. */
router.get('/', function(req, res, next) {
    var username = req.session.username;
    if (username) {
        tagsConn.findAll({
            attributes: ['name'],
            where: {
                username: username
            }
        }).then(function (d) {
            if (d.length) {
                var showTags = d.map(function (it) {
                    if (it.dataValues && it.dataValues.name) {
                        return it.dataValues.name;
                    }
                });
                res.render('main', Object.assign({}, defaultInfos, {
                    username: username,
                    showTags: showTags
                }));
            }
        }).catch(function (e) {
        });
    }
    else {
        res.render('main', Object.assign({}, defaultInfos, {
            username: username
        }));
    }

});

module.exports = router;
