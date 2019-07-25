const Sequelize = require("sequelize");
const db = require("../config/DBConfig");

const Order = db.define("order", {
    item_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    item_name: {
        type: Sequelize.STRING
    },
    user_admin: {
        type: Sequelize.STRING,
        allowNull: false
    },
    outlet_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    status: {
        type: Sequelize.TINYINT,
        max: 2,
        min: 0,
        /*
        0 - being prepared
        1 - ready
        2 - collected
        */
       allowNull: false
    }
});

module.exports = Order;