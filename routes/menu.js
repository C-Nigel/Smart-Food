const express = require('express');
const router = express.Router();
const item_class = require('../class/item_class')
const Item = require('../models/Item');
const sessionStorage = require('node-sessionstorage');

// const outlet = require('../models/Outlet');

console.log("Server Online!");



// for stall owner to add in their new food items to menu
router.post('/stallownerConfig', (req, res) => {
    let {name, price, cat, outlet_id} = req.body;

    item_class.createItem(name, cat, price, outlet_id);
    res.redirect('/menu/menu');
});



// for specificied cat. of food accessibility from home page
// testing in progress..

/*
router.get('/menu/:category', (req, res) =>{
    var cat = req.params.category;
    item_class.getItemsByCat(cat)
    .then((items) =>{
        res.render('menu/:category', {items});
    })
});
*/

/*
router.get('/menu/:cat', (req, res) =>{
    Item.findOne({
        where:{
            cat: req.params.cat
        }
    }).then((items) =>{
        res.render('menu/Alpha', {
            items
        });
    }).catch(err => console.log(err));
});
*/


// showing new food items added from /stall/stallownerConfig

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

// this shows all orders

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



router.get('/menu-chinese', (req, res) =>{
    var User = sessionStorage.getItem("user");
    console.log(User);
    Item.findAll({
        where:{
            cat: 'chinese'
        },
        raw: true
    }).then((items) =>{
        res.render('menu/menu-chinese', {
            User,
            items
        });
    }).catch(err => console.log(err));
});



router.get('/menu-malay', (req, res) =>{
    Item.findAll({
        where:{
            cat: 'malay'
        },
        raw: true
    }).then((items) =>{
        res.render('menu/menu-malay', {
            items
        });
    }).catch(err => console.log(err));
});


router.get('/menu-indian', (req, res) =>{
    Item.findAll({
        where:{
            cat: 'indian'
        },
        raw: true
    }).then((items) =>{
        res.render('menu/menu-indian', {
            items
        });
    }).catch(err => console.log(err));
});

router.get('/menu-western', (req, res) =>{
    Item.findAll({
        where:{
            cat: 'western'
        },
        raw: true
    }).then((items) =>{
        res.render('menu/menu-western', {
            items
        });
    }).catch(err => console.log(err));
});

router.get('/menu-fusion', (req, res) =>{
    Item.findAll({
        where:{
            cat: 'fusion'
        },
        raw: true
    }).then((items) =>{
        res.render('menu/menu-fusion', {
            items
        });
    }).catch(err => console.log(err));
});

router.get('/menu-vegetarian', (req, res) =>{
    Item.findAll({
        where:{
            cat: 'vegetarian'
        },
        raw: true
    }).then((items) =>{
        res.render('menu/menu-vegetarian', {
            items
        });
    }).catch(err => console.log(err));
});

router.get('/menu-desserts', (req, res) =>{
    Item.findAll({
        where:{
            cat: 'desserts'
        },
        raw: true
    }).then((items) =>{
        res.render('menu/menu-desserts', {
            items
        });
    }).catch(err => console.log(err));
});

router.get('/menu-drinks', (req, res) =>{
    Item.findAll({
        where:{
            cat: 'drinks'
        },
        raw: true
    }).then((items) =>{
        res.render('menu/menu-drinks', {
            items
        });
    }).catch(err => console.log(err));
});


module.exports = router;