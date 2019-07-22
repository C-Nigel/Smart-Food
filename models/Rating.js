const Sequelize = require("sequelize");
const db = require("../config/DBConfig");

const Rating = db.define("rating", {
    item_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    user_admin: {
        type: Sequelize.STRING,
        allowNull: false
    },
    rating_given: {
        type: Sequelize.TINYINT,
        max: 5,
        min: 0,
        /*
        0 - 0 being the worst
        5 - 5 being the best
        */
        allowNull: true
    }
});

module.exports = Rating;