var mysql = require("mysql2");

var con = mysql.createConnection({
    host: "bloopy.dyndns-home.com",
    //host: "diskstation",
    port: 3307,
    user: "guest",
    password: "password",
    database: "ooadp"
});

con.connect(function(err){
    if (err){
        console.log(err.message);
    }
    else{
        console.log("connected");
    }
});

con.end(function(err){
    if(!err){
        console.log("disconnected");
    }
});