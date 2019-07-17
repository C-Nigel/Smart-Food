const express = require('express')
const router = express.Router();
const outlet = require('../class/outlet_class')

router.get('/', (req, res) => {
    const title = 'Smart Food';
    res.render('home', {title: title}) // renders views/home.handlebars
});

// testing the feature for the menu of different canteen


router.get('/loginuser', (req, res) => {
	res.render('user/loginuser') // renders views/user/loginuser.handlebars
});

router.get('/loginseller', (req, res) => {
	res.render('user/loginseller') // renders views/user/loginseller.handlebars
});

router.get('/index', (req, res) => {
	res.render('user/index') // renders views/user/loginuser.handlebars
});

router.get('/loginadmin', (req,res) => {
	res.render('user/loginadmin')
});

router.get('/register', (req, res) => {
	res.render('user/register') // renders views/user/register.handlebars
});

router.get('/forgetpw', (req, res) => {
	res.render('user/forgetpw') // renders views/user/forgetpw.handlebars
});

router.get('/forgetpw', (req, res) => {
	res.render('user/forgetpw') // renders views/user/forgetpw.handlebars
});

router.get('/profile', (req, res) => {
	res.render('user/profile') // renders views/user/loginuser.handlebars
});

router.get('/favicon', (req, res) => {
	res.render('malique/favicon') // renders views/user/forgetpw.handlebars
});


// deon's cart + menu stuff


router.get('/MainMenu', (req, res) =>{
	res.render('menu/MainMenu')
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
router.get('/menu-chinese', (req, res) =>{
	res.render('menu/menu-chinese')
});

// displaying only muslim menu, including indian muslim 
router.get('/menu-muslim', (req, res) =>{
	res.render('menu/menu-muslim')
});

// displaying only indian menu, non-halal
router.get('/menu-indian', (req, res) =>{
	res.render('menu/menu-indian')
});

// displaying only western menu
router.get('/menu-western', (req, res) =>{
	res.render('menu/menu-western')
});

// displaying only fusion menu
router.get('/menu-fusion', (req, res) =>{
	res.render('menu/menu-fusion')
});


// displaying only desserts menu
router.get('/menu-desserts', (req, res) =>{
	res.render('menu/menu-desserts')
});

// displaying only drinks menu
router.get('/menu-drinks', (req, res) =>{
	res.render('menu/menu-drinks')
});

// displaying only vegetarian menu
router.get('/menu-vegetarian', (req, res) =>{
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

router.post('/addSO', (req, res) =>{
	
});

module.exports = router;
