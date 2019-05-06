const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');


const loginRoute = require('./views/user')





const app = express();

app.engine('handlerbars', exphbs({
    defaultLayout: 'login' // Specify default template views/user/login.handlebar
}));
app.use('view engine', 'handlebars');
app.use(bodyParser.urlencoded({
    extended: false;
}))
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('__method'));
app.use(cookieParser());

app.use('/login', loginRoute);

const port = 5000;

app.listenerCount(port, () =>{
    console.log(`Server started on port ${port}`);
});