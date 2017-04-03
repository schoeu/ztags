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

    it('multiple config files', function () {
        var conf = config.path(__dirname + '/config/config_test');
        var conf1 = config.path(__dirname + '/config/config_test1');
        expect(conf.getItem('db_addr')).to.be.equal('1');
        expect(conf1.getItem('db_addr')).to.be.equal('0');
    });

    it('set test.', function () {
        var conf = config.path(__dirname + '/config/config_test');
        expect(conf.getItem('db_addr')).to.be.equal('1');
        conf.setItem('db_addr', '4');
        expect(conf.getItem('db_addr')).to.be.equal('4');
    });
});

