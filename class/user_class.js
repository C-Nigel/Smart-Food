const UserModel = require('../models/User');
var ex = module.exports = {};

ex.getUserByAdmin = function(adminNo){
    return UserModel.findOne({
        where: { admin_no: adminNo },
        raw: true
    })
    .catch(err => {
        return err
    });
}

ex.getUserById = function(user_id){
    return UserModel.findOne({
        where: { id: user_id },
        raw: true
    })
    .catch(err => 
        {return err}
    );
}

ex.createUser = function(adminNo, fullName, pswd){
    UserModel.create({
        admin_no: adminNo,
        full_name: fullName,
        password: pswd
    })
}

ex.deleteUser = function(user_id){
    this.getUserById(user_id)
    .then(user =>
        { return user.destroy() }
    )
}

ex.setAdmin = function(user_id, admin){
    this.getUserById(user_id)
    .then(user => {
        user.update({
            admin_no: admin
        })
    })
}

ex.setTelegram = function(user_id, tlg_id){
    this.getUserById(user_id)
    .then(user => {
        user.update({
            telegram_id: tlg_id
        })
    })
}