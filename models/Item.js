const Sequelize = require('sequelize');
const db = require('../config/DBConfig');


const Item = db.define('item', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    cat: {
        type: Sequelize.STRING
    },
    price: {
        type: Sequelize.DECIMAL
    },
    picture_url: {
        type: Sequelize.STRING
    },
    outlet_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

module.exports = Item;