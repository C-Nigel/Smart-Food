const express = require('express')
const router = express.Router();
const outlet = require('../class/outlet_class')

router.get('/', (req, res) => {
    const title = 'Smart Food';
    res.render('home', {title: title}) // renders views/home.handlebars
});

// testing the feature for the menu of different canteen


router.get('/loginuser', (req, res) => {
	res.render('loginuser') // renders views/user/loginuser.handlebars
});

router.get('/loginseller', (req, res) => {
	res.render('loginseller') // renders views/user/loginseller.handlebars
});

router.get('/index', (req, res) => {
	res.render('index') // renders views/user/loginuser.handlebars
});

router.get('/loginadmin', (req,res) => {
	res.render('loginadmin')
});

router.get('/register', (req, res) => {
	res.render('register') // renders views/user/register.handlebars
});

router.get('/forgetpw', (req, res) => {
	res.render('forgetpw') // renders views/user/forgetpw.handlebars
});

router.get('/profile', (req, res) => {
	res.render('profile') // renders views/user/loginuser.handlebars
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
	req.logout();
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

router.get('/orders', (req, res) => {
    res.render('orderList');
});

router.post('/addSO', (req, res) =>{
	let name = req.body.name;
	let desc = req.body.desc;
	outlets.update({
		name,
		desc
	}, {
		where: {
			id: req.params.id
		}
	}).then(() => {
		res.redirect('addStallOwners');
	})
});

module.exports = router;
