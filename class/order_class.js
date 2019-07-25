const op = require('sequelize').Op;
const OrderModel = require('../models/Order');
const ItemClass = require('./item_class');
var ex = module.exports = {};

ex.getOrderByUser = function(userid){
	return OrderModel.findAll({
		where: { user_admin: userid },
		raw: true
	})
	.catch(err => {
		console.log(err);
	});
}

ex.getIncompleteOrdersForUser = function(userid){
	return OrderModel.findAll({
		where: { 
			user_admin: userid,
			status: { 
				[Op.or]: [0, 1]
			}
		},
		raw: true
	})
	.catch(err => {
		console.log(err);
	});
}

ex.getOrdersForOutlets = function(outlet){
	return OrderModel.findAll({
		where: {
			outlet_id: outlet,
			status: { 
				[Op.or]: [0, 1]
			}
		},
		raw: true
	})
	.catch(err => {
		console.log(err);
	});
}

ex.getOrdersByUserForOutlet = function(user, outlet){
	return OrderModel.findAll({
		where: {
			user_admin: user,
			outlet_id: outlet,
			status: { 
				[Op.or]: [0, 1]
			}
		},
		raw: true
	})
	.catch(err => {
		console.log(err);
	})
}

ex.createOrder = function(itemid, useradmin){
	ItemClass.getItemById(itemid).then(item => {
		if (item != null){
			OrderModel.create({
				item_id: itemid,
				item_name: item.name,
				user_admin: useradmin,
				outlet_id: item.outlet_id,
				status: 0
			})
		}
		else{
			console.log("Item doesn't exist or wrong item id!");
		}
	})
	.catch(err => {
		console.log(err);
	});
}

ex.setOrderStatus = function(order_id, stat){
	OrderModel.update(
		{status: stat},
		{where: {id: order_id}}
	);
}