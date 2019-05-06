const express = require('express')
const router = express.Router();

const app = express()
const port = 5000

router.get('/showLogin', (req, res) => {
    res.render('user/login') // renders views/user/login.handlebars
});

module.exports = router;


