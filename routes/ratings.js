const express = require('express');
const router = express.Router();
const ensureAuthenticated = require('../helpers/auth');

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
        .then((videos) => {
            // pass object to listVideos.handlebar
            res.render('../views/ratings', {
                videos: videos
            });
        })
        .catch(err => console.log(err));

});

module.exports = router;