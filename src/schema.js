/**
 * @file schema.js
 * */

module.exports = {
    user: function (Sequelize) {
        return {
            uuid: {
                type: Sequelize.STRING
            },
            email: {
                type: Sequelize.STRING
            },
            lastLogin: {
                type: Sequelize.STRING
            },
            password: {
                type: Sequelize.STRING
            },
            username: {
                type: Sequelize.STRING
            },
            sex: {
                type: Sequelize.STRING
            },
            description: {
                type: Sequelize.STRING
            },
            sign: {
                type: Sequelize.STRING
            },
            nickname: {
                type: Sequelize.STRING
            }
        };
    },
    tags: function (Sequelize) {
        return {
            uuid: {
                type: Sequelize.STRING
            }
        };
    }
};