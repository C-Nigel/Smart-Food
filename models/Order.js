const Sequelize = require("sequelize");
const db = require("../config/DBConfig");
/*
const User = require("../models/User");
const Outlet = require("../models/Outlet");
const Food = require("../models/Food");
*/

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
    }
});

module.exports = Order;