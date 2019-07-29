// This code is to create DataBase
// Bring in database connection
const db = require('./config/DBConnection');
const user = require('./class/user_class');
const item = require('./class/item_class');
const outlet = require('./class/outlet_class');
const chat = require('./class/chat_class');
const orders = require('./class/order_class');

// Connects to MySQL database
db.setUpDB(true); // To set up database with new tables set (true)

setTimeout(function () {
    for (var i = 0; i < 5; i++) {
        user.createUser('w12' + i.toString(), 'user' + i.toString(), 'pswd');
    }

    //user.createUser("w369", 'tashi', "hashbrowns");
    user.createUser("180448W", "nigel", "gaypt1");
    user.createUser("w371", "raymond", "gaypt2");
    user.createUser("w372", "deon", "penguin");
    user.createUser("w373", "malique", "tank");
    user.createUser("w374", "tim", "oxfords");

    outlet.createOutlet("Chicken Rice@North", "", "Selling chicken rice and other chicken-related food");
    outlet.createOutlet("Western@Foodgle", "", "Selling all western food at Block P1");
    outlet.createOutlet("Thai@North", "", "Selling all food from Thailand happy ending place");

    setTimeout(function () {
        item.createItem("Roasted Chicken", "Chinese", 2.5, 1);
        item.createItem("Steamed Chicken", "Chinese", 2.3, 1);
        item.createItem("Lemon Chicken", "Chinese", 2.7, 1);
        item.createItem("Char Siew", "Chinese", 2.6, 1);
        item.createItem("Pecan Jam", "Western", 4.5, 2);
        item.createItem("Cheesecake", "Western", 2.9, 2);
        //item.createItem("")

        user.setTelegram("w369", "340756470");
        user.setTelegram("180448W", "239513475");
        user.setTelegram("w371", "328373671");
        user.setTelegram("w372", "574678173");
        user.setTelegram("w373", "573547962");
        user.setTelegram("w374", "189727407");
        
        setTimeout(function () {
            orders.createOrder(1, "w120");
            orders.createOrder(1, "w121");
            orders.createOrder(2, "w122");
            orders.createOrder(3, "w120");
            orders.createOrder(1, "w123");
        }, 2000);
    }, 2000);
}, 2000);
