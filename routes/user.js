const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const alertMessage = require('../helpers/messenger');
const jwt = require('jsonwebtoken');
const sgMail = require('@sendgrid/mail');
const user = require('../class/user_class');
const outlet = require('../class/outlet_class');
const fs = require('fs');
const upload = require('../helpers/imageUpload');
const storage = require('node-sessionstorage');

router.get('/', (req, res) => {
    const title = 'Smart Food';
    res.render('home', {
        title: title
    }) // renders views/home.handlebars
});

router.post('/changepassword', (req, res) => {
    let errors = [];
    let {
        old_password,
        new_password,
        confirmpassword
    } = req.body;
    var admin = storage.getItem("user");
    var salt = bcrypt.genSaltSync(10);
    console.log(admin);
    user.getUserByAdmin(admin).then(user => {
        var isSame = bcrypt.compareSync(old_password, user.password);
        console.log(isSame);
        console.log(user);
        if (isSame == false) {
            errors.push({
                text: 'Old password not correct!'
            });
        }
        if (new_password != confirmpassword) {
            errors.push({
                text: 'New passwords do not match!'
            });
        }
        if (errors.length > 0) {
            res.render('user/changepassword', {
                errors
            });
        }
        if (isSame == true) {
            var hashednewPassword = bcrypt.hashSync(new_password, salt);
            User.update({
                password: hashednewPassword
            }, {
                where: {
                    admin_no: admin
                }
            }).then(user => {
                console.log(user);
                var User = user;
                res.redirect('/', {
                    User
                });
            })
        }
    });
});
router.post('/profile', (req, res) => {
    let errors = [];
    let {
        admin_no,
        full_name,
        password,
        telegram_id,
        confirmpassword,
        phone_no,
        picture
    } = req.body;
    if (password !== confirmpassword) {
        errors.push({
            text: 'Passwords do not match'
        });
    }
    if (phone_no.length != 8) {
        errors.push({
            text: 'Phone number invalid'
        });
    }
    if (errors.length > 0) {
        res.render('user/profile', {
            errors,
            full_name,
            admin_no,
            phone_no,
            picture,
            telegram_id
        });
    } else {
        user.getUserByAdmin(admin_no).then(user => {
            var isSame = bcrypt.compareSync(password, user.password);;
            if (!isSame) {
                errors.push({
                    text: 'Password is incorrect!'
                });
                res.render('user/profile', {
                    errors,
                    full_name,
                    admin_no,
                    phone_no,
                    picture,
                    telegram_id
                });
            } else {
                console.log(user);

                if (user == null) {
                    res.redirect('/register');
                } else {
                    User.update({
                        full_name: full_name,
                        phone_no: phone_no,
                        picture_url: picture
                    }, {
                        where: {
                            admin_no: admin_no
                        }
                    }).then(user => {
                        console.log(user);
                        res.render('user/profile', {
                            admin_no,
                            full_name,
                            phone_no,
                            picture,
                            telegram_id
                        });
                    })
                }
            }

        }); //variable.updateAll(admin_no, full_name, phone_no, password, picture)
    }


});


router.post('/upload', (req, res) => {
    // Creates user id directory for upload if not exist
    if (!fs.existsSync('./public/uploads')) {
        fs.mkdirSync('./public/uploads');
    }

    upload(req, res, (err) => {
        res.json({
            file: `/uploads/${req.file.filename}`
        });

    });
});


router.post('/register', (req, res) => {
let errors = [];
let success_msg = 'User successfully registered!';
// Retrieves fields from register page from request body
let {
    full_name,
    admin_no,
    phone_no,
    password,
    confirmpassword
} = req.body;
var email = admin_no + "@mymail.nyp.edu.sg";

// Checks if both passwords entered are the same
if (password != confirmpassword) {
    errors.push({
        text: 'Passwords do not match'
    });
    alertMessage(res, 'success', 'Passwords do not match!.',
        'fas fa-sign-in-alt', true);

}

// Checks that password length is more than 4
if (password.length < 4) {
    errors.push({
        text: 'Password must be at least 4 characters'
    });
}

if (isNaN(admin_no.slice(0, 6))) {
    errors.push({
        text: 'Password must be at least 4 characters'
    });
}
if (phone_no.length != 8) {
    errors.push({
        text: 'Password must be at least 4 characters'
    });
}

if (errors.length > 0) {
    console.log(errors);
    res.render('user/register', {
        errors,
        full_name,
        admin_no,
        phone_no,
        password,
        confirmpassword
    });
} else {
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

    user.createUser(admin_no, full_name, password, phone_no)
        .then(user => {
            res.render('user/loginuser', {
                success_msg
            });
        }).catch(err => {
            console.log(err)
            res.render('user/register', {
                errors,
                full_name,
                admin_no,
                phone_no,
                password,
                confirmpassword
            });
        });
}
});

