/**
 * Created by schoeu on 2017/4/3.
 */
var express = require('express');
var router = express.Router();

router.get('/page', function(req, res, next) {
    res.render('main', {title: 'Ztags'});
});

module.exports = router;
