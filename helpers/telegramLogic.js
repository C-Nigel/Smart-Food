const bot = require("../config/telegram");
const User = require("../class/user_class");
const Chat = require("../class/chat_class")

// catch message
bot.on('message', function (msg) {/* <function (msg)> or <(msg) => > */
	console.log(msg);
	// get sender id
	var sender = msg.chat.id;
	//User.create({user_id:"dwsa", admin_no:"w122", full_name:"qwer", password:"ggad", phone_no:"12345678", telegram_id:sender, admin_status: 0})
    // get text
	//User.create({ user_id: "1", admin_no: "180448w", full_name: "Nigel Cheong", password: "pls_encrypt_this", phone_no: "12345678", telegram_id: null, admin_status: null })
	// get text
	var content = msg.text;
	//User.getUserByTelegram(sender).then(user =>{
	//	Chat.userMsg(user, content);
	//});

});

/*
con.connect(function(err) {
	if (err) throw err;
	var him = "'180448w'";
	
	var sql = "UPDATE ooadp.users SET telegram_id = '2313' WHERE admin_no = " + him ;
	console.log (sql)
	con.query(sql, function (err, result) {
		if (err) throw err;
		console.log(result.affectedRows + " record(s) updated");
	});
});
*/
/*
// Matches "/echo [whatever]"
bot.onText(/\/start (.+)/, (msg, match) => {
	// 'msg' is the received Message from Telegram
	// 'match' is the result of executing the regexp above on the text content
	// of the message

	const chatId = msg.chat.id;
	const resp = "Hi there, thank you for signing up! \xF0\x9F\x98\x8A"; // the captured "whatever"

	// send back the matched "whatever" to the chat
	bot.sendMessage(chatId, resp);
});
*/
bot.onText(/\/start/, (msg) => {

	bot.sendMessage(msg.chat.id, 'Hi there, thank you for signing up with us! Send "/verify <your admin no.>" to link this phone to your Smart Food account.');
	bot.sendMessage(msg.chat.id, 'eg. "/verify 1xxxxxxA"');

	});

bot.onText(/\/verify (.+)/, (msg, match) => {
	// 'msg' is the received Message from Telegram
	// 'match' is the result of executing the regexp above on the text content of the message

	var chatId = msg.chat.id;
	var response = match[1]; // the captured user admin number
	User.getUserByAdmin(response).then(user => {
		User.setTelegram(user.id, chatId);
		//var successMsg = "Linking successful! you will now receieve notifications from this phone when your meal is ready! :smile";
		bot.sendMessage(chatId, "Linking successful! you will now receieve notifications from this phone when your meal is ready! :smile");
		//Chat.systemMsg(user.id, successMsg);
	});


	
			
});

module.exports = bot;