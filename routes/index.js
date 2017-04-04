var express = require('express');
var router = express.Router();

var defaultInfos = {
    title: 'Ztags'
};

/* GET home page. */
router.get('/', function(req, res, next) {
    var username = req.session.username;
    var showInfos = {};
    if (username) {
        showInfos = Object.assign({}, defaultInfos, {
            username: username
        });
    }
    res.render('main', showInfos);
});

module.exports = router;
