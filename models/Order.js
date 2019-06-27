const Sequelize = require("sequelize");
const db = require("../config/DBConfig");

const Order = db.define("order", {
    queue_no: {
        type: Sequelize.INTEGER,
    },
    item_id: {
        type: Sequelize.INTEGER
    },
    user_id: {
        type: Sequelize.INTEGER
    },
    total_price: {
        type: Sequelize.DOUBLE
    },
    status: {
        type: Sequelize.TINYINT,
        max: 2,
        min: 0
        /*
        0 - order received
        1 - being prepared
        2 - ready
        */
    }
});

module.exports = Order;