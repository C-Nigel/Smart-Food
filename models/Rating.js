const Sequelize = require("sequelize");
const db = require("../config/DBConfig");

const Rating = db.define("rating", {
    queue_no: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    item_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    user_admin: {
        type: Sequelize.STRING,
        allowNull: false
    },
    telegram_id: {
        type: Sequelize.STRING
    },
    rating_given: {
        type: Sequelize.TINYINT,
        max: 5,
        min: 0,
        /*
        0 - 0 being the worst
        5 - 5 being the best
        */
        allowNull: false
    }
});

module.exports = Rating;