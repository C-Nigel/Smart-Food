const Sequelize = require("sequelize");
const db = require("../config/DBConfig");
const User = require("../models/User");
const Outlet = require("../models/Outlet");
const Food = require("../models/Food");

const Order = db.define("order", {
    queue_no:{
        type: Sequelize.INTEGER,
    },
    item: {
        type: Sequelize.INTEGER,
        references: {
            model: Food,
            key: "id"
        }
    },
    outlet: {
        type: Sequelize.INTEGER,
        references: {
            model: Outlet,
            key: "id"
        }
    },
    user: {
        type: Sequelize.INTEGER,
        references: {
            model: User,
            key: "id"
        }
    },
    total_price: {
        type: Sequelize.DOUBLE
    }
});

module.exports = Order;