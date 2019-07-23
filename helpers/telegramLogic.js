const bot = require("../config/telegram");
const User = require("../class/user_class");
const Chat = require("../class/chat_class")

// catch message
bot.on('message', function (msg) {/* <function (msg)> or <(msg) => > */
	console.log(msg);
	// get sender id
	var sender = msg.chat.id;
	var content = msg.text;
	Chat.userMsg(sender, content).catch(err => {
		console.log(err);
	});
});

bot.onText(/\/start/, (msg) => {

	bot.sendMessage(msg.chat.id, 'Hi there, thank you for signing up with us! Send "/verify <your admin no.>" to link this phone to your Smart Food account.');
	bot.sendMessage(msg.chat.id, 'eg. "/verify 1xxxxxxA"');

});

bot.onText(/\/verify (.+)/, (msg, match) => {
	// 'msg' is the received Message from Telegram
	// 'match' is the result of executing the regexp above on the text content of the message

	var chatId = msg.chat.id;
	var response = match[1]; // the captured user admin number

	User.getRepeatedTGUsers(chatId).then(count => {
		if (count > 0) {
			bot.sendMessage(chatId, "Admin number linked to another phone. Unlink previous phone before verifying this phone.")
		}
		else {
			User.getUserByAdmin(response).then(user => {
				if (user != null) {
					User.setTelegram(response, chatId);
					bot.sendMessage(chatId, "Thank you for verifying! You will now receieve notifications with your meal is ready!");
				}
				else {
					bot.sendMessage(chatId, "No such admin number registered to user!");
				}
			})
		}
	})
});

bot.onText(/\/unlink (.+)/, (msg, match) => {
	var chatId = msg.chat.id;
	var response = match[1]; // the captured user admin number
	user.unlinkTelegram()
})

module.exports = bot;