/**
 * @file config_test.js
 * @description 接口测试文件
 * @author schoeu
 * */

var expect = require('chai').expect;
var config = require('../src/config');

describe('api config test.', function () {
    it('path test.', function () {
        var conf = config.path(__dirname + '/config/config_test');
        expect(conf.getItem('db_addr')).to.be.equal('1');
    });
});

