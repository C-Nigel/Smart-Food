const bot = require("../config/telegram");
const User = require("../class/user_class");
const Chat = require("../class/chat_class");

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
	bot.sendMessage(chatId, 'Which do you require assistance in?', {
		reply_markup: {
			inline_keyboard: [[
				{
					text: 'sign up',
					callback_data: 'sign-up'
				}, {
					text: 'linking',
					callback_data: 'link'
				}
			], [
				{
					text: 'unlinking',
					callback_data: 'unlink'
				}, {
					text: 'others',
					callback_data: 'others'
				}
			]]
		}
	});
});

bot.on("callback_query", (callbackQuery) => {
	const message = callbackQuery.data;
	const telegram_id = callbackQuery.from.id;
	if (message == "sign-up") {
		setTimeout(function () {
			bot.sendMessage(telegram_id, "An Active account is required on our website before you will be able to link your phone.");
			Chat.systemMsg(telegram_id, "An Active account is required on our website before you will be able to link your phone.");
			setTimeout(function () {
				bot.sendMessage(telegram_id, "Sign up for an account here: www.localhost:5000/register");
				Chat.systemMsg(telegram_id, "Sign up for an account here: www.localhost:5000/register");
			}, 200)
		}, 100)

	}
	else if (message == "link") {
		bot.sendMessage(telegram_id, "Send '/link <your admin number>' to start receiving notifications from us!");
		Chat.systemMsg(telegram_id, "Send '/link <your admin number>' to start receiving notifications from us!");

	}
	else if (message == "unlink") {
		bot.sendMessage(telegram_id, "Send '/unlink <your admin number>' to stop receiving all notifications from us.");
		Chat.systemMsg(telegram_id, "Send '/unlink <your admin number>' to stop receiving all notifications from us.");

	}
	else if (message == "others") {
		bot.sendMessage(telegram_id, "Contact our helpdesk at 8693 0190 and we will help you resolve your issues and concerns.");
		Chat.systemMsg(telegram_id, "Contact our helpdesk at 8693 0190 and we will help you resolve your issues and concerns.");

	}
});

bot.onText(/\/link (.+)/, (msg, match) => { // this is where users connect their phone to their accounts
	// 'msg' is the received Message from Telegram
	// 'match' is the result of executing the regexp above on the text content of the message

	var chatId = msg.chat.id;
	var response = match[1]; // the captured user admin number
	User.getUserByAdmin(response).then(user => {
		if (user == null) {
			bot.sendMessage(chatId, "Admin number not found.");
			bot.sendMessage(chatId, "Sign up for an account on our website before attempting to link up.");

		}
		else if (user && user.telegram_id == null) {
			User.setTelegram(response, chatId)
				.then(() => {
					bot.sendMessage(chatId, "Thank you for verifying! You will now receieve notifications with your meal is ready!");
					Chat.systemMsg(chatId, "Thank you for verifying! You will now receieve notifications with your meal is ready!");
				})
				.catch(err => {
					bot.sendMessage(chatId, "It seems like you have already registered this phone with another account!");
					Chat.systemMsg(chatId, "It seems like you have already registered this phone with another account!");
				});
		}
		else if (!user) {
			bot.sendMessage(chatId, "No such admin number registered to user!");
			Chat.systemMsg(chatId, "No such admin number registered to user!");
		}
		else if (user.telegram_id == chatId) {
			bot.sendMessage(chatId, "This phone is already linked to your account.");
			Chat.systemMsg(chatId, "This phone is already linked to your account.");
		}
		else if (user.telegram_id != null) {
			bot.sendMessage(chatId, "There already is a phone registered with this account!");
			Chat.systemMsg(chatId, "There already is a phone registered with this account!");
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
		if (user == null) {
			bot.sendMessage(chatId, "Admin number not found.");
			Chat.systemMsg(chatId, "Admin number not found.");
			setTimeout(function () {
				bot.sendMessage(chatId, "Verify that your admin number provided is correct.");
				Chat.systemMsg(chatId, "Verify that your admin number provided is correct.");

			}, 500)

		}
		else if (user && user.telegram_id == chatId) {
			User.setTelegram(user.admin_no, null);
			bot.sendMessage(chatId, "Unlink successful. You will no longer recieve notification.");
			Chat.systemMsg(chatId, "Unlink successful. You will no longer recieve notification.");

		}
		else {
			bot.sendMessage(chatId, "Admin number provided does not belong to you!");
			Chat.systemMsg(chatId, "Admin number provided does not belong to you!");

		}

		//Chat.systemMsg(chatId, "Unlink successful. You will no longer recieve notification.");
	})
});


module.exports = bot;