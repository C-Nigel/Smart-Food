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
        ChatModel.create({
            sender: 'system',
            recipient: user.full_name,
            msg: msgs,
            user_admin: useradmin
        })
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
                user_admin: useradmin
            })
        }
        else{
            console.log("not working")
        }
    })
}