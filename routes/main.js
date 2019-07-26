const express = require('express')
const router = express.Router();
const sessionStorage = require('node-sessionstorage');
const outlets = require('../class/outlet_class')
const orders = require('../class/order_class');
const User = require('../models/User');
const variable = require('../class/user_class');
const storage = require('node-sessionstorage');


router.get('/', (req, res) => {
	var User = storage.getItem("user");
    const title = 'Smart Food';
	res.render('home', {title: title,
		User}); // renders views/home.handlebars
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

router.get('/loginadmin', (req,res) => {
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
	var User = storage.getItem("user");
	console.log(User);
	if(User){
		variable.getUserByAdmin(User).then(user =>{
			console.log(user);
			var admin_no = user.admin_no;
			var full_name = user.full_name;
			var phone_no = user.phone_no;
			var telegram_id = user.telegram_id;
			var picture = user.picture;
			res.render('user/profile',{
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
	else{
		res.render('user/profile');
	}
    
});


// deon's cart + menu stuff


router.get('menu/menu', (req, res) =>{
	res.render('menu/menu')
});

router.get('/stallownerConfig', (req, res) =>{
	res.render('stallowner/stallownerConfig')
});

router.get('/menuDemo', (req, res) =>{
	res.render('menu/menuDemo')
});

router.get('/menuAlpha', (req, res) =>{
	res.render('menu/menuAlpha')
});

// displaying only chinese menu 
router.get('menu/menu-chinese', (req, res) =>{
	res.render('menu/menu-chinese')
});

// displaying only muslim menu, including indian muslim 
router.get('menu/menu-malay', (req, res) =>{
	res.render('menu/menu-malay')
});

// displaying only indian menu, non-halal
router.get('menu/menu-indian', (req, res) =>{
	res.render('menu/menu-indian')
});

// displaying only western menu
router.get('menu/menu-western', (req, res) =>{
	res.render('menu/menu-western')
});

// displaying only fusion menu
router.get('menu/menu-fusion', (req, res) =>{
	res.render('menu/menu-fusion')
});


// displaying only desserts menu
router.get('menu/menu-desserts', (req, res) =>{
	res.render('menu/menu-desserts')
});

// displaying only drinks menu
router.get('menu/menu-drinks', (req, res) =>{
	res.render('menu/menu-drinks')
});

// displaying only vegetarian menu
router.get('menu/menu-vegetarian', (req, res) =>{
	res.render('menu/menu-vegetarian')
});

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
	storage.removeItem("user");
	res.redirect('/');
});

router.get('/admin', (req,res)=>{
	res.render('views/admin')
});

router.get('/favourites',(req,res)=>{
	res.render('views/favourites')
});

router.get('/addFav',(req,res)=>{
	res.render('views/addFav')
});

// SO = Stall Owners
router.get('/addSO', (req, res) => {
	res.render('addStallOwners')
});

router.post('/addSO', (req, res) =>{
	
});

router.get('/orders', (req, res) => {
	let user = sessionStorage.getItem("user");
	orders.getOrdersForOutlets(1).then(orders => {
		console.log(orders);
		res.render('orderList', {orders: orders});
	})
});

module.exports = router;
