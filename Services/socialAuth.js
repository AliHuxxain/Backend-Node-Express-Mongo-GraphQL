const router = require('express').Router();
const passport = require('passport');
const Settings = require('../config/keys');

//------------------------ Google Authentication -----------------------
router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}))

router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    res.redirect(Settings.clientIP);
})


//------------------------ Facebook Authentication -----------------------
router.get('/facebook', passport.authenticate('facebook', {
    scope: ['email']
}))

router.get('/facebook/redirect', passport.authenticate('facebook'), (req, res) => {
    res.redirect(Settings.clientIP);
})


module.exports = router;