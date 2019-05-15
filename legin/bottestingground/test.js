process.env["NTBA_FIX_319"] = 1;

var TelegramBot = require('node-telegram-bot-api');
console.log('telegram api started');
// token
var token = '807750194:AAE5rnUPlRKurVW9BhX__GhUn4gEpB2JqDk';
// polling option
var opt = {polling: true};
// create bot
var bot = new TelegramBot(token, opt);
// catch message
bot.on('message', function (msg) {
    console.log(msg);
    // get sender id
    var id = msg.chat.id;
    // get text
    var echo = msg.text;
    // send message
    bot.sendMessage(id, echo);
});

console.log('telegram api loaded');
