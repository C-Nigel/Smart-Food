const Sequelize = require('sequelize');
const db = require('../config/DBConfig');

const Chat = db.define('chat', {
    sender: {
        type: Sequelize.STRING,
        allowNull: false
    },
    recipient: {
        type: Sequelize.STRING,
        allowNull: false
    },
    msg: {
        type: Sequelize.STRING
    },
    user_admin: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Chat;