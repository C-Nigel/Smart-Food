const express = require('express')
const router = express.Router();
const sessionStorage = require('node-sessionstorage');
const orders = require('../class/order_class');
const users = require('../class/user_class');
const items = require('../class/item_class');
const bot = require('../config/telegram');
const rating = require('../class/rating_class');


router.get('/', (req, res) => {
	var User = sessionStorage.getItem("user");
	var Owners = sessionStorage.getItem("owners");
	const title = 'Smart Food';
	var listNumbers = [];
	

	rating.countTotalItems().then(num => {
		for (var i = 1; i <= num; i++) {
			rating.averageRating(i);
			rating.countTotalRates(i);
		}
	});

	rating.countTotalItems({
	}).then((totalNumber) => {
		for (var i = 1; i < 10; i++){
			var integer = Math.round(Math.random() * (totalNumber - 1 + 1) + 1);
			if (listNumbers.includes(integer) || integer > totalNumber){
				i -= 1;
			}
			else{
				listNumbers.push(integer);
			}
		}
	}).then ( undefined => {
		console.log(listNumbers);
		rating.getItems(listNumbers[0]).then((itemsList1) => {
			rating.getItems(listNumbers[1], listNumbers[2]).then((itemsList2) => {
				rating.getItems(listNumbers[3]).then((itemsList3) => {
					rating.getItems(listNumbers[4], listNumbers[5]).then((itemsList4) => {
						rating.getItems(listNumbers[6]).then((itemsList5) => {
							rating.getItems(listNumbers[7], listNumbers[8]).then((itemsList6) => {
								// renders views/home.handlebars
								res.render('home', {
									title: title,
									itemsList1,
									itemsList2,
									itemsList3,
									itemsList4,
									itemsList5,
									itemsList6,
									User,
									Owners
								});
							})
						})
					})
				})
			})
		})
	})
});

router.get('/complete', (req, res) => {
	res.render('ratingsComplete')
})

// testing the feature for the menu of different canteen


router.get('/loginuser', (req, res) => {
	res.render('user/loginuser') // renders views/user/loginuser.handlebars
});

router.get('/loginseller', (req, res) => {
	res.render('user/loginseller') // renders views/user/loginseller.handlebars
});

router.get('/loginadmin', (req, res) => {
	res.render('user/loginadmin')
});

router.get('/index', (req, res) => {
	res.render('index') // renders views/user/loginuser.handlebars
});

router.get('/history', (req, res) => {
	res.render('history') 
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
		users.getUserByAdmin(User).then(user => {
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

router.get('/logout', (req, res) => {
	sessionStorage.removeItem("user");
	res.redirect('/');
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
		res.render('stallowner/orderList', { orders: orders });
	})
});

router.post('/orders/:id/:status', (req, res) => {
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
});

router.get('/listItems', (req, res) => {
	items.getItemsByOutlet(1).then(items => {
		res.render('stallowner/listItems', {items: items});
	})
})

router.get('/addItem', (req, res) => {
	let user;
	res.render('stallowner/addItem', {outlet: 2});
});

router.post('/addItem', (req, res) => {
	let {itemName, itemPrice, itemCategory, outletid} = req.body;
	items.createItem(itemName, itemCategory, itemPrice, null, outletid);
	res.redirect('/listItems');
});

router.get('/editItem/:id', (req, res) => {
	items.getItemById(req.params.id).then(item => {
		res.render('stallowner/editItem', {item: item});
	});
});

router.post('/editItem/:id', (req, res) => {
	let {itemName, itemPrice, itemCategory} = req.body;
	items.updateItem(req.params.id, itemName, itemCategory, itemPrice);
	res.redirect('/listItems');
});

router.get('/history', (req, res) => {
	let outletid = sessionStorage.getItem("user");
	orders.getOrdersForOutlets(1).then(orders => {
		res.render('history', {orders: orders}); 
	})
});
module.exports = router;
