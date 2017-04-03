/**
 * @file config.js
 * @description 配置操作
 * @author schoeu
 * */

module.exports = {
    path: function (p) {
        var config = require(p);
        var confIns = new Conf(config);
        return confIns;
    }
};

function Conf(config) {
    this.config = config || {};
}

Conf.prototype = {
    constructor: Conf,
    getItem: function (key) {
        var me = this;
        var conf = me.config;
        if (conf && key) {
            return conf[key];
        }
        return '';
    },
    setItem: function (key, value) {
        var me = this;
        if (key && value) {
            me.config[key] = value;
            return true;
        }
        return false;
    }
};

