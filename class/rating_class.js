const RatingModel = require('../models/Rating');
const Op = require('sequelize').Op;
const itemModel = require('../models/Item');
const itemClass = require('../class/item_class');
const db = require('../config/DBConfig');
var ex = module.exports = {};

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

ex.countTotalRates = function (entityID) {
    return RatingModel.count({
        where: { item_id: entityID }
    }).then(total_rating => {
        itemModel.update({
            total_rating
        }, {
                where: { id: entityID },
                raw: true
            })
    })
};

ex.count = function () {
    return RatingModel.count({
    })
};

ex.countTotalItems = function () {
    return itemModel.max('id')
};

ex.getItems = function (index1, index2) {
    if (index2 != undefined) {
        return itemModel.findAll({
            where: {
                [Op.or]: [{ id: index1 }, { id: index2 }]
            }
        })
    }
    else {
        return itemModel.findAll({
            where: { id: index1 }
        })
    }

};

ex.query = function (indexitem1, indexitem2) {
    if (indexitem2 == undefined) {
        return db.query('SELECT items.id, items.name, items.cat, items.price, items.outlet_id, outlets.name AS location, outlets.desc, items.average_rating, items.total_rating FROM ooadp.items, ooadp.outlets WHERE items.outlet_id = outlets.id AND items.id = ' + indexitem1);
    }
    else if(indexitem2 != undefined && indexitem2 != undefined){
        return db.query('SELECT items.id, items.name, items.cat, items.price, items.outlet_id, outlets.name AS location, outlets.desc, items.average_rating, items.total_rating FROM ooadp.items, ooadp.outlets WHERE items.outlet_id = outlets.id AND items.id IN (' + indexitem1 + ',' + indexitem2 + ')');
    } 
    else if(indexitem1 == NaN || indexitem1 == 0){
        return [];
    }
};

ex.createRatings = function () {
    this.countTotalItems().then(totalItems => {
        for (var i = 1; i < 301; i++) {
            var itemIndex = Math.round(Math.random() * (totalItems - 1) + 1);
            itemClass.getItemById(itemIndex).then(item => {
                if (item == null){
                    i -= 1;
                }
                else {
                    var ratingInteger = Math.round(Math.random() * (5 - 1) + 1);
                    RatingModel.create({
                        item_id: itemIndex,
                        user_admin: '180448w',
                        rating_given: ratingInteger
                    })
                }
            })
        }
    })
};
