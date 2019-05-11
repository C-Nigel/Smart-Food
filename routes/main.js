const express = require('express')
const router = express.Router();

router.get('/', (req, res) => {
    const title = 'Smart Food';
    res.render('home', {title: title}) // renders views/home.handlebars
});

router.get('/menu', (req, res) => {
    res.render('cart/menu')
});

router.get('/login', (req, res) => {
	res.render('user/login') // renders views/user/login.handlebars
});

module.exports = router;


