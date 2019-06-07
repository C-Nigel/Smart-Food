const Sequelize = require("sequelize");
const db = require("../config/DBConfig");

const Outlet = db.define('outlet', {
    outlet_id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING
    }
});

module.export = Outlet;