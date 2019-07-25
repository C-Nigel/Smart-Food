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
const storage = require('node-sessionstorage');

router.get('/', (req, res) => {
    const title = 'Smart Food';
    res.render('home', {title: title}) // renders views/home.handlebars
});

// router.get('/:admin_no', (req, res) =>{
//     res.send('admin_no: ' + req.params.admin_no)
//     //  variable.getUserByAdmin(admin_no).then(user =>{
//     //      console.log(user);
         
//     //  });
//  });
// router.get('/profile', (req, res) => {
//     var admin = storage.getItem("user");
//     console.log(admin);
//     variable.getUserByAdmin(admin).then(user =>{
//         console.log(user);
//         var admin_no = user.admin_no;
//         var full_name = user.full_name;
//         var phone_no = user.phone_no;
//         var telegram_id = user.telegram_id;
//         var picture = user.picture;
//         res.render('/profile',{
//             admin_no,
//             full_name,
//             phone_no,
//             telegram_id,
//             picture
//         }
//         );
//     })
// });
router.post('/changepassword', (req, res) => {
    let errors = [];
    let {old_password, new_password, confirmpassword} = req.body;
    var admin = storage.getItem("user");
    var salt = bcrypt.genSaltSync(10);
    var hashedPassword = bcrypt.hashSync(old_password, salt);
    variable.getUserByAdmin(admin).then(user =>{
        console.log(user);
        if(user.password != hashedPassword){
            errors.push({ text: 'Old password not correct!' });
        }
        if (new_password != confirmpassword) {
            errors.push({ text: 'New passwords do not match!' });
        }
        if (errors.length > 0) {
            res.render('user/profile', {
                errors
            });
        }
       else{
            var hashednewPassword = bcrypt.hashSync(new_password, salt);
            User.update({
                password: hashednewPassword
            }, {
                where: {admin_no: admin}
            }
            ).then(user => {
                console.log(user);
                res.render('/',{
                });
        })
       }
    });
    
});
router.post('/profile', (req, res) => {
    let errors = [];
    let {admin_no, full_name, password, confirmpassword, phone_no, picture} = req.body;
    if (password !== confirmpassword) {
        errors.push({ text: 'Passwords do not match' });
    }
    if (errors.length > 0) {
        res.render('user/profile', {
            errors,
            full_name,
            admin_no,
            phone_no,
            picture
        });
    }
    else{
        variable.getUserByAdmin(admin_no).then(user =>{
            console.log(user);

            if (user == null)
            {
                res.redirect('/register');
            }

            else
            {
                User.update({
                    full_name: full_name,
                    phone_no: phone_no,
                    picture: picture
                }, {
                    where: {admin_no: admin_no}
                }
                ).then(user => {
                    console.log(user);
                    res.render('user/profile',{
                        admin_no,
                        full_name,
                        phone_no,
                        picture
                    });
                })
            }
        });        //variable.updateAll(admin_no, full_name, phone_no, password, picture)
    }
    

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
                        picture: null,
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

router.post('/loginuser', (req, res) => {
    let errors = [];
    let {admin_no, password} = req.body;
    if (password.length < 4) {
        errors.push({ text: 'Password must be at least 4 characters' });
    }

    if (isNaN(admin_no.slice(0,6))){
        errors.push({ text: 'Admin Number is not valid!' });
    }
    else
    {
        variable.getUserByAdmin(admin_no).then(user =>{
            storage.setItem("user", user.admin_no);
            console.log(storage.getItem("user"));
            console.log(user);

            if (user == null)
            {
                res.redirect('/register');
            }

            else
            {
                var admin_no = user.admin_no
                var full_name = user.full_name;
                var phone_no = user.phone_no;
                var picture = user.picture;
                var telegram_id = user.telegram_id;
                req.session.user = user;
                // res.render('user/profile',{
                //     admin_no,
                //     full_name,
                //     phone_no,
                //     picture,
                //     telegram_id
                // });
                res.redirect('/');
                // passport.authenticate('local', {
                // successRedirect: '/profile', // Route to /video/listVideos URL
                // failureRedirect: '/loginuser', // Route to /login URL
                // failureFlash: true
                //  /* Setting the failureFlash option to true instructs Passport to flash an error
                //    message using the message given by the strategy's verify callback, if any.
                // When a failure occur passport passes the message object as error */
                // })(req, res, next);
            }    

            
        })
    } 
});

router.post('/forgetpw', (req, res) => {
    let { admin_no } = req.body;
    variable.getUserByAdmin(admin_no).then(user =>{
        console.log(user);
        var email = admin_no + '@mymail.nyp.edu.sg';
        sgMail.setApiKey('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');
        const msg = {
            to: email,
            from: '180527e@mymail.nyp.edu.sg',
            subject: 'Forget Password',
            text: 'OOADP is such a struggle',
            html: `TPlease refer to this link <a href="http://localhost:5000/user/profile"> to reset your password `
            //html: 'Your password is ' + user.password
 
        };
        sgMail.send(msg);
        res.redirect('/loginuser');
    })
});

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