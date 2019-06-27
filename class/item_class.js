const ItemModel = require('../models/Item');
const OutletClass = require('./outlet_class');
var ex = module.exports = {};

ex.getItemById = function(itemid){
    return ItemModel.findOne({
        where: {id: itemid},
        raw: true
    })
    .catch(err => {
        return err
    })
}

ex.setName = function(itemid, newName){
    this.getItemById(itemid)
    .then(item => {
        item.update({
            name: newName
        })
    })
}

ex.setCategory = function(itemid, newCat){
    this.getItemById(itemid)
    .then(item => {
        item.update({
            cat: newCat
        })
    })
}

ex.setPrice = function(itemid, newPrice){
    this.getItemById(itemid)
    .then(item => {
        item.update({
            price: newPrice
        })
    })
}

ex.setOutlet = function(itemid, outletid){
    this.getItemById(itemid)
    .then(item => {
        console.log(item);
        item.update({
            outlet_id: outletid
        });
        console.log(item.outlet_id);
    })
    .catch(err => {
        return err
    })
}