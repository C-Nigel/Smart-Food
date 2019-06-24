const Sequelize = require("sequelize");
const db = require("../config/DBConfig");

const Outlet = db.define('outlet', {
    name: {
        type: Sequelize.STRING
    }
});

module.exports = Outlet;