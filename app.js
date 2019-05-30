const express = require('express');
const session = require('express-session');
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');



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


app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('__method'));
app.use(cookieParser());

app.use('/', mainRoute);
app.use('/menu', menuRoute);
app.use('/user', userRoute);

const port = 5000;

app.listen(port, () =>{
    console.log(`Server started on port ${port}`);
});