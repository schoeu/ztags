/**
 * Created by schoeu on 2017/4/3.
 */

var dbConf = require('../src/config')('../config/config_db.json');

module.exports = {
    getDb: function () {
        var sequelize = new Sequelize(dbConf.getItem('name'), dbConf.getItem('username'), dbConf.getItem('password'), {
            host: dbConf.getItem('address'),
            dialect: 'mysql',

            pool: {
                max: 5,
                min: 0,
                idle: 10000
            }
        });
        return sequelize;
    }
};