const express = require('express');
const router = express.Router();
const Outlet = require('../models/Outlet')
const outlet_class = require('../class/outlet_class')
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);

router.post('/addSO', (req,res) => {
    let name = req.body.name;
    let password = req.body.password;
    var hashPass = bcrypt.hashSync(password, salt)
    let desc = req.body.desc;

    outlet_class.createOutlet(name , hashPass , desc);
    res.redirect('outlet/addSO');
});

router.get('/outlet/addSO', (req, res) =>{
    Outlet.findAll({
        
    }).then((outlets) => 
    {
        res.render('outlet', {
            outlets
        });
    })
    .catch(err => console.log(err));
});

router.get('/delete/:id', (req, res) => {
    var OutletID = req.params.id;
    Outlet.findOne({
        where:{
            id: OutletID
        }
    }).then((outlets) =>{
        if (outlets.id === OutletID){
            Outlet.destroy({
                where:{
                    id: OutletID
                }
            }).then((outlets) => {
                res.redirect('/outlet/outlet/addSO');
            }).catch(err => console.log(err));
        }
    })
});

module.exports = router;