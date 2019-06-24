const bot = require("../config/telegramConfig");
// catch message
bot.on('message', function (msg) {/* <function (msg)> or <(msg) => > */
    console.log(msg);
    // get sender id
    var sender = msg.chat.id;
    // get text
    var content = msg.text;

});
