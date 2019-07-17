const express = require('express');
const router = express.Router();
const User = require('../models/User');
var bcrypt = require('bcryptjs');
const passport = require('passport');
const alertMessage = require('../helpers/messenger');
const jwt = require('jsonwebtoken');
const Sequelize = require('sequelize');
const sgMail = require('@sendgrid/mail');
const variable = require('../class/user_class');

/* var mysql = require('mysql2');

var con = mysql.createConnection({
    host: "bloopy.dyndns-home.com",
    //host: "diskstation",
    port: 3307,
    user: "guest",
    password: "password",
    database: "ooadp"
  }); */
  

router.get('/', (req, res) => {
    const title = 'Smart Food';
    res.render('home', {title: title}) // renders views/home.handlebars
});

router.post('/profile', (req, res) => {
    let { full_name, admin_no, password, confirmpassword, phone_no, telegram_id } = req.body;
    variable.setAdmin(user.id, admin_no)
    /*con.connect(function(err) {
        if (err) throw err;
        var sql = "UPDATE user SET full_name = fullname WHERE address = 'Valley 345'";
        con.query(sql, function (err, result) {
          if (err) throw err;
          console.log(result.affectedRows + " record(s) updated");
        });
    }); */
});

router.post('/loginuser', (req, res) => {
    let errors = [];
    let { admin_no, password } = req.body;
    if (password.length < 4) {
        errors.push({ text: 'Password must be at least 4 characters' });
    }

    if (isNaN(admin_no.slice(0,6))){
        errors.push({ text: 'Admin Number is not valid!' });
    }
    else
    {
        variable.getUserByAdmin(admin_no).then(user =>{
            if (user == null)
            {
                res.redirect('/register');
            }
            else if(user.password == password)
            {
                passport.authenticate('local', {
                    successRedirect: '/', // Route to /video/listVideos URL
                    failureRedirect: '/loginuser', // Route to /login URL
                    failureFlash: true
                    /* Setting the failureFlash option to true instructs Passport to flash an error
                    message using the message given by the strategy's verify callback, if any.
                    When a failure occur passport passes the message object as error */
                })(req, res, next);
                

            }
        }).then(user => {
            console.log(user);
        })
    } 
});

router.get('/profile', (req, res) => {
    User.findAll({
        admin_no: admin_no
    }).then(user => {
        res.render('user/profile', user)
    })
});

router.post('/forgetpw', (req, res) => {
    let { admin_no } = req.body;
    User.findOne({
        where: {
            admin_no: admin_no,
        }
    }).then(user => {
        var email = admin_no + '@mymail.nyp.edu.sg';
        sgMail.setApiKey('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');
        const msg = {
            to: email,
            from: '180527e@mymail.nyp.edu.sg',
            subject: 'Forget Password',
            text: 'OOADP is such a struggle',
            html: 'Nothing to see'
 
        };
        sgMail.send(msg);
        res.redirect('/loginuser');
    })
});
router.post('/register', (req, res) => {
    let errors = [];
    
    // Retrieves fields from register page from request body
    let { full_name, admin_no, phone_no, password, confirmpassword } = req.body;
    var email = admin_no + "@mymail.nyp.edu.sg";

    // Checks if both passwords entered are the same
    if (password !== confirmpassword) {
        errors.push({ text: 'Passwords do not match' });
    }

    // Checks that password length is more than 4
    if (password.length < 4) {
        errors.push({ text: 'Password must be at least 4 characters' });
    }

    if (isNaN(admin_no.slice(0,6))){
        errors.push({ text: 'Admin Number is not valid!' });
    }

    if (phone_no.length != 8){
        errors.push({ text: 'Invalid phone number!' });
    }

    if (errors.length > 0) {
        res.render('user/register', {
            errors,
            full_name,
            admin_no,
            phone_no,
            password,
            confirmpassword
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
                        full_name,
                        admin_no,
                        phone_no,
                        password,
                        confirmpassword
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
                        admin_no,
                        full_name,
                        phone_no,
                        password,
                        telegram_id: null,
                        // Practical 11 Activity 04
                        admin_status: 0, // Add this statement – set verify to false
                    }).then(user => {
                        // Practical 11 Activity 04
                        /*sendEmail(user.id, user.email, token) // Add this to call sendEmail function
                            .then(msg => { // Send email success
                                alertMessage(res, 'success', user.name + ' added. Please logon to ' +
                                    user.email + ' to verify account.',
                                    'fas fa-sign-in-alt', true);
                                res.redirect('/showLogin');
                            }).catch(err => { // Send email fail
                                alertMessage(res, 'warning', 'Error sending to ' + user.email,
                                    'fas fa-sign-in-alt', true);*/
                        res.redirect('/loginuser');

                    }).catch(err => {
                        console.log(err)
                    });
                }
            });
    }
});
    /*let errors = [];
    let { full_name, admin_no, password, confirmpassword, phone_no, telegram_id } = req.body;
    var randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));

    if (isNaN(admin_no.slice(6,7))){
        if (isNaN(admin_no.slice(0,6))){
            res.render('user/register', {
                errors,
                admin_no,
                full_name,
                password,
                confirmpassword,
                phone_no
            });
        }
        else{
            if (password == confirmpassword) {
                if (password.length > 3){
                    if (phone_no.length == 8){
                        let token;
                    // Encrypt the password
                        User.create({
                            admin_no,
                            full_name,
                            password,
                            phone_no,
                            telegram_id : 0,
                            admin_status: 0
                            // Practical 11 Activity 04
                             // Add this statement – set verify to false
                        })
                        res.redirect('/loginuser');
                        
                        
                    }
                    else{
                        res.render('user/register', {
                            errors,
                            admin_no,
                            full_name,
                            password,
                            confirmpassword,
                            phone_no
                        });
                    }
                }
                else{
                    alertMessage(res, 'danger', 'Password not the same', 'fas fa-exclamation - circle', true);
                    res.render('user/register', {
                        errors,
                        admin_no,
                        full_name,
                        password,
                        confirmpassword,
                        phone_no
                    });
                }
            }
            else{
                errors.push({ text: 'Password not the same!' });
                res.render('user/register', {
                    error,
                    admin_no,
                    full_name,
                    password,
                    confirmpassword,
                    phone_no
                });
            }
        }
    }
    else{
        res.render('user/register', {
            errors,
            admin_no,
            full_name,
            password,
            confirmpassword,
            phone_no
        });
    }*/
    
    /*let errors = [];
    // Retrieves fields from register page from request body
    let { full_name, admin_no, password, confirmpassword, phone_no } = req.body;
    var randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    var user_id = randLetter + Date.now(); 
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
            phone_no
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
                        phone_no
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
                         // Add this statement – set verify to false
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
    } */



module.exports = router;