// This code is to create DataBase
// Bring in database connection
const db = require('../config/DBConnection');
const user = require('./user_class');
const item = require('./item_class');
const outlet = require('./outlet_class');
const chat = require('./chat_class');

// Connects to MySQL database
db.setUpDB(false); // To set up database with new tables set (true)

for (var i=0 ; i<5; i++){
    user.createUser('w12'+i.toString(), 'user'+i.toString(), 'pswd');
}

outlet.createOutlet('Chicken@North', null);