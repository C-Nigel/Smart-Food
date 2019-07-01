const express = require('express')
const router = express.Router();

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

// deon's cart stuff

router.get('/menufoodconnect', (req, res) =>{
	res.render('cart/menufoodconnect')
});

router.get('/menufoodgle', (req, res) =>{
	res.render('cart/menufoodgle')
});

router.get('/menukoufu', (req, res) => {
    res.render('cart/menukoufu')
});

router.get('/menunorth', (req, res) =>{
	res.render('cart/menunorth')
});

router.get('/menusouth', (req, res) =>{
	res.render('cart/menusouth')
});

/* testing allmenu */
router.get('/MainMenu', (req, res) =>{
	res.render('cart/MainMenu')
});

// stall owner's page

router.get('/stallownerConfig', (req, res) =>{
	res.render('menu/stallownerConfig')
});

/*
router.get('/showAddedItems', (req, res) =>{
	res.render('cart/MainMenu')
});
*/

router.get('/logout', (req, res) => {
	req.logout();
	res.redirect('/');
});

router.get('/admin', (req,res)=>{
	res.render('user/admin')
});

router.get('/favourites',(req,res)=>{
	res.render('user/favourites')
});

router.get('/addFavourite',(req,res)=>{
	res.render('user/addFavourite')
});

module.exports = router;
