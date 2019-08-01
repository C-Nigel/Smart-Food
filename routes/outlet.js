const express = require('express');
const router = express.Router();
const Outlet = require('../models/Outlet')
const outlet_class = require('../class/outlet_class')


router.post('/addSO', (req,res) => {let {name, desc} = req.body;

    outlet_class.createOutlet(name , desc);
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