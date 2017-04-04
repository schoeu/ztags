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
            var psw = user.get('password');
            if (psw === password) {
                req.session.username = userName;
                res.json({
                    errno: 0,
                    status: 0
                });
            }
            else {
                res.json({
                    errno: 0,
                    status: 1
                });
            }
        }).catch(function (e) {
            console.log(e);
        });
    }
});

module.exports = router;
