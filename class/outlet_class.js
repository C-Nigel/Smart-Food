const OutletModel = require('../models/Outlet');
var ex = module.exports = {};

ex.getOutletById = function(x){
    return OutletModel.findOne({
        where: { id: x },
        raw: true
    })
    .catch(err => {
        console.log(err)
    });
}

ex.createOutlet = function(name1, pswd, description){
    OutletModel.create({
        name: name1,
        password: pswd,
        desc: description
    })
    .catch(err => {
        //console.log(result.id);
    })
}

ex.deleteOutlet = function(x){
    OutletModel.delete({
        where: {id: x}
    })
    .catch(err =>{
        console.log(err)
    })
}

ex.setName = function(outletid, name1){
    OutletModel.update(
        { name: name1 },
        { where: { id, outletid }}
    )
}

ex.setDesc = function(outletid, descript){
    OutletModel.update(
        { desc: descript },
        { where: { id, outletid }}
    )
}