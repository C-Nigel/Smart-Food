const db = require('./config/DBConnection');
const user = require('./class/user_class');
const item = require('./class/item_class');
const outlet = require('./class/outlet_class');
const chat = require('./class/chat_class');
const orders = require('./class/order_class');
const ratings = require('./class/rating_class');

db.setUpDB(true);

setTimeout(function () {
    //user.createUser("w369", 'tashi', "hashbrowns");
    user.createUser("180448W", "nigel", "gaypt1");
    user.createUser("w371", "raymond", "gaypt2");
    user.createUser("w372", "deon", "penguin");
    user.createUser("w373", "malique", "tank");
    user.createUser("184451J", "tim", "$2a$10$zEV3Pi6567KF8NxMHZwzi.giRfvtdr5CZ2uHLLn/2zS4lR662U6ae");

    outlet.createOutlet("Chicken Rice@North", "$2a$10$zEV3Pi6567KF8NxMHZwzi.giRfvtdr5CZ2uHLLn/2zS4lR662U6ae", "Selling chicken rice and other chicken-related food");
    outlet.createOutlet("Western@Foodgle", "$2a$10$zEV3Pi6567KF8NxMHZwzi.giRfvtdr5CZ2uHLLn/2zS4lR662U6ae", "Selling all western food at Block P1");
    outlet.createOutlet("Thai@North", "$2a$10$zEV3Pi6567KF8NxMHZwzi.giRfvtdr5CZ2uHLLn/2zS4lR662U6ae", "Selling all food from Thailand happy ending place");
    outlet.createOutlet("Manna", "")

    setTimeout(function () {
        item.createItem("Roasted Chicken", "Chinese", 2.5, 1);
        item.createItem("Steamed Chicken", "Chinese", 2.3, 1);
        item.createItem("Lemon Chicken", "Chinese", 2.7, 1);
        item.createItem("Char Siew", "Chinese", 2.6, 1);
        item.createItem("Pecan Jam", "Western", 4.5, 2);
        item.createItem("Cheesecake", "Western", 2.9, 2);
        item.createItem("Double Cheeseburger", "Western", 5, 2);
        item.createItem("Chicken Chop", "Western", 4, 2);
        item.createItem("Fish Porridge", "Chinese", 1.5, 1);


        user.setTelegram("w369", "340756470");
        user.setTelegram("180448W", "239513475");
        user.setTelegram("w371", "328373671");
        user.setTelegram("w372", "574678173");
        user.setTelegram("w373", "573547962");
        user.setTelegram("w374", "189727407");
        
        setTimeout(function () {
            orders.createOrder(1, "w374");
            orders.createOrder(1, "w374");
            orders.createOrder(2, "w374");
            orders.createOrder(3, "w374");
            orders.createOrder(1, "w374");

            setTimeout(function () {
                ratings.createRatings();
            }, 3000)
        }, 1000);
    }, 1000);
}, 1000);
