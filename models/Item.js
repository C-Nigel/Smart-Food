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
        type: Sequelize.DOUBLE
    },
    picture_url: {
        type: Sequelize.STRING
    },
    outlet_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    average_rating: {
        type: Sequelize.DOUBLE,
        max: 5,
        min: 0,
        /*
        0 - 0 being the worst
        5 - 5 being the best
        */
        allowNull: true
    },
    total_rating: {
        type: Sequelize.INTEGER,
        allowNull: true
    }

});

module.exports = Item;