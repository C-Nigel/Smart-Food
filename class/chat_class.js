const Op = require('sequelize').Op;
const ChatModel = require('../models/Chat');
var ex = module.exports = {};

ex.getUserChatByUserId = function(user_id){
    return ChatModel.findAll({
        where: {
            [Op.or]: [
                {sender: user_id},
                {recipient: user_id}
            ]
        },
        raw: true
    })
};

ex.createMsg = function(send, receive, msgs){
    ChatModel.create({
        sender: send,
        recipient: receive,
        msg: msgs
    })
}