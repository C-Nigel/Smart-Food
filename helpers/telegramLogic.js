var te = module.exports = {};
var bot = require("../config/telegramConfig");


// catch message
bot.on('message', function (msg) {/* <function (msg)> or <(msg) => > */
    console.log(msg);
    // get sender id
    var sender = msg.chat.id;
    User.create({ user_id: "1", admin_no: "180448w", full_name: "Nigel Cheong", password: "pls_encrypt_this", phone_no: "12345678", telegram_id: null, admin_status: null })
    // get text
    var content = msg.text;

});

/*
te.con.connect(function (err) {
    if (err) throw err;
    var him = "'180448w'";

    var sql = "UPDATE ooadp.users SET telegram_id = '2313' WHERE admin_no = " + him;
    console.log(sql)
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log(result.affectedRows + " record(s) updated");
    });
});
*/

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

bot.onText(/\/verify (.+)/, (msg, match) => {
    // 'msg' is the received Message from Telegram
    // 'match' is the result of executing the regexp above on the text content
    // of the message

    const chatId = msg.chat.id;
    const resp = match[1]; // the captured "whatever"
    con.connect(function (err) {
        if (err) throw err;
        var sql = "UPDATE ooadp.users SET telegram_id = '" + chatId +" WHERE admin_no = '" + resp + "'";
        console.log(sql)
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log(result.affectedRows + " record(s) updated");
        });
    });
    // send back the matched "whatever" to the chat
    bot.sendMessage(chatId, resp);
});

module.exports = bot;