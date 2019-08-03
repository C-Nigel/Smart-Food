const express = require('express');
const router = express.Router();
const rating = require('../models/Rating');
const item_class = require('../class/item_class');
const ensureAuthenticated = require('../helpers/auth');
const orders = require('../class/order_class');
const rating_class = require('../class/rating_class');
const Op = require('sequelize').Op;
const sequelize = require('sequelize')
const db = require('../config/DBConfig')

/*
router.get('/:user_admin', (req, res) => {
    db.query('SELECT ratings.id AS entity_index,users.full_name, ratings.user_admin, ratings.item_id, items.name AS item_name, items.cat, items.price, , items.outlet_id, outlets.name AS outlet_name, ratings.rating_given, ratings.createdAt FROM ooadp.ratings, ooadp.items, ooadp.outlets, ooadp.users WHERE ooadp.ratings.item_id = ooadp.items.id  AND ooadp.items.outlet_id = ooadp.outlets.id AND ooadp.ratings.user_admin = ooadp.users.admin_no AND ratings.rating_given IS NULL AND ratings.user_admin = "' + req.params.user_admin + '"' + 'ORDER BY ratings.createdAt')
    .then(([ratings, metadata]) => {
            console.log(ratings);
            res.render('../views/ratings', {
                ratings: ratings,
                user_admin: req.params.user_admin
            });
        }).catch(err => console.log(err));
});
*/
router.post('/saveRating/:admin_no', (req, res) => {
    rating_class.count().then(num => {
        for (var i = 1; i <= num; i++) {
            var admin_no = req.params.admin_no;
            var numToString = i.toString();
            var rating_given = req.body['rateID_' + numToString];
            if (rating_given != undefined) {
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