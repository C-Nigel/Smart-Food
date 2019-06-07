const Sequelize = require("sequelize");
const db = require("../config/DBConfig");
const Outlet = require("../models/Outlet");

const Item = db.define("item", {
    name: {
        type: Sequelize.STRING,
    },
    description: {
        type: Sequelize.STRING
    },
    price: {
        type: Sequelize.DOUBLE
    },
    outlet: {
        type: Sequelize.STRING,
        references: {
            model: Outlet,
            key: "outlet_id"
        }
    }
});

module.export = Item;