const db = require("./DBConfig");
const order = require("../models/Order");
const outlet = require("../models/Outlet");
const item = require("../models/Item");
const user = require("../models/User");

const setUpDB = (drop) => {
    db.authenticate().then(
        () => {
            console.log('database connected');
        }
    ).then(
        () => {
            order.hasMany(user);
            order.hasMany(item);
            order.hasOne(outlet);
            item.hasOne(outlet);

            db.sync({ // Creates table if none exists
                force: drop
            }).then(
                () => {
                    console.log('Create tables if none exists')
                }
            ).catch(err => console.log(err))
        }
    ).catch(err => console.log('Error: ' + err));
};

module.exports = { setUpDB };