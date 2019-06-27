const express = require('express');
const router = express.Router();

const Item = require('../models/Item');
const outlet = require('../models/Outlet');

console.log("Server Online!");

// adding new food items from /stall/stallowner

router.post('/stallownerConfig', (req, res) => {
    let name = req.body.name;
    let price = req.body.price;
    //let description = req.body.description;
    let cat = req.body.cat;
    let outlet_id = req.body.outlet_id;

    Item.create({
        name,
        //description,
        price,
        cat,
        outlet_id
    }).then((item) =>{
        res.redirect('/cart/MainMenu');
    })
    .catch(err => console.log(err))
});



router.get('/MainMenu', (req, res) =>{
    // never add a request yet, though having req now
    Item.findAll({
        order:[
            ['name', 'ASC'] //setting the outlet to be in ascending order
        ],
        raw: true
    }).then((items) =>{
        // passing object to MainMenu.handlebar
        res.render('cart/MainMenu', {
            items: items
        });
    })
    .catch(err => console.log(err));
});

module.exports = router;

