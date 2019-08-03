const Op = require('sequelize').Op;
const ChatModel = require('../models/Chat');
const User = require('../class/user_class');
var ex = module.exports = {};

ex.getUserChatByUserId = function(useradmin){
    return ChatModel.findAll({
        where: { user_admin: useradmin },
        raw: true
    })
};

ex.systemMsg = function(telegram, msgs){
    User.getUserByTelegram(telegram)
    .then(user => {
        if(user != null){
            ChatModel.create({
                sender: 'system',
                recipient: user.full_name,
                msg: msgs,
                user_admin: user.admin_no
            })
        }
        else{
            console.log("System failed to register message (" + msgs + ") into database to an unregistered user!")
        }
    })
}

ex.userMsg = function(telegram, msgs){
    User.getUserByTelegram(telegram)
    .then(user => {
        if (user != null){
            ChatModel.create({
                sender: user.full_name,
                recipient: 'system',
                msg: msgs,
                user_admin: user.admin_no
            })
        }
        else{
            console.log(" User " + user.full_name + " (" + user.admin_no + ") not found in DB and failed to register message (" + msgs + " into database!")
        }
    }).catch(err =>{
        console.log("User did not provide admin number! Unable to log message.")
    })
}