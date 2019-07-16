const op = require('sequelize').Op;
const OrderModel = require('../models/Order');
var ex = module.exports = {};

ex.getOrderByUser = function(userid){
    OrderModel.findAll({
        where: { user_admin: userid },
        raw: true
    })
    .catch(err => {
        console.log(err);
    });
}

ex.getIncompleteOrderByUser = function(userid){
    OrderModel.findAll({
        where: { 
            user_admin: userid,
            status: { 
                [Op.or]: [1, 2]
            }
        },
        raw: true
    })
    .catch(err => {
        console.log(err);
    });
}

ex.createOrder = function(itemid, user){
    OrderModel.create({
        item_id: itemid,
        user_admin: user,
        status: 0
    })
    .catch(err => {
        console.log(err);
    })
}

ex.setOrderStatus = function(order_id, stat){
    OrderModel.update(
        {status: stat},
        {where: {id: order_id}}
    );
}