router.post('/loginuser', (req, res) => {
    let errors = [];
    let {
        admin_no,
        password
    } = req.body;
    var pass = password;
    if (password.length < 4) {
        errors.push({
            text: 'Password must be at least 4 characters'
        });
    }

    if (isNaN(admin_no.slice(0, 6))) {
        errors.push({
            text: 'Admin Number is not valid!'
        });
    }
    if (errors.length > 0) {
        res.render('user/loginuser', {
            errors,
            admin_no,
            password
        });
    } else {
        user.getUserByAdmin(admin_no).then(user => {
            var isSame = bcrypt.compareSync(pass, user.password);;
            console.log(user.password);
            if (!isSame) {
                errors.push({
                    text: 'Password is incorrect!'
                });
                res.render('user/loginuser', {
                    errors,
                    admin_no
                });
            } else {
                storage.setItem("user", user.admin_no);
                console.log(storage.getItem("user"));
                console.log(user);

                if (user == null) {
                    res.redirect('/register');
                } else {
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
            }



        })
    }
});

router.post('/forgetpw', (req, res) => {
    let errors = [];
    let success_msg = 'Email sent!, Please check your school email!';
    let {
        admin_no
    } = req.body;
    user.getUserByAdmin(admin_no).then(user => {
        if (user == null) {
            errors.push({
                text: 'Admin number not found!'
            });
            res.render('user/forgetpw', {
                errors
            });
        } else {
            console.log(user);
            var newpass = Math.random().toString(36).replace('0.', '').substr(0, 8);
            console.log(newpass)
            var salt = bcrypt.genSaltSync(10);
            var hashednewPassword = bcrypt.hashSync(newpass, salt);
            User.update({
                password: hashednewPassword
            }, {
                where: {
                    admin_no: admin_no
                }
            }).then(user => {
                console.log(user);
                var email = admin_no + '@mymail.nyp.edu.sg';
                sgMail.setApiKey('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');
                const msg = {
                    to: email,
                    from: '180527e@mymail.nyp.edu.sg',
                    subject: 'Forget Password',
                    text: 'Generated password',
                    html: `This is your new password ` + newpass + ` </br> Please use this random generated password to login<a href="http://localhost:5000/loginuser"> here `
                    //html: 'Your password is ' + user.password

                };
                sgMail.send(msg);
                res.render('user/loginuser', {
                    success_msg
                });
            })
        }

    })
});

router.post('/loginseller', (req, res) => {
    let errors = [];
    let {
        stall_id,
        password
    } = req.body;
    var pass = password;

    if (isNaN(stall_id)) {
        errors.push({
            text: 'Stall id invalid!'
        });
    }
    if (errors.length > 0) {
        res.render('user/loginuser', {
            errors,
            admin_no,
            password
        });
    } else {
        outlet.getOutletById(stall_id).then(user => {
            //var isSame = bcrypt.compareSync(pass, user.password); ************need uncomment once malique can create stall ownerr user
            console.log(user.password);
            //if(!isSame){
            if (pass != user.password) {
                errors.push({
                    text: 'Password incorrect!'
                });
                res.render('user/loginseller', {
                    errors,
                    stall_id
                });
            } else {
                storage.setItem("owners", user.id);
                console.log(storage.getItem("owners"));
                console.log(user);

                if (user == null) {
                    res.redirect('/register');
                } else {
                    var admin_no = user.admin_no
                    var full_name = user.full_name;
                    var phone_no = user.phone_no;
                    var picture = user.picture;
                    var telegram_id = user.telegram_id;
                    req.session.user = user;
                    res.redirect('/orders');
                }
            }
        })
    }
});



module.exports = router;