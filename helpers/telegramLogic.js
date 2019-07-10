const bot = require("../config/telegram");
const User = require("../class/user_class");

// catch message
bot.on('message', function (msg) {/* <function (msg)> or <(msg) => > */
	console.log(msg);
	// get sender id
	var sender = msg.chat.id;
	var content = msg.text;
});

bot.onText(/\/start/, (msg) => {

	bot.sendMessage(msg.chat.id, 'Hi there, thank you for signing up with us! Please send "/verify <your admin no.>" to link this phone to your Smart Food account.');
	bot.sendMessage(msg.chat.id, 'eg. "/verify 1xxxxxxA"');

});
	
bot.onText(/\/verify (.+)/, (msg, match) => {
	// 'msg' is the received Message from Telegram
	// 'match' is the result of executing the regexp above on the text content
	// of the message

	var chatId = msg.chat.id;
	var response = match[1]; // the captured "whatever"

	
	User.getUserByAdmin(response).then(user => {
		User.setTelegram(user.id, chatId)
		.then(tg => {
			// send back the matched "whatever" to the chat
			bot.sendMessage(chatId, "Thank you for verifying! you will now receieve notifications with your meal is ready!");
		})
		.catch(err => {
			bot.sendMessage(chatId, "Unsuccessful registraton!");
		});
	})
	.catch(err => {
		bot.sendMessage(chatId, "Admin number not associated with user!");
	});
});

module.exports = bot;