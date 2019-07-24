process.env["NTBA_FIX_319"] = 1;

/*
group members chat id
var timothy = '189727407';
var yenhao = '574678173';
var raymond = '328373671';
var nigel = '239513475';
var malique = '573547962';
*/

var TelegramBot = require('node-telegram-bot-api');
// token
var token = '807750194:AAEd6To8ZonJwSUiCf0rSUh9Vqcz-_pTswg';
var token = "";
// polling option
var opt = {polling: true};

// create bot
module.exports = new TelegramBot(token, opt);