const express = require('express');
const router = express.Router();
const Outlet = require('../models/Outlet');
const Item = require('../models/Item');
const Rating = require('../models/Rating');
const item_class = require('../class/item_class');
const outlet_class = require('../class/outlet_class');
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);

router.post('/addSO', (req, res) => {
    let name = req.body.name;
    let password = req.body.password;
    var hashPass = bcrypt.hashSync(password, salt)
    let desc = req.body.desc;

    outlet_class.createOutlet(name, hashPass, desc);
    res.redirect('outlet/addSO');
});

router.get('/outlet/addSO', (req, res) => {
    Outlet.findAll({

        }).then((outlets) => {
            res.render('outlet', {
                outlets
            });
        })
        .catch(err => console.log(err));
});

router.get('/delete/:id', (req, res) => {
var outletId = req.params.id;
item_class.getItemsByOutlet(outletId).then(items => {
    for (var i = 0; i < items.length; i++) {
        Rating.destroy({
            where: {
                item_id: items[i].id
            }
        })
    }
   
}) 
Item.destroy({
        where: {
            outlet_id: outletId
        }
    })
Outlet.destroy({
    where: {
        id: outletId
    }
}).then((outlets) => {
    res.redirect('/outlet/outlet/addSO');
}).catch(err => console.log(err));
});

// router.get('/delete/:outlet_id', (req, res) => {
//     var outletID = req.params.outlet_id;
//     Item.findAll({
//         where:{
//             id:outletID
//         }
//     }).then((items) => {
//         if (items.outlet_id === outletID){
//             Item.destroy({
//                 where:{
//                     id:outletID
//                 }
//             }).then((items) =>{
//                 res.redirect('/outlet/outlet/addSO');
//             }).catch(err => console.log(err));
//         }
//     })
// });

module.exports = router;