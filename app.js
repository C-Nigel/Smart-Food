const express = require('express');
const session = require('express-session');
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
/*const flash = require('connect-flash');
const FlashMessenger = require('flash-messenger'); */

//const User = require("./models/User")

const mainRoute = require('./routes/main');
const menuRoute = require('./routes/menu');
const userRoute = require('./routes/user');


// fixing my issue with save btn from stallownerConfig
/*
const stallRoute = require('./views/stall');
*/

//const profileRoute = require('./routes/profile');

const app = express();

app.engine('handlebars', exphbs({
	// Specify default template views/user/home.handlebar
}));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({
	extended: false
}));

/*
app.use(flash());
app.use(FlashMessenger.middleware);
app.use(function (req, res, next) {
	res.locals.success_msg = req.flash('success_msg');
	res.locals.error_msg = req.flash('error_msg');
	res.locals.error = req.flash('error');
	res.locals.user = req.user || null;
	next();
});
app.use(function (req, res, next) {
	next();
});
*/
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('__method'));
app.use(cookieParser());

app.use('/', mainRoute);
app.use('/menu', menuRoute);
app.use('/user', userRoute);


/*
app.use('/stall', stallRoute);
*/
//app.use('/profile', profileRoute);

// This code is to create DataBase
// Bring in database connection
const db = require('./config/DBConnection');
// Connects to MySQL database
db.setUpDB(false); // To set up database with new tables set (true)

const port = 5000;

app.listen(port, () => {
	console.log(`Server started on port ${port}`);
});

const bot = require("./config/telegramConfig");
const User = require("./class/user_class");


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

	bot.sendMessage(msg.chat.id, 'Hi there, thank you for signing up with us! Please send "/verify <your admin no.>" back to verify your account.');
	bot.sendMessage(msg.chat.id, 'eg. "/verify 1xxxxxxA"');

	});
	
bot.onText(/\/verify (.+)/, (msg, match) => {
	// 'msg' is the received Message from Telegram
	// 'match' is the result of executing the regexp above on the text content
	// of the message

	var chatId = msg.chat.id;
	var resp = match[1]; // the captured "whatever"

	User.getUserByAdmin(resp).then(user => {
		User.setTelegram(user.id, chatId);
	});

	// send back the matched "whatever" to the chat
	bot.sendMessage(chatId, "Thank you for verifying! you will now receieve notifications with your meal is ready!");
});