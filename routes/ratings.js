const express = require('express');
const router = express.Router();
const rating = require('../models/Rating');
const item_class = require('../class/item_class');
const ensureAuthenticated = require('../helpers/auth');

router.get('/:user_admin', (req, res) => {

    rating.findAll({
        where: {
            user_admin: req.params.user_admin
        },
        raw: true
    })
    .then((ratings) => {
        // pass object to listVideos.handlebar
        res.render('../views/ratings', {
            ratings: ratings
        });
    })
    .catch(err => console.log(err));

});

router.post('/saveRating/:id', (req, res) => {
    let rating_given = req.body.stars;

	/* console.log(`\n++++++++ Video from session: ${req.session.video.title}`);
	 console.log(`\n++++++++ All videos from session: ${req.session.allVideos}`); */
    console.log(rating_given);
    rating.update({
        rating_given
    }, {
            where: {
                id: 1 //need to update back to req.params.id
            }
        }).then(() => {
            res.redirect('/'); // redirect to call router.get(/listVideos...) to retrieve all updated
            // videos
        }).catch(err => console.log(err));
});
module.exports = router;