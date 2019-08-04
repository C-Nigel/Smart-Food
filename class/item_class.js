const ItemModel = require('../models/Item');
const OrderModel = require('../models/Order');
const RatingModel = require('../models/Rating');
var ex = module.exports = {};

ex.getItemById = function(itemid){
    return ItemModel.findByPk(itemid);
}

ex.getitem = function(itemid){
    return ItemModel.findOne({
        where: {id: itemid},
        raw: true
    })
}

ex.getItemsByOutlet = function(outlet){
    return ItemModel.findAll({
        where: { outlet_id: outlet },
        raw: true
    })
    .catch(err => {
        console.log(err);
    })
}

ex.getItemsByCat = function(cat_name){
    return ItemModel.findAll({
        where: { cat: cat_name },
        raw: true
    })
    .catch(err => {
        console.log(err);
    })
}

ex.createItem = function(iname, icat, iprice, outletid){
    return ItemModel.create({
        name: iname,
        cat: icat,
        price: iprice,
        outlet_id: outletid
    })
    .then(result => {
        //console.log(result.id);
    })
    .catch(err => {
        console.log(err);
    })
}

ex.updateItem = function(itemid, name, cat, price){
    ItemModel.update({
        name, cat, price
    }, {
        where: {id: itemid}
    });
}

ex.deleteItem = function(itemid){
    OrderModel.destroy({
        where: {item_id: itemid}
    });
    RatingModel.destroy({
        where: {item_id: itemid}
    });
    return ItemModel.destroy({
        where: {id: itemid}
    });
}

ex.setOutlet = function(itemid, outletid){
    ItemModel.update(
        { outlet_id: outletid },
        { where: { id, itemid }}
    ).catch(err => {
        console.log(err)
    })
}

ex.findItem = function(itemID){
    return ItemModel.findOne({
        where: {id: itemID},
        raw: true
    })
}