const db = require('./config/DBConnection');
const user = require('./class/user_class');
const item = require('./class/item_class');
const outlet = require('./class/outlet_class');
const chat = require('./class/chat_class');
const orders = require('./class/order_class');
const ratings = require('./class/rating_class');

db.setUpDB(true);


setTimeout(function () {
    user.createUser("180448W", "nigel", "hashedpass");
    user.createUser("w371", "raymond", "hashedpass");
    user.createUser("183722P", "deon", "hashedpass");
    user.createUser("w373", "malique", "hashedpass");
    user.createUser("184451J", "tim", "$2a$10$VzqBnIFxEaKzWn6IpHotouUtjz03HYOzN.ciZIRwa33hVT3H9PXcy");

    outlet.createOutlet("Chicken Rice@North", "hashedpass", "Selling chicken rice and other chicken-related food");
    outlet.createOutlet("Western@Foodgle", "hashedpass", "Selling all western food at Block P1");
    outlet.createOutlet("Thai@North", "hashedpass", "Selling all food from Thailand happy ending place");
    outlet.createOutlet("Manna@Food Connect", "hashedpass", "Somewhat mediocre junk food");
    outlet.createOutlet("Subway@Food Connect", "hashedpass", "Eat fresh");
    outlet.createOutlet("Boba Tea@South", "hashedpass", "Why is this a thing, what's so nice about drinking undigestable gelatin balls");
    outlet.createOutlet("Kebab Bub@Koufu", "hashedpass", "The turkey that wasn't pardoned");
    outlet.createOutlet("Korean@Koufu", "hashedpass", "Cashing in on the k-wave craze");

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


        //user.setTelegram("w369", "340756470");
        user.setTelegram("180448W", "239513475");
        user.setTelegram("w371", "328373671");
        user.setTelegram("w372", "574678173");
        user.setTelegram("w373", "573547962");
        user.setTelegram("184451J", "189727407");

        setTimeout(function () {
            orders.createOrder(1, "184451J");
            orders.createOrder(1, "184451J");
            orders.createOrder(2, "184451J");
            orders.createOrder(3, "184451J");
            orders.createOrder(1, "184451J");

            setTimeout(function () {
                ratings.createRatings();
            }, 3000)
        }, 1000);
    }, 1000);
}, 5000);
