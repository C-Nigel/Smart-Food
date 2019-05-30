const express = require('express');
const router = express.Router();
var mysql = require("mysql2");

var con = mysql.createConnection({
    host: "bloopy.dyndns-home.com",
    //host: "diskstation",
    port: 3307,
    user: "guest",
    password: "password",
    database: "ooadp"

});
router.get('/', (req, res) => {
    const title = 'Smart Food';
    res.render('home', {title: title}) // renders views/home.handlebars
});

router.post('/register', (req, res) =>{
    var userId = function () {
        return '_' + Math.random().toString(36).substr(2, 9);
    };
    let { name, adminnumber, password, telegramId, phonenumber } = req.body;
    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        var sql = "INSERT INTO User(userId, name, adminnumber, password, telegramid, phonenumber) VALUES ?";
        var values = [userId, name, adminnumber, password, telegramId, phonenumber]
        con.query(sql, [values], function (err) {
            if (err) throw err;
            console.log("1 record inserted");
            con.end();
    res.redirect('/loginuser');
        });
    });
});

module.exports = router;