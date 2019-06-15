const express = require('express');
const router = express.Router();
const User = require('../models/User');
var bcrypt = require('bcryptjs');
const alertMessage = require('../helpers/messenger');
const jwt = require('jsonwebtoken');

router.get('/', (req, res) => {
    const title = 'Smart Food';
    res.render('home', {title: title}) // renders views/home.handlebars
});

router.post('/register', (req, res) => {

    let errors = [];
    // Retrieves fields from register page from request body
    let { full_name, admin_no, password, confirmpassword, phone_no } = req.body;
    var randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    var user_id = randLetter + Date.now(); 
    var telegram_id = "";
    var email = admin_no + "@mymail.nyp.edu.sg"
    // Checks if both passwords entered are the same
    if (password !== confirmpassword) {
        errors.push({ text: 'Passwords do not match' });
    }

    // Checks that password length is more than 4
    if (password.length < 4) {
        errors.push({ text: 'Password must be at least 4 characters' });
    }
    if (isNaN(phone_no)) {
        errors.push({ text: 'Phone number must be in digits' });
    }
    if (phone_no.length < 9) {
        errors.push({ text: 'Phone number must be 8 digits' });
    }
    if (errors.length > 0) {
        res.render('user/register', {
            errors,
            user_id,
            admin_no,
            full_name,
            password,
            confirmpassword,
            phonenumber
        });
    } else {
        // If all is well, checks if user is already registered
        User.findOne({ where: { admin_no: req.body.admin_no } })
            .then(user => {
                if (user) {
                    // If user is found, that means email has already been
                    // registered
                    res.render('user/register', {
                        error: user.admin_no + ' already registered',
                        user_id,
                        admin_no,
                        full_name,
                        password,
                        confirmpassword,
                        phonenumber
                    });
                } else {
                    // Practical 11 Activity 04
                    // Generate JWT token
                    let token;
                    // Encrypt the password
                    var salt = bcrypt.genSaltSync(10);
                    var hashedPassword = bcrypt.hashSync(password, salt);
                    password = hashedPassword;


                    jwt.sign(email, hashedPassword, (err, jwtoken) => {
                        if (err) {
                            console.log('Error generating Token: ' + err);
                        }
                        token = jwtoken;
                    });

                    // Create new user record
                    User.create({
                        user_id,
                        admin_no,
                        full_name,
                        password,
                        phone_no,
                        telegram_id,
                        // Practical 11 Activity 04
                        admin_status: 0, // Add this statement – set verify to false
                    }).then(user => {
                        // Practical 11 Activity 04
                        sendEmail(user.id, email, token) // Add this to call sendEmail function
                            .then(msg => { // Send email success
                                alertMessage(res, 'success', user.full_name + ' added. Please logon to ' +
                                    email + ' to verify account.',
                                    'fas fa-sign-in-alt', true);
                                res.redirect('/loginuser');
                            }).catch(err => { // Send email fail
                                alertMessage(res, 'warning', 'Error sending to ' + user.email,
                                    'fas fa-sign-in-alt', true);
                                res.redirect('/loginuser');
                            });
                    }).catch(err => {
                        console.log(err)
                    });
                }
            });
    }
});


module.exports = router;