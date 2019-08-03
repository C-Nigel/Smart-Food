process.env["NTBA_FIX_319"] = 1;

var TelegramBot = require('node-telegram-bot-api');
// token
var token = '807750194:AAEd6To8ZonJwSUiCf0rSUh9Vqcz-_pTswg';
// polling option
var opt = {polling: true};
// create bot
module.exports = new TelegramBot(token, opt);