const RatingModel = require('../models/Rating');
const Op = require('sequelize').Op;
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

ex.countTotalRates = function(entityID) {
    return RatingModel.count({
        where: {item_id: entityID}
    }).then(total_rating => {
        itemModel.update({
            total_rating
        }, {
            where:{id: entityID},
            raw: true
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

ex.getItems = function (index1, index2) {
    if (index2 != undefined){
        return itemModel.findAll({
            where: {
                [Op.or]: [{id: index1}, {id: index2}]
            }
        })
    }
    else
    {
        return itemModel.findAll({
            where: {id: index1}
        })
    }
    
}

