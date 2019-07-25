const express = require('express');
const router = express.Router();
const item_class = require('../class/item_class')
const Item = require('../models/Item');
// const outlet = require('../models/Outlet');

console.log("Server Online!");



// for stall owner to add in their new food items to menu
router.post('/stallownerConfig', (req, res) => {
    let {name, price, cat, outlet_id} = req.body;

    item_class.createItem(name, car, price, outlet_id);
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
// testing in progress..

/*
router.get('/menu-:category', (req, res) =>{
    var cat = req.params.category;
    item_class.getItemsByCat(cat)
    .then((items) =>{
        res.render('menu/menu-chinese', {items});
    })
});
*/


/*
router.get('/menu-:category', (req, res) =>{
    Item.findAll({
        where: {
            cat: 
        },
        raw: true
    }).then((items) =>{
        res.render('menu/menu-{{cat}}', {items});
    }).catch(err => console.log(err));
});
*/

router.get('/menu-chinese', (req, res) =>{
    Item.findAll({
        where:{
            cat: 'chinese'
        },
        raw: true
    }).then((items) =>{
        res.render('menu/menu-chinese', {
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