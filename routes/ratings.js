const express = require('express');
const router = express.Router();
const rating = require('../models/Rating');
const item_class = require('../class/item_class');
const ensureAuthenticated = require('../helpers/auth');
const orders = require('../class/order_class');
const rating_class = require('../class/rating_class');
const op = require('sequelize').Op;


router.get('/:user_admin', (req, res) => {

    rating.findAll({
        where: {
            user_admin: req.params.user_admin,
            rating_given: null
        },
        raw: true
    })
        .then((ratings) => {
            // orders.getOrderByUser()
            // pass object to ratings.handlebar
            console.log(ratings);
            res.render('../views/ratings', {
                ratings: ratings,
                user_admin: req.params.user_admin
            });
        })
        .catch(err => console.log(err));

});

router.post('/saveRating/:admin_no', (req, res) => {


	/* console.log(`\n++++++++ Video from session: ${req.session.video.title}`);
     console.log(`\n++++++++ All videos from session: ${req.session.allVideos}`); */
    rating_class.count().then(num => {
        for (var i = 1; i <= num; i++) {
            var admin_no = req.params.admin_no;
            var numToString = i.toString();
            var rating_given = req.body['rateID_' + numToString];
            if (rating_given != undefined){
                rating.update({
                    rating_given
                }, {
                        where: {
                            user_admin: admin_no,
                            id: i
                        }
                    }).then(() => {
                        res.redirect('/complete'); // redirect to call router.get(/listVideos...) to retrieve all updated
                        // videos
                    }).catch(err => console.log(err));
            }
        }
    })


});


module.exports = router;