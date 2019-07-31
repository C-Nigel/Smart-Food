const Sequelize = require("sequelize");
const db = require("../config/DBConfig");

const Outlet = db.define('outlet', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    desc: {
        type: Sequelize.STRING
    }
});

module.exports = Outlet;