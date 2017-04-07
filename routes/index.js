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
                var rs = [];
                for (var i = 0, l = d.length; i < l; i++) {
                    var it = d[i];
                    if (it.dataValues && it.dataValues.name) {
                        rs.push(it.dataValues.name);
                    }
                }
                res.render('main', Object.assign({}, defaultInfos, {
                    username: username,
                    showTags: rs
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
