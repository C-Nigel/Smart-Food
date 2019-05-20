const app = require('express')();
const exphbs = require('express-handlebars');
const path = require('path');

app.set('views', path.join(__dirname, "views"));
app.engine('handlebars', exphbs({
    // Specify default template views/user/home.handlebar
})); 
app.set("view engine", "handlebars");

app.get('/', (req, res) => {
    res.render("home");
})

app.listen(5000);