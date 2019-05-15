process.env["NTBA_FIX_319"] = 1;

console.log('Telegram api started');
console.log('Telegram api loading')

//group members chat id
var timothy = '189727407';
var yenhao = '574678173';
var raymond = '328373671';
var nigel = '239513475';
var malique = '';

var TelegramBot = require('node-telegram-bot-api');
// token
var token = '807750194:AAE5rnUPlRKurVW9BhX__GhUn4gEpB2JqDk';
// polling option
var opt = {polling: true};
// create bot
var bot = new TelegramBot(token, opt);
// catch message
bot.on('message', function (msg) {/* <function (msg)> or <(msg) => > */
    console.log(msg);
    // get sender id
    var id = msg.chat.id;
    // get text
    var echo = msg.text;
    // send message
    bot.sendMessage(id, echo);
});

bot.sendMessage('239513475', 'your food is ready for collection at western stall');

console.log('Telegram api load completed');
