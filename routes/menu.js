const express = require('express');
const router = express.Router();
const item_class = require('../class/item_class')
const Item = require('../models/Item');
// const outlet = require('../models/Outlet');

console.log("Server Online!");

// trying out tim's added feature
/*
router.get('/MainMenu', (req, res) =>{
    var item_id = new ex();
    item_id.getItemById();
    item_id.setName();
})
*/


router.post('/stallownerConfig', (req, res) => {
    let {name, price, cat, outlet_id} = req.body;

    Item.create({
        name,
        //description,
        price,
        cat,
        outlet_id
    }).then((item) =>{    //this 'item' is from Item.js
        res.redirect('/menu/MainMenu');
    })
    .catch(err => console.log(err))
});

/*
// added this to show added items
router.get('/showAddedItems', (req,res) =>{
    res.render('stall/stallownerConfig',{
        items: 'Added food items for menu'
    });
});
*/

// adding new food items from /stall/stallownerConfig
router.get('/MainMenu', (req, res) =>{
    // never add a request yet, though having req now
    Item.findAll({
        /*
        order:[
            ['name', 'ASC'] //setting the outlet to be in ascending order
        ],
        */
        raw: true
    }).then((items) =>{
        // passing object to MainMenu.handlebar
        res.render('cart/MainMenu', {
            items
        });
    })
    .catch(err => console.log(err));
});



module.exports = router;

