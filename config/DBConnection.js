const db = require("./DBConfig");
const food = require("../models//Food");
const order = require("../models/Order");
const outlet = require("../models/Outlet");
const user = require("../models/User");

const setUpDB = (drop) => {
    db.authenticate()
    .then(() => {
        console.log("db connected");
    })
    .then(() => {
        outlet.hasMany(food)
    })
}