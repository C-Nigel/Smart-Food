const express = require('express');
const router = express.Router();
const Outlet = require('../models/Outlet')
const outlet_class = require('../class/outlet_class')


router.post('/addSO', (req,res) => {
    let name = req.body.name;
    let desc = req.body.desc;

    outlet_class.createOutlet(name , desc);
    res.render('addStallOwner');
});

module.exports = router;