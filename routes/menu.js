const express = require('express')
const router = express.Router();
const item = require('../models/Item');

console.log("Server Online!");

router.get('/allmenu', (req, res) =>{
    item.findAll({
        order:[
            ['outlet', 'ASC'] //setting the outlet to be in ascending order
        ],
        raw: true
    })
    .then((items) =>{
        res.render('views/cart/allmenu', {
            items: items
        });
    })
    .catch(err => console.log(err));
});

// adding food items according to Food.js

router.post('/additem', (req, res) => {
    let name = req.body.name;
    let description = req.body.description;
    let price = req.body.price;
    let outlet = req.body.outlet;

item.create({
    name,
    description,
    price,
    outlet
    }).then((item) =>{
        res.redirect('/views/cart/allmenu');
    })
    .catch(err => console.log(err))
});

module.exports = router;

