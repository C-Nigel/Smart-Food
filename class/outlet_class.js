const OutletModel = require('../models/Outlet');
var ex = module.exports = {};

ex.getOutletById = function(x){
    return OutletModel.findOne({
        where: { id: x },
        raw: true
    })
    .catch(err => {
        return err
    });
}

ex.createOutlet = function(name1, description){
    OutletModel.create({
        name: name1,
        desc: description
    })
}

ex.deleteOutlet = function(){

}

ex.setName = function(outletid, name1){
    this.getOutletById(outletid)
    .then(outlet => {
        outlet.update({
            name: name1
        })
    })
}

ex.setDesc = function(outletid, descript){
    this.getOutletById(outletid)
    .then(outlet => {
        desc: descript
    })
}