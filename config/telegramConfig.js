process.env["NTBA_FIX_319"] = 1;

/*
console.log('Telegram api started');
console.log('Telegram api loading')

//group members chat id
var timothy = '189727407';
var yenhao = '574678173';
var raymond = '328373671';
var nigel = '239513475';
var malique = '573547962';
*/

var TelegramBot = require('node-telegram-bot-api');
// token
var token = '807750194:AAE5rnUPlRKurVW9BhX__GhUn4gEpB2JqDk';
// polling option
var opt = {polling: true};
// create bot
module.exports = new TelegramBot(token, opt);