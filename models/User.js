const Sequelize = require('sequelize');
const db = require('../config/dbConfig');
/* Creates a user(s) table in MySQL Database.
Note that Sequelize automatically pleuralizes the entity name as the table name
*/
const User = db.define('user', {
    admin_no: {
        type: Sequelize.STRING
    },
    full_name: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    },
    telegram_id: {
        type: Sequelize.STRING
    },
    phone_no: {
        type: Sequelize.INTEGER,
        length: 8
    }
    //admin_status: {
    //    type: Sequelize.BOOLEAN
    //}
});

module.exports = User;