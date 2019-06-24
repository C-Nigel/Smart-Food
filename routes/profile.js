const express = require('express')
const router = express.Router();
const fs = require('fs');
const upload = require('../helpers/imageUpload');
const ensureAuthenticated = require('../helpers/auth');

router.post('/upload', ensureAuthenticated, (req, res) => {
    // Creates user id directory for upload if not exist
    if (!fs.existsSync('./public/uploads/')){
        fs.mkdirSync('./public/uploads/');
    }
   
    upload(req, res, (err) => {
        if (err) {
            res.json({file: '/img/no-image.jpg', err: err});
        } else {
            if (req.file === undefined) {
                res.json({file: '/img/no-image.jpg', err: err});
            } else {
                res.json({file: `/uploads/${req.file.filename}`});
            }
        }
    });
})

module.exports = router;