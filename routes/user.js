const express = require('express');
const router = express.Router();
const Usermodel = require('../models/User');
const Order = require('../models/Order');
var bcrypt = require('bcryptjs');
const passport = require('passport');
const alertMessage = require('../helpers/messenger');
const jwt = require('jsonwebtoken');
const sgMail = require('@sendgrid/mail');
const user = require('../class/user_class');
const outlet = require('../class/outlet_class');
const fs = require('fs');
const upload = require('../helpers/imageUpload');
const Chat = require('../models/Chat');
const Rating = require('../models/Rating');
const bot = require("../config/telegram");

var counter = 0;

router.get('/', (req, res) => {
    const title = 'Smart Food';
    res.render('home', {
        title: title
    }) // renders views/home.handlebars
});

router.post('/delete', (req, res) => {
    let errors = [];
    let success = 'User successfully deleted';
    let {
        password,
        confirmpassword
    } = req.body;
    var User = req.session.user;
    if (password != confirmpassword) {
        errors.push({
            text: 'Passwords not the same!'
        });
        res.render('user/delete', {
            User,
            errors
        });
    } else {
        user.getUserByAdmin(User).then(user => {
            var isSame = bcrypt.compareSync(password, user.password);
            if (isSame == false) {
                errors.push({
                    text: 'Incorrect Password!'
                });
                res.render('user/delete', {
                    User,
                    errors
                });
            }
            if (isSame == true) {
                if (user.telegram_id != undefined) {
                    setTimeout(function () {
                        bot.sendMessage(user.telegram_id, 'your account has been deleted.');
                    }, 300)
                    setTimeout(function () {
                        bot.sendMessage(user.telegram_id, 'You will now no longer receive notifications.');
                    }, 300)
                    setTimeout(function () {
                        bot.sendMessage(user.telegram_id, 'If you did not authorize this, please contact an admin immediately.');
                    }, 300)
                }
                setTimeout(function () {
                    Order.destroy({
                        where: {
                            user_admin: User
                        }
                    })
                    Chat.destroy({
                        where: {
                            user_admin: User
                        }
                    })
                    Rating.destroy({
                        where: {
                            user_admin: User
                        }
                    })
                    Usermodel.destroy({
                        where: {
                            admin_no: User
                        }
                    });
                }, 1200)

                req.session.user = null;
                res.redirect('/');
            }
        })
    }
});
router.post('/twofa', (req, res) => {
    let success_msg = [];
    var User = req.session.user;
    user.getUserByAdmin(User).then(user => {
        if (user.admin_status == 0) {
            Usermodel.update({
                admin_status: 1
            }, {
                where: {
                    admin_no: User
                }
            }).then(user => {
                success_msg.push({
                    text: 'Two Factor Authentication Enabled!'
                });
                res.render('user/profile', {
                    user,
                    success_msg
                    
                })
            })
        }
        else if(user.admin_status == 1) {
            Usermodel.update({
                admin_status: 0
            }, {
                where: {
                    admin_no: User
                }
            }).then(user => {
                success_msg.push({
                    text: 'Two Factor Authentication Disabled!'
                });
                res.render('user/profile', {
                    user,
                    success_msg
                    
                })
            })
        }
    })
});
router.post('/changepassword', (req, res) => {
    let errors = [];
    let success_msg = [];
    let {
        old_password,
        new_password,
        confirmpassword2
    } = req.body;
    var admin = req.session.user;
    var salt = bcrypt.genSaltSync(10);
    console.log(admin);
    console.log(new_password);
    console.log(confirmpassword2);

        user.getUserByAdmin(admin).then(user => {
            var isSame = bcrypt.compareSync(old_password, user.password);
            console.log(isSame);
            console.log(user);
            
            if (isSame == false) {
                errors.push({
                    text: 'Old password not correct!'
                });
                res.render('user/profile', {
                    errors,
                    user,
                    User
                });
            }
            if (new_password != confirmpassword2) {
                errors.push({
                    text: 'New passwords do not match!'
                });
                res.render('user/profile', {
                    errors,
                    user,
                    User
                });
            }
            
            if (isSame == true) {
                var hashednewPassword = bcrypt.hashSync(new_password, salt);
                Usermodel.update({
                    password: hashednewPassword
                }, {
                    where: {
                        admin_no: admin
                    }
                }).then(user => {
                    success_msg.push({
                        text: 'Password Successfully changed!'
                    });
                    console.log(user);
                    var User = user;
                    res.render('user/loginuser', {
                        success_msg
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

                if (user == null) {
                    res.redirect('/register');
                } else {
                    Usermodel.update({
                        full_name: full_name,
                        phone_no: phone_no,
                        picture_url: picture
                    }, {
                        where: {
                            admin_no: admin_no
                        }
                    }).then(user => {
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
    var admin = admin_no.toLowerCase();
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

        user.createUser(admin, full_name, password, phone_no)
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
    let success_msg = 'Please check your school email for the authentication code!';
    let {
        admin_no,
        password
    } = req.body;
    var admin = admin_no.toLowerCase();
    var pass = password;
    if (password.length < 4) {
        errors.push({
            text: 'Password must be at least 4 characters'
        });
    }
    /*
    if (isNaN(admin_no.slice(0, 6))) {
        errors.push({
            text: 'Admin Number is not valid!'
        });
    }
    */
    if (errors.length > 0) {
        res.render('user/loginuser', {
            errors,
            admin_no,
            password
        });
    } else {
        user.getUserByAdmin(admin).then(user => {
            console.log(user)
            if (user) {
                var isSame = bcrypt.compareSync(pass, user.password);
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
                    req.session.user = admin_no;
                    if (user == null) {
                        res.redirect('/register');
                    } else {
                        if (user.admin_status == 1) {
                            var digitcode = Math.round(Math.random() * (999999 - 111111) + 111111);
                            console.log(digitcode);
                            var email = admin + '@mymail.nyp.edu.sg';
                            sgMail.setApiKey('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');
                            const msg = {
                                to: email,
                                from: '180527e@mymail.nyp.edu.sg',
                                subject: 'Two Factor Authentication',
                                text: 'Generated code',
                                html: `Your code is  ` + digitcode

                            };
                            sgMail.send(msg);
                            req.session.digitcode = digitcode;
                            res.render('user/twofactorlogin', {
                                success_msg,
                            });

                        } else {
                            res.redirect('/');
                        }


                    }
                }
            } else {
                errors.push({
                    text: 'User not found, please register first!'
                })
                res.render('user/register', {
                    errors
                })
            }



        })
    }
});

router.post('/twofactorlogin', (req, res) => {
    let errors = [];
    let {
        code
    } = req.body;
    var digitcode = req.session.digitcode;
    if (code == digitcode) {
        counter = 0;
        res.redirect('/');
    } else {
        if (counter > 3) {
            counter = 0;
            errors.push({
                text: 'You failed 3 attempts, please log in again!'
            })
            res.render('/loginuser', {
                errors
            });
        } else {
            counter += 1
            errors.push({
                text: 'Code entered is wrong, please try again!'
            })
            res.render('user/twofactorlogin', {
                errors
            });
        }

    }
});
router.post('/forgetpw', (req, res) => {
    let errors = [];
    let success_msg = 'Email sent!, Please check your school email!';
    let {
        admin_no
    } = req.body;
    var admin = admin_no.toLowerCase();
    user.getUserByAdmin(admin).then(user => {
        if (user == null) {
            errors.push({
                text: 'Admin number not found!'
            });
            res.render('user/forgetpw', {
                errors
            });
        } else {
            var newpass = Math.random().toString(36).replace('0.', '').substr(0, 8);
            var salt = bcrypt.genSaltSync(10);
            var hashednewPassword = bcrypt.hashSync(newpass, salt);
            Usermodel.update({
                password: hashednewPassword
            }, {
                where: {
                    admin_no: admin
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
            if (user) {
                var isSame = bcrypt.compareSync(pass, user.password);
                if (!isSame) {
                    errors.push({
                        text: 'Password incorrect!'
                    });
                    res.render('user/loginseller', {
                        errors,
                        stall_id
                    });
                } else {
                    req.session.owner = stall_id;
                    res.redirect('/orders');
                }
            }
        })
    }
});

// router.post('/history', (req,res) =>{

// })
router.post('/loginadmin', (req, res) => {
    var pass = password;

    if (Admin_ID == SFAdmin && pass == SFAd45) {
        res.redirect('/admin')
    } else {
        res.redirect('/home');
    }
});




module.exports = router;