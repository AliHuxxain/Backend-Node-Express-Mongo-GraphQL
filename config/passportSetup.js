const keys = require('./keys');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const { User } = require('../Models/user');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});


//----------------------------- Google Strategy --------------------------------
passport.use(new GoogleStrategy({ 
        callbackURL: `${keys.serverIP}/auth/google/redirect`,
        clientID: keys.google.clientId, 
        clientSecret: keys.google.clientSecret
    }, 
    (accessToken, refreshToken, profile, done) => {
        
        User.findOne({ googleID:profile.id })
            .then(currentUser => {
                
                if (currentUser) {
                    done(null, currentUser);
                }else{
                    const newUser = new User({
                        googleID: profile.id,
                        displayName: profile.displayName,
                        email: profile.emails[0].value,
                        emailVerified: profile.emails[0].verified,
                        profilePic: profile.photos[0].value,
                        createdOn: new Date()
                    })
                    newUser.save().then(user => {
                        done(null, user);
                    })                    
                }

            })
    })
)


//----------------------------- Facebook Strategy --------------------------------
passport.use(new FacebookStrategy({
    callbackURL: `${keys.serverIP}/auth/facebook/redirect`,
    clientID: keys.facebook.clientId, 
    clientSecret: keys.facebook.clientSecret,
    profileFields: ['id', 'emails','displayName', 'photos']
  },
  (accessToken, refreshToken, profile, done) => {
        
    User.findOne({ facebookID:profile.id })
        .then(currentUser => {
            
            if (currentUser) {
                done(null, currentUser);
            }else{
                const newUser = new User({
                    facebookID: profile.id,
                    displayName: profile.displayName,
                    email: profile.emails[0].value,
                    profilePic: profile.photos[0].value,
                    emailVerified: true,
                    createdOn: new Date()
                })
                newUser.save().then(user => {
                    done(null, user);
                })                    
            }

        })
    })
)