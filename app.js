const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');


const mainRoute = require('./routes/main');


const app = express();

app.engine('handlerbars', exphbs({
    defaultLayout: 'main' // Specify default template views/user/home.handlebar
}));
app.use('view engine', 'handlebars');
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('__method'));
app.use(cookieParser());

app.use('/', mainRoute);

const port = 5000;

app.listen(port, () =>{
    console.log(`Server started on port ${port}`);
});