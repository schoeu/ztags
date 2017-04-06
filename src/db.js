/**
 * Created by schoeu on 2017/4/3.
 */
var path = require('path');
var Sequelize = require('sequelize');
var schema = require('./schema');
var crtPath = path.join(__dirname, '..');
var dbConf = require(crtPath + '/src/config').path(crtPath + '/config/config_db.json');

module.exports = {
    getDb: function () {
        var sequelize = new Sequelize(
            dbConf.getItem('name'),
            dbConf.getItem('username'),
            dbConf.getItem('password'),
            {
                dialect: 'mysql',
                host: dbConf.getItem('address'),
                port: dbConf.getItem('port')
            }
        );

        var user = sequelize.define('user', schema.user(Sequelize));
        return user;
    }
};
