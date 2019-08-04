const UserModel = require('../models/User');
var ex = module.exports = {};

ex.getUserByAdmin = function (adminNo) {
    return UserModel.findByPk(adminNo);
};

ex.getUserByTelegram = function (telegram) {
    return UserModel.findOne({
            where: {
                telegram_id: telegram
            },
            raw: true
        })
        .catch(err => {
            console.log(err);
        })
};

ex.getAllUsers = function () {
    return UserModel.findAll({
            raw: true
        })
        .catch(err => {
            console.log(err)
        })
};

ex.createUser = function (adminNo, fullName, pswd, phone) {
    return UserModel.create({
        admin_no: adminNo,
        full_name: fullName,
        password: pswd,
        phone_no: phone
    })
};

ex.setName = function (user_id, name) {
    UserModel.update({
        full_name: name
    }, {
        where: {
            admin_no: user_id
        }
    })
};

ex.setPicture = function(user_id, url){
    UserModel.update({
        picture_url: url
    }, {
        where: {
            admin_no: user_id
        }
    })
}

ex.updateAll = function (admin, name, phone, pass, pic) {
    UserModel.update({
        full_name: name,
        phone_no: phone,
        picture_url: pic
    }, {
        where: {
            admin_no: admin,
            password: pass
        }
    })
};

ex.setTelegram = function (user_id, tlg_id) {
    return UserModel.update({
        telegram_id: tlg_id
    }, {
        where: {
            admin_no: user_id
        }
    })
};

ex.getRepeatedTGid = function (tlg_id) {
    return UserModel.count({
            where: {
                telegram_id: tlg_id
            },
            raw: true
        })
        .catch(err => {
            console.log(err)
        })
};