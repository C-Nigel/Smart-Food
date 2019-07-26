const express = require('express');
const router = express.Router();
const Outlet = require('../models/Outlet')
const outlet_class = require('../class/outlet_class')


router.post('/addSO', (req,res) => {
    let {name, desc} = req.body;
    outlet_class.createOutlet(name , desc);
    res.redirect('addStallOwner');
});

module.exports = router;