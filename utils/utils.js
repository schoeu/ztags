/**
 * @file utils.js
 *
 * 公共方法
 * */

var crypto = require('crypto');

module.exports = {
    dateFormat: function (date, fmt) {
        var o = {
            'M+': date.getMonth() + 1,
            'd+': date.getDate(),
            'h+': date.getHours(),
            'm+': date.getMinutes(),
            's+': date.getSeconds(),
            'q+': Math.floor((date.getMonth() + 3) / 3),
            'S': date.getMilliseconds()
        };
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
        }
        for (var k in o) {
            if (new RegExp('(' + k + ')').test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k])
                    : (('00' + o[k]).substr(('' + o[k]).length)));
            }
        }
        return fmt;
    },
    getHash: function (str) {
        if (typeof str === 'string') {
            return crypto.createHash('sha1').update(str).digest('hex');
        }
        return '';
    }
};