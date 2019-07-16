const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
// Load user model
const User = require('../models/User');
function localStrategy(passport) {
    passport.use(new LocalStrategy({ usernameField: 'admin_no' }, (admin_no, password,
        done) => {

        User.findOne({ where: { admin_no: admin_no } })
            .then(user => {
                if (!user) {
                    return done(null, false, { message: 'No User Found' });
                }
                // Match password
                var isSame = bcrypt.compareSync(password, user.password);
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err) throw err;
                    if (isMatch) {
                        return done(null, user);
                    } else {
                        return done(null, false, {
                            message: 'Failed'
                        });
                    }
                })
            })
    }));

    // Serializes (stores) user id into session upon successful
    // authentication
    passport.serializeUser((user, done) => {
        done(null, user.admin_no); // user.id is used to identify authenticated user
    });

    // User object is retrieved by userId from session and
    // put into req.user
    passport.deserializeUser((admin_no, done) => {
        User.findByPk(admin_no)
            .then((user) => {
                done(null, user); // user object saved in req.session
            })
            .catch((done) => { // No user found, not stored in req.session
                console.log(done);
            });
    });
}
module.exports = { localStrategy };