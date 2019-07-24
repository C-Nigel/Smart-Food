const express = require('express');
const router = express.Router();
const User = require('../models/User');
var bcrypt = require('bcryptjs');
const alertMessage = require('../helpers/messenger');
const jwt = require('jsonwebtoken');
const Sequelize = require('sequelize');
const sgMail = require('@sendgrid/mail');
const variable = require('../class/user_class');

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
    let { admin_no, password } = req.body;
    User.findOne({
        where: {
            admin_no: admin_no,
            password: password
        }
    }).then(user => {
        res.redirect('/');
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
    let { full_name, admin_no, password, confirmpassword, phone_no, telegram_id } = req.body;
    var randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));

    if (isNaN(admin_no.slice(6,7))){
        if (isNaN(admin_no.slice(0,6))){
            res.render('user/register', {
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
                        admin_no,
                        full_name,
                        password,
                        confirmpassword,
                        phone_no
                    });
                }
            }
            else{
                errors.push({ text: 'Password must be at least 4 characters' });
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
            admin_no,
            full_name,
            password,
            confirmpassword,
            phone_no
        });
    }
    

});


module.exports = router;