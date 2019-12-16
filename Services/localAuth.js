const passport = require('passport');
const bcrypt = require('bcrypt');
const { VerifyEmailLink, ResetPasswordLink } = require('./misc');
const LocalStrategy = require('passport-local').Strategy;
const { User } = require('../Models/user');
const { ResetPasswordSession } = require('../Models/resetPasswordSession');
const { VerifyEmailSession } = require('../Models/verifyEmailSession');
const { WelcomeEmail, ResetPasswordEmail } = require('./sendEmails');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});

passport.use(new LocalStrategy({ usernameField: 'username' }, (username, password, done) => {

    let userName = {};
    if(username.includes('@')) {
        userName.email = username;
    }else {
        userName.phone = username;
    }
    
    User.findOne(userName, (err, user) => {

        if (err) return done(err);
        if (!user) return done(null, false, 'Invalid Credentials');

        user.comparePassword(password, (err, isMatch) => {
            
            if (err) return done(err);
            if (isMatch) return done(null, user);
            return done(null, false, 'Invalid Credentials.');

        });
    });
}));

module.exports.signup = async function({ displayName, phone, email, password, req }) {

    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);

    let newUser = new User({ displayName, phone, email, emailVerified:false, password, createdOn:new Date() });
    newUser = await newUser.save();

    let expiryTime = new Date();
    expiryTime.setDate(expiryTime.getDate()+2);
    let newSession = new VerifyEmailSession({ createdOn:new Date(), userID:newUser.id, expiry:expiryTime });
    newSession = await newSession.save();

    const URL = VerifyEmailLink(newSession.id);
    
    WelcomeEmail(email, displayName, URL);

    return new Promise((resolve, reject) => {

        req.logIn(newUser, (err) => {
            if (err) reject(err);
            resolve(newUser);
        });
    });
}

module.exports.login = function({ email, phone, password, req }) {

    let username = '';
    if(email) username = email;
    if(phone) username = phone;
    
    return new Promise((resolve, reject) => {

        passport.authenticate('local', (err, user) => {

            if (!user) reject('Invalid credentials.')

            req.login(user, () => resolve(user));

        })({ body: { username, password } });
    });
}

module.exports.logout = function({ req }) {

    const { user } = req;
    req.logout();
    
    return user;
}