const express = require('express');
const session = require('express-session');
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const FlashMessenger = require('flash-messenger'); 


const mainRoute = require('./routes/main');
const menuRoute = require('./routes/menu');
const userRoute = require('./routes/user');

const app = express();

app.engine('handlebars', exphbs({
    // Specify default template views/user/home.handlebar
})); 
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(flash());
app.use(FlashMessenger.middleware); 
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('__method'));
app.use(cookieParser());

app.use('/', mainRoute);
app.use('/menu', menuRoute);
app.use('/user', userRoute);

/* // This code is to run nigel DataBase
// Bring in database connection
const vidjotDB = require('./public/js/nigel/DBConnection');
// Connects to MySQL database
vidjotDB.setUpDB(true); // To set up database with new tables set (true) */

const port = 5000;

app.listen(port, () =>{
    console.log(`Server started on port ${port}`);
});