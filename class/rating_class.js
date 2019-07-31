const RatingModel = require('../models/Rating');
const op = require('sequelize').Op;
const itemModel = require('../models/Item')
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
            if (count != 0) {
                var average_rating = (sum / count).toFixed(1)
                itemModel.update({
                    average_rating
                }, {
                        where: { id: entityID },
                        raw: true
                    })
            }


        }).catch(err => {
            console.log(err)
        })
    })
};

ex.count = function () {
    return RatingModel.count({
    })
};

ex.countTotalItems = function () {
    return itemModel.count({
    })
};

