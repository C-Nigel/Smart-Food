const RatingModel = require('../models/Rating');
const op = require('sequelize').Op;
var ex = module.exports = {};

ex.getUserByAdmin = function (adminNo) {
    return UserModel.findByPk(adminNo)
        .catch(err => {
            console.log(err)
        });
};

ex.averageRating = function (entityID) {
    return RatingModel.sum('rating_given', {
        where: { item_id: entityID }
    }).then(sum => {
        RatingModel.count({
            where: { item_id: entityID },
            raw: true
        }).then(count => {
            console.log((sum / count).toFixed(1))
        }).catch(err => {
            console.log(err)
        })
    })
};

ex.count = function () {
    return RatingModel.count({

    })
}
