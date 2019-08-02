const Sequelize = require('sequelize');
const db = require('../config/DBConfig');

const Admin = db.define('admin', {
    Admin_ID : {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
    },
    password : {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Admin;