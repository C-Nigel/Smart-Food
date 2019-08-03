const express = require('express');
const router = express.Router();
const item_class = require('../class/item_class')
const Item = require('../models/Item');
const order_class = require('../class/order_class');



// this shows all orders


router.get('/menu-chinese', (req, res) =>{
    var User = req.session.user;
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

router.post('/menu-order/:admin/:item', (req, res) => {
    order_class.createOrder(req.params.item, req.params.admin);
})


router.get('/menu-malay', (req, res) =>{
    var User = req.session.user;
    Item.findAll({
        where:{
            cat: 'malay'
        },
        raw: true
    }).then((items) =>{
        res.render('menu/menu-malay', {
            User,
            items
        });
    }).catch(err => console.log(err));
});


router.get('/menu-indian', (req, res) =>{
    var User = req.session.user;
    Item.findAll({
        where:{
            cat: 'indian'
        },
        raw: true
    }).then((items) =>{
        res.render('menu/menu-indian', {
            User,
            items
        });
    }).catch(err => console.log(err));
});

router.get('/menu-western', (req, res) =>{
    var User = req.session.user;
    Item.findAll({
        where:{
            cat: 'western'
        },
        raw: true
    }).then((items) =>{
        res.render('menu/menu-western', {
            User,
            items
        });
    }).catch(err => console.log(err));
});

router.get('/menu-fusion', (req, res) =>{
    var User = req.session.user;
    Item.findAll({
        where:{
            cat: 'fusion'
        },
        raw: true
    }).then((items) =>{
        res.render('menu/menu-fusion', {
            User,
            items
        });
    }).catch(err => console.log(err));
});

router.get('/menu-vegetarian', (req, res) =>{
    var User = req.session.user;
    Item.findAll({
        where:{
            cat: 'vegetarian'
        },
        raw: true
    }).then((items) =>{
        res.render('menu/menu-vegetarian', {
            User,
            items
        });
    }).catch(err => console.log(err));
});

router.get('/menu-desserts', (req, res) =>{
    var User = req.session.user;
    Item.findAll({
        where:{
            cat: 'desserts'
        },
        raw: true
    }).then((items) =>{
        res.render('menu/menu-desserts', {
            User,
            items
        });
    }).catch(err => console.log(err));
});

router.get('/menu-drinks', (req, res) =>{
    var User = req.session.user;
    Item.findAll({
        where:{
            cat: 'drinks'
        },
        raw: true
    }).then((items) =>{
        res.render('menu/menu-drinks', {
            User,
            items
        });
    }).catch(err => console.log(err));
});


module.exports = router;