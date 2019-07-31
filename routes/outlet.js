const express = require('express');
const router = express.Router();
const Outlet = require('../models/Outlet')
const outlet_class = require('../class/outlet_class')
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);

router.post('/addSO', (req,res) => {
    
    let name = req.body.name;
    
    let password = req.body.password;
    var hashPass = bcrypt.hashSync(password)
    let desc = req.body.desc;

    outlet_class.createOutlet(name , hashPass , desc);
    res.render('outlet');
});

router.get('/outlet', (req, res) =>{
    Outlet.findAll({
        raw: true
    }).then((outlets)=>{
        res.render('outlet/outlet', {
            outlets
        });
    })
    .catch(err => console.log(err));
});

module.exports = router;