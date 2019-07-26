const express = require('express');
const router = express.Router();
const item_class = require('../class/item_class')
const Item = require('../models/Item');
// const outlet = require('../models/Outlet');

console.log("Server Online!");



// for stall owner to add in their new food items to menu
router.post('/stallownerConfig', (req, res) => {
    let {name, price, cat, outlet_id} = req.body;

    item_class.createItem(name, cat, price, outlet_id);
    res.redirect('/menu/menu');
});


// adding new food items from /stall/stallownerConfig

router.get('/menu', (req, res) =>{
    // never add a request yet, though having req now
    Item.findAll({
        raw: true
    }).then((items) =>{
        // passing object to MainMenu.handlebar
        res.render('menu/menu', {
            items
        });
    })
    .catch(err => console.log(err));
});


router.get('/menuAlpha', (req, res) =>{
    Item.findAll({
        raw: true
    }).then((items) =>{
        res.render('menu/menuAlpha', {
            items
        });
    })
    .catch(err => console.log(err));
});


// for specificied cat. of food accessibility from home page

router.get('/menu-:category', (req, res) =>{
    var cat = req.params.category;
    item_class.getItemsByCat(cat)
    .then((items) =>{
        res.render('menu/menu-chinese', {items});
    })
});



module.exports = router;