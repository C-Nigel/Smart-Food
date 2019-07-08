const OrderModel = require('../models/Order');
var ex = module.exports = {};

ex.getOrderByQueueNo = function(queueNo){
    OrderModel.findAll({
        where: { queue_no: queueNo },
        raw: true
    })
    .catch(err => {
        console.log(err);
    })
}

ex.getOrderByUser = function(userid){
    OrderModel.findAll({
        where: { user_id: userid },
        raw: true
    })
    .catch(err => {
        console.log(err);
    });
}