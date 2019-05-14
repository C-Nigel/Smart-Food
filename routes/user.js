const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', (req, res) => {
    const title = 'Smart Food';
    res.render('home', {title: title}) // renders views/home.handlebars
});

router.post('/register', (req, res) => {

    let { email, password, confirmpassword } = req.body;

    // Checks if both passwords entered are the same
//    if (password !== confirmpassword) {
//        errors.push({ text: 'Passwords do not match' });
//    }

    // Checks that password length is more than 4
//    if (password.length < 4) {
//        errors.push({ text: 'Password must be at least 4 characters' });
//    }
//    if (errors.length > 0) {
//        res.render('user/register', {
//            errors,
//            name,
//            email,
//            password,
//            password2
//        });
//    } else {
//        // If all is well, checks if user is already registered
//        User.findOne({ where: { email: req.body.email } })
//            .then(user => {
//                if (user) {
                    // If user is found, that means email has already been
                    // registered
//                    res.render('user/register', {
//                        error: user.email + ' already registered',
//                        name,
//                        email,
//                        password,
//                        password2
//                    });
//                } else {
                    // Encrypt the password
//                    var salt = bcrypt.genSaltSync(10);
//                    var hashedPassword = bcrypt.hashSync(password, salt);
//                    password = hashedPassword;

                    // Create new user record
                    User.create({ email, password })
                        .then(user => {
                            alertMessage(res, 'success', email.name + ' added. Please login', 'fas fa-sign-in-alt', true);
                            res.redirect('/loginuser');
                        })
                        .catch(err => console.log(err));
//                }
//            });
 //   }
});