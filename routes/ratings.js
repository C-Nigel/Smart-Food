const express = require('express');
const router = express.Router();
const ensureAuthenticated = require('../helpers/auth');
/*
router.get('/review', ensureAuthenticated, (req, res) => {

    Video.findAll({
        where: {
            userId: req.user.id
        },
        order: [
            ['title', 'ASC']
        ],
        raw: true
    })
        .then((orders) => {
            // pass object to listVideos.handlebar
            res.render('../views/ratings', {
                orders: orders
            });
        })
        .catch(err => console.log(err));

});
*/
router.get('/180448w',(req,res)=>{
	res.render('ratings')
});

module.exports = router;