const express = require('express')
const router = express.Router();
const orders = require('../class/order_class');
const users = require('../class/user_class');
const items = require('../class/item_class');
const bot = require('../config/telegram');
const rating = require('../class/rating_class');
const chat = require('../class/chat_class');


router.get('/', (req, res) => {
	var j = 0;
	if (!req.session.user){
		req.session.user = null;
	}
	if (!req.session.owner){
		req.session.owner = null;
	}
	var User = req.session.user;
	var Owner = req.session.owner;
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
		for (var i = 1; i < 10; i++) {
			var integer = Math.round(Math.random() * (totalNumber - 1) + 1);
			if (j == 15) {
				for (var k = 0; k < 9; k++){
					listNumbers.push(1)
					break;
				}
			}
			else if (listNumbers.includes(integer) || integer > totalNumber) {
				i -= 1;
				j += 1;
			}
			else {	
				listNumbers.push(integer);
			}
		}
	}).then(undefined => {
		rating.query(listNumbers[0])
			.then(([itemsList1, metadata]) => {
				rating.query(listNumbers[1], listNumbers[2])
					.then(([itemsList2, metadata]) => {
						rating.query(listNumbers[3])
							.then(([itemsList3, metadata]) => {
								rating.query(listNumbers[4], listNumbers[5])
									.then(([itemsList4, metadata]) => {
										rating.query(listNumbers[6])
											.then(([itemsList5, metadata]) => {
												rating.query(listNumbers[7], listNumbers[8])
													.then(([itemsList6, metadata]) => {
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
															Owner
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
	var User = req.session.user;
	if (User) {
		users.getUserByAdmin(User).then(user => {
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
			});
		})
	} else {
		res.render('user/profile');
	}

});

router.get('/changepassword', (req, res) => {
	var User = req.session.user;
	if (User) {
		users.getUserByAdmin(User).then(user => {
			var admin_no = user.admin_no;
			var full_name = user.full_name;
			var phone_no = user.phone_no;
			var telegram_id = user.telegram_id;
			var picture = user.picture;
			res.render('user/changepassword', {
				User,
				admin_no,
				full_name,
				phone_no,
				telegram_id,
				picture
			});
		})
	} else {
		res.render('user/changepassword');
	}

});

router.get('/twofa', (req, res) => {
	var User = req.session.user;
	if (User) {
		users.getUserByAdmin(User).then(user => {
			var admin_no = user.admin_no;
			var full_name = user.full_name;
			var phone_no = user.phone_no;
			var telegram_id = user.telegram_id;
			var picture = user.picture;
			res.render('user/twofa', {
				User,
				admin_no,
				full_name,
				phone_no,
				telegram_id,
				picture
			});
		})
	} else {
		res.render('user/twofa');
	}

});

router.get('/logout', (req, res) => {
	req.session.user = null;
	req.session.owner = null;
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
	let outletid = req.session.owner;
	if (outletid) {
		orders.getOrdersForOutlets(outletid).then(orders => {
			res.render('stallowner/orderList', {
				orders: orders,
				Owner: true
			});
		})
	} else {
		res.redirect('/');
	}

});

router.post('/orders/:id/:status', (req, res) => {
	let id = req.params.id;
	let status = req.params.status;
	orders.setOrderStatus(id, status);
	orders.getOrder(id).then(order => {
		users.getUserByAdmin(order.user_admin).then(user => {
			if (status == 1 && user.telegram_id) {
				bot.sendMessage(user.telegram_id, "Your order for " + order.item_name + " (order id: " + order.id + ") is ready for collection!");
				chat.systemMsg(order.user_admin, "Your order for " + order.item_name + " (order id: " + order.id + ") is ready for collection!");
			} else if (status == 2 && user.telegram_id) {
				bot.sendMessage(user.telegram_id, "Your order (order id: " + order.id + ") has been collected. Thank you for shopping with us!");
				chat.systemMsg(order.user_admin, "Your order (order id: " + order.id + ") has been collected. Thank you for shopping with us!");
				bot.sendMessage(user.telegram_id, "Do help us to rate your food at localhost:5000/review/" + user.user_admin);
				chat.systemMsg(order.user_admin, "Do help us to rate your food at localhost:5000/review/" + user.user_admin);
			}
		})
	})
});

router.get('/listItems', (req, res) => {
	let outletid = req.session.owner;
	if (outletid) {
		items.getItemsByOutlet(outletid).then(items => {
			res.render('stallowner/listItems', {
				items: items,
				Owner: true
			});
		})
	}
})

router.get('/newItem', (req, res) => {
	let outletid = req.session.owner;
	res.render('stallowner/newItem', {
		outlet: outletid,
		Owner: true
	});
});

router.post('/newItem', (req, res) => {
	let {
		itemName,
		itemPrice,
		itemCategory,
		outletid
	} = req.body;
	items.createItem(itemName, itemCategory, itemPrice, null, outletid).then(() => {
		res.redirect('/listItems');
	});
	
});

router.get('/editItem/:id', (req, res) => {
	items.getItemById(req.params.id).then(item => {
		res.render('stallowner/editItem', {
			item: item,
			Owner: true
		});
	});
});

router.post('/editItem/:id', (req, res) => {
	let {
		itemName,
		itemPrice,
		itemCategory
	} = req.body;
	items.updateItem(req.params.id, itemName, itemCategory, itemPrice);
	res.redirect('/listItems');
});

router.get('/deleteItem/:item', (req, res) => {
	items.deleteItem(req.params.item).then(() => {
		res.redirect('/listItems');
	});
	
})

router.get('/history', (req, res) => {
	let admin = req.session.user;
	var User = admin
	users.getUserByAdmin(admin).then(user =>{
		if(user)
		{
			var full_name = user.full_name;
			var phone_no = user.phone_no;
			var user_admin = admin;
			orders.getOrdersFromUser(admin).then(order =>{
				chat.getUserChatByUserId(admin).then(chats => {
					if(order){
						// var createdAt = order.createdAt;
						// var item_name = order.item_name;
						// var item_id = order.item_id;
						res.render('history',{
							User,
							full_name,
							user_admin,
							phone_no,
							order,
							chats
							// createdAt,
							// item_name,
							// item_id
						})
					}
					else{
						res.render('history', {
							User,
							full_name,
							user_admin,
							phone_no,
							chats
						});
					}
				})
			});
		}
		else{
			res.render('history',{
				User,
				chats
			});
		}
	

	});
	
});
module.exports = router;