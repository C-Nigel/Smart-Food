// This code is to create DataBase
// Bring in database connection
const db = require('../config/DBConnection');
const user = require('./user_class');
const item = require('./item_class');
const outlet = require('./outlet_class');
const chat = require('./chat_class');

// Connects to MySQL database
db.setUpDB(false); // To set up database with new tables set (true)
/*
user.createUser('w122', 'nigel cheong', 'pswd');
user.createUser('w123', 'lique ibrahim', 'pswd');


chat.systemMsg('w122', 'please enter your admin number');
chat.userMsg('w122', 'admin no is w122');
chat.userMsg('w122', 'confirm');
*/