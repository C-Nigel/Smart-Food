const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    const title = 'Smart Food';
    res.render('home', {title: title}) // renders views/home.handlebars
});

router.post('/register', (req, res) => {

    let { name, adminnumber, password, confirmpassword, phonenumber, media } = req.body;

    // Checks if both passwords entered are the same
    if (password !== confirmpassword) {
        errors.push({ text: 'Passwords do not match' });
    }
    else {
        res.render('user/register', {
            errors,
            name,
            adminnumber,
            password,
            confirmpassword,
            phonenumber,
            media
        });
    }
    // Checks that password length is more than 4
    if (password.length < 4) {
        errors.push({ text: 'Password must be at least 4 characters' });
    }
    if (errors.length > 0) {
        res.render('user/register', {
            errors,
            name,
            adminnumber,
            password,
            confirmpassword,
            phonenumber,
            media
        });
    } else {
        // If all is well, checks if user is already registered
        User.findOne({ where: { adminnumber: req.body.adminnumber } })
            .then(user => {
                if (user) {
                    // If user is found, that means email has already been registered
                    res.render('user/register', {
                        error: user.adminnumber + ' already registered',
                        name,
                        adminnumber,
                        password,
                        confirmpassword,
                        phonenumber,
                        media
                    });
                } else {
                    // Encrypt the password
                    var salt = bcrypt.genSaltSync(10);
                    var hashedPassword = bcrypt.hashSync(password, salt);
                    password = hashedPassword;

                    // Create new user record
                    User.create({ name, adminnumber, password, phonenumber, media})
                        .then(user => {
                            alertMessage(res, 'success', adminnumber.name + ' added. Please login', 'fas fa-sign-in-alt', true);
                            res.redirect('/loginuser');
                       })
                        .catch(err => console.log(err));
                }
            });
    }
});
module.exports = router;