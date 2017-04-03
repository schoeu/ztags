var express = require('express');
var router = express.Router();
var db = require('../src/db');
var userConn = db.getDb();

/* GET users listing. */
router.get('/login', function(req, res, next) {
    res.render('login', {title: 'Ztags'});
});

router.post('/login', function(req, res, next) {
    var userName = req.body.username;
    var password = req.body.password;
    if (userName && password) {
        userConn.findOne({
            where: {
                username: userName
            }
        }).then(function (user) {
            console.log('user', user);
            res.render('login', {title: 'Ztags'});
        });
    }
});

module.exports = router;
