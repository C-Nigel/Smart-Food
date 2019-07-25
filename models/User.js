const Sequelize = require('sequelize');
const db = require('../config/DBConfig');

const User = db.define('user', {
    admin_no: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
    },
    full_name: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    telegram_id: {
        type: Sequelize.STRING
    },
    phone_no: {
        type: Sequelize.INTEGER,
        length: 8
    },
    picture: {
        type: Sequelize.INTEGER,
        length: 8
    },
    admin_status: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
});

module.exports = User;