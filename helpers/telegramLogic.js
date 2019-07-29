const bot = require("../config/telegram");
const User = require("../class/user_class");
const Chat = require("../class/chat_class")

// catch message
bot.on('message', function (msg) {
	/* <function (msg)> or <(msg) => > */
	console.log(msg);
	// get sender id
	var chatId = msg.chat.id;
	var content = msg.text;
	Chat.userMsg(chatId, content)
});

bot.onText(/\/start/, (msg) => { //when user sends '/start', the bot will reply the sentences below
	var chatId = msg.chat.id;
	bot.sendMessage(chatId, 'Hi there, thank you for signing up for an account with us! Send "/verify <your admin no.>" to link this phone to your Smart Food account.');
	bot.sendMessage(chatId, 'eg. "/verify 1xxxxxxA"');
	Chat.systemMsg(chatId, 'Hi there, thank you for signing up for an account with us! Send "/verify <your admin no.>" to link this phone to your Smart Food account.')
	Chat.systemMsg(chatId, 'eg. "/verify 1xxxxxxA"');
});

bot.onText(/\/help/, (msg) => { // when user sends '/help', it will reply the following sentences
	var chatId = msg.chat.id;
	bot.sendMessage(chatId, "If you have problems linking/unlinking your phone, contact our helpdesk at 8693 0190.");
	Chat.systemMsg(chatId, "If you have problems linking/unlinking your phone, contact our helpdesk at 8693 0190.");
});

bot.onText(/\/verify (.+)/, (msg, match) => { // this is where users connect their phone to their accounts
	// 'msg' is the received Message from Telegram
	// 'match' is the result of executing the regexp above on the text content of the message

	var chatId = msg.chat.id;
	var response = match[1]; // the captured user admin number
	User.getUserByAdmin(response).then(user => {
		if (user && user.telegram_id != chatId) {
			User.getRepeatedTGUsers(chatId).then(count => {
				if (count > 0) {
					bot.sendMessage(chatId, "Admin number linked to another phone. Unlink previous phone before verifying this phone.")
					Chat.systemMsg(chatId, "Admin number linked to another phone. Unlink previous phone before verifying this phone.");
				} 
				else {
					User.setTelegram(response, chatId);
					bot.sendMessage(chatId, "Thank you for verifying! You will now receieve notifications with your meal is ready!");
					Chat.systemMsg(chatId, "Thank you for verifying! You will now receieve notifications with your meal is ready!");
				}
			})
		}
		else if (!user) {
			bot.sendMessage(chatId, "No such admin number registered to user!");
			Chat.systemMsg(chatId, "No such admin number registered to user!");
		} 
		else if (user.telegram_id == chatId) {
			bot.sendMessage(chatId, "This phone is already linked to your account.");
			Chat.systemMsg(chatId, "This phone is already linked to your account.");
		} 
		else {
			console.log("Reached undocumented behavior condition telegramLogic");
		}
	});


});

bot.onText(/\/unlink (.+)/, (msg, match) => { // this is where users unlink their phones from their account
	var chatId = msg.chat.id;
	var response = match[1]; // the captured user admin number
	User.getUserByAdmin(response).then(user => {
		User.setTelegram(user.admin_no, null);
		bot.sendMessage(chatId, "Unlink successful. You will no longer recieve notification.");
		Chat.systemMsg(chatId, "Unlink successful. You will no longer recieve notification.");
	})
});


module.exports = bot;