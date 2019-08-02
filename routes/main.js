const express = require('express')
const router = express.Router();
const sessionStorage = require('node-sessionstorage');
const orders = require('../class/order_class');
const users = require('../class/user_class');
const bot = require('../config/telegram');
const rating = require('../class/rating_class');
const itemModel = require('../models/Item');
const ratingModel = require('../models/Rating');
const variable = require('../class/user_class');


router.get('/', (req, res) => {
	var User = sessionStorage.getItem("user");
	var Owners = sessionStorage.getItem("owners");
	const title = 'Smart Food';
	rating.countTotalItems().then(num => {
		for (var i = 1; i <= num; i++) {
			rating.averageRating(i)
		}
	})
	res.render('home', {
		title: title,
		User,
		Owners
	}); // renders views/home.handlebars
});

// testing the feature for the menu of different canteen


router.get('/loginuser', (req, res) => {
	res.render('user/loginuser') // renders views/user/loginuser.handlebars
});

router.get('/loginseller', (req, res) => {
	res.render('user/loginseller') // renders views/user/loginseller.handlebars
});

router.get('/index', (req, res) => {
	res.render('index') // renders views/user/loginuser.handlebars
});

router.get('/loginadmin', (req, res) => {
	res.render('loginadmin')
});

router.get('/register', (req, res) => {
	res.render('user/register') // renders views/user/register.handlebars
});

router.get('/forgetpw', (req, res) => {
	res.render('user/forgetpw') // renders views/user/forgetpw.handlebars
});

router.get('/changepassword', (req, res) => {
	res.render('user/changepassword') // renders views/user/forgetpw.handlebars
});

router.get('/profile', (req, res) => {
	var User = sessionStorage.getItem("user");
	console.log(User);
	if (User) {
		variable.getUserByAdmin(User).then(user => {
			console.log(user);
			var admin_no = user.admin_no;
			var full_name = user.full_name;
			var phone_no = user.phone_no;
			var telegram_id = user.telegram_id;
			var picture = user.picture;
			res.render('user/profile', {
				User,
				admin_no,
				full_name,
				phone_no,
				telegram_id,
				picture
			}
			);
		})
	}
	else {
		res.render('user/profile');
	}

});


// deon's cart + menu stuff


router.get('menu/menu', (req, res) => {
	res.render('menu/menu')
});

router.get('/stallownerConfig', (req, res) => {
	res.render('stallowner/stallownerConfig')
});

router.get('/menuDemo', (req, res) => {
	res.render('menu/menuDemo')
});

router.get('/menuAlpha', (req, res) => {
	res.render('menu/menuAlpha')
});

// testing in progress

// displaying old chinese menu 
router.get('menu/menu-chinese-old', (req, res) => {
	res.render('menu/menu-chinese-old')
});

// working on smth new for chinese menu
router.get('menu/menu-chinese', (req, res) => {
	res.render('menu/menu-chinese')
});


// displaying only malay food
/*
router.get('menu/menu-malay', (req, res) =>{
	res.render('menu/menu-malay')
});
*/

// displaying only indian menu, non-halal
router.get('menu/menu-indian', (req, res) => {
	res.render('menu/menu-indian')
});

// displaying only western menu
router.get('menu/menu-western', (req, res) => {
	res.render('menu/menu-western')
});

// displaying only fusion menu
router.get('menu/menu-fusion', (req, res) => {
	res.render('menu/menu-fusion')
});


// displaying only desserts menu
router.get('menu/menu-desserts', (req, res) => {
	res.render('menu/menu-desserts')
});

// displaying only drinks menu
router.get('menu/menu-drinks', (req, res) => {
	res.render('menu/menu-drinks')
});

// displaying only vegetarian menu
router.get('menu/menu-vegetarian', (req, res) => {
	res.render('menu/menu-vegetarian')
});


// testing 1 handlebar menu 
/*
router.get('menu/menu-{{cat}}', (req, res) =>{
	res.render('menu/menu-{{cat}}')
});
*/

/*
router.get('/showAddedItems', (req, res) =>{
	res.render('cart/MainMenu')
});
*/

// Setting up Stall Owner Config after clearing directory
/*
router.get('/stallownerConfig', (req, res) =>{
	res.render('stallowner/stallownerConfig') 
	// renders views/stallowner/stallownerConfig.handlebars
});
*/


router.get('/logout', (req, res) => {
	sessionStorage.removeItem("user");
	res.redirect('/');
});

router.get('/orders', (req, res) => {
    res.render('orderList');
});

router.get('/admin', (req, res) => {
	res.render('admin');
});

router.get('outlet/outlet', (req, res) => {
	res.render('outlet/outlet')
});

router.get('/addStallOwners', (req, res) => {
	res.render('addStallOwners')
});

router.get('/orders', (req, res) => {
	let outletid = sessionStorage.getItem("user");
	orders.getOrdersForOutlets(1).then(orders => {
		res.render('orderList', { orders: orders });
	})
});

router.put('/orders/:id/:status', (req, res) => {
	let id = req.params.id;
	let status = req.params.status;
	orders.setOrderStatus(id, status);
	orders.getOrder(id).then(order => {
		users.getUserByAdmin(order.user_admin).then(user => {
			if (status == 1 && user.telegram_id) {
				bot.sendMessage(user.telegram_id, "Your order for " + order.item_name + " (order id: " + order.id + ") is ready for collection!");
			}
			else if (status == 2 && user.telegram_id) {
				bot.sendMessage(user.telegram_id, "Your order (order id: " + order.id + ") has been collected. Thank you for shopping with us!");
			}
		})
	})
})
router.get('/history', (req, res) => {
	let admin = sessionStorage.getItem("user");
	var User = admin
	console.log(admin);
	users.getUserByAdmin(admin).then(user =>{
		console.log(user)
		
		if(user)
		{
			var full_name = user.full_name;
			var phone_no = user.phone_no;
			var user_admin = admin;
			orders.getOrdersFromUser(admin).then(order =>{
				console.log(order);
				
				if(order){
					// var createdAt = order.createdAt;
					// var item_name = order.item_name;
					// var item_id = order.item_id;
					res.render('history',{
						User,
						full_name,
						user_admin,
						phone_no,
						order
						// createdAt,
						// item_name,
						// item_id
					})
				}
				else{
					console.log('line 2 fail!')
					res.render('history', {
						User,
						full_name,
						user_admin,
						phone_no
					});
				}
				
			});
		}
		else{
			console.log('line one fail')
			res.render('history',{
				User
			});
		}
	

	});
	
});
module.exports = router;
