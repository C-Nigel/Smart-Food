// This code is to create DataBase
// Bring in database connection
const db = require('../config/DBConnection');
const chat = require('./chat_class');

// Connects to MySQL database
db.setUpDB(false); // To set up database with new tables set (true)

chat.getUserChatByUserId("m1").then(msgs => {
    console.log(msgs);
});