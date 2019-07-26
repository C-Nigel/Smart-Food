const db = require("./DBConfig");
const order = require("../models/Order");
const outlet = require("../models/Outlet");
const item = require("../models/Item");
const user = require("../models/User");
const chat = require("../models/Chat");
const rating = require("../models/Rating");

const setUpDB = (drop) => {
    db.authenticate().then(
        () => {
            console.log('database connected');
        }
    ).then(
        () => {
            order.belongsTo(user, {foreignKey: 'user_admin'});
            order.belongsTo(item, {foreignKey: 'item_id'});
            item.belongsTo(outlet, {foreignKey: 'outlet_id'});
            chat.belongsTo(user, {foreignKey: 'user_admin'});
            rating.belongsTo(user, {foreignKey: 'user_admin'});
            rating.belongsTo(item, {foreignKey: 'item_id'});
            
            db.sync({ // Creates table if none exists
                force: drop
            }).then(
                () => {
                    //console.log('Create tables if none exists')
                }
            ).catch(err => console.log(err))
        }
    ).catch(err => console.log('Error: ' + err));
};

module.exports = { setUpDB };