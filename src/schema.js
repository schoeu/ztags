/**
 * @file schema.js
 * */

module.exports = {
    user: function (Sequelize) {
        return {
            uuid: {
                type: Sequelize.UUID
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
            },
            avatar: {
                type: Sequelize.STRING
            }
        };
    },
    tags: function (Sequelize) {
        return {
            uuid: {
                type: Sequelize.UUID
            },
            name: {
                type: Sequelize.STRING
            },
            username: {
                type: Sequelize.STRING
            }
        };
    },
    sites: function (Sequelize) {
        return {
            uuid: {
                type: Sequelize.UUID
            },
            url: {
                type: Sequelize.STRING
            },
            name: {
                type: Sequelize.STRING
            },
            username: {
                type: Sequelize.STRING
            },
            icon: {
                type: Sequelize.STRING
            },
            tag: {
                type: Sequelize.STRING
            },
            description: {
                type: Sequelize.STRING
            }
        };
    }
};