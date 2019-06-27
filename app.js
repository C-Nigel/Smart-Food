const express = require('express');
const session = require('express-session');
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
/*const flash = require('connect-flash');
const FlashMessenger = require('flash-messenger'); */


const mainRoute = require('./routes/main');
const menuRoute = require('./routes/menu');
const userRoute = require('./routes/user');
//const stall = require('.')
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

//app.use('/profile', profileRoute);

// This code is to create DataBase
// Bring in database connection
const db = require('./config/DBConnection');
// Connects to MySQL database
db.setUpDB(false); // To set up database with new tables set (true)

const port = 5000;

app.listen(port, () =>{
    console.log(`Server started on port ${port}`);
});


const bot = require("./config/telegramConfig");
// catch message
bot.on('message', function (msg) {/* <function (msg)> or <(msg) => > */
    console.log(msg);
    // get sender id
    var sender = msg.chat.id;
    // get text
    var content = msg.text;

});
