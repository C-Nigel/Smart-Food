const ItemModel = require('../models/Item');
const OutletClass = require('./outlet_class');
var ex = module.exports = {};

ex.getItemById = function(itemid){
    return ItemModel.findOne({
        where: {id: itemid},
        raw: true
    })
    .catch(err => {
        console.log(err)
    })
}

ex.createItem = function(iname, icat, iprice, outletid){
    ItemModel.create({
        name: iname,
        cat: icat,
        price: iprice,
        outlet_id: outletid
    })
    .catch(err => {
        console.log(err)
    })
}

ex.setName = function(itemid, newName){
    ItemModel.update(
        { name: newName },
        { where: { id, itemid }}
    )
}

ex.setCategory = function(itemid, newCat){
    ItemModel.update(
        { cat: newCat },
        { where: { id, itemid }}
    )
}

ex.setPrice = function(itemid, newPrice){
    ItemModel.update(
        { price: newPrice },
        { where: { id, itemid }}
    )
}

ex.setOutlet = function(itemid, outletid){
    ItemModel.update(
        { outlet_id: outletid },
        { where: { id, itemid }}
    ).catch(err => {
        console.log(err)
    })
}