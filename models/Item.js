const Sequelize = require("sequelize");
const db = require("../config/DBConfig");


const Item = db.define('item', {
    name: {
        type: Sequelize.STRING
    },
    cat: {
        type: Sequelize.STRING
    },
    price: {
        type: Sequelize.DOUBLE
    },
    outlet_id: {
        type: Sequelize.INTEGER,
    }
});

module.exports = Item;