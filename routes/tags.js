/**
 * Created by schoeu on 2017/4/3.
 */
var express = require('express');
var router = express.Router();
var db = require('../src/db');
var tagsConn = db.getDb('tags');

router.get('/list', function(req, res, next) {
    var username = req.session.username;
    tagsConn.findAll({
        where: {
            username: username
        }
    }).then(function (result) {
        console.log(result);
        res.render('main', {title: 'Ztags'});
    }).catch(function (err) {
        res.returnJson({
            status: 1
        });
    });

});

module.exports = router;
