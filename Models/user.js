const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//--------------basic model for User--------------------------
const userSchema = new mongoose.Schema({
    googleID: {
        type: String
    },
    facebookID: {
        type: String
    },
    displayName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    profilePic: {
        type: String
    },
    phone: {
        type: String,
        match: [/^[0][0-9]{10}$/, 'Invalid Contact number'],
        validate: {
            validator: function(Contact) {
                return new Promise(function(resolve, reject) {
                    User.find({ phone: Contact }, function(err,docs){
                        resolve(docs.length === 0);
                    });                      
                })                   
            },
            message: 'The Phone Number you provided is already in use.'                
        }
    },
    phoneVerified: {
        type: Boolean
    },
    email: {
        type: String,
        required: true,
        match: [/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Invalid Email'],
        validate: {
            validator: function(checkEmail) {
                return new Promise(function(resolve, reject) {
                    User.find({ email: checkEmail }, function(err,docs){
                        resolve(docs.length === 0);
                    });                      
                })                   
            },
            message: 'The Email Address you provided is already registered.'                
        }
    },
    emailVerified: {
        type: Boolean
    },
    password: {
        type: String,
        minlength: 6,
        maxlength: 512
    },
    createdOn: {
        type: Date,
        required: true
    }
}, { strict: false });

userSchema.methods.comparePassword = function(pass, callback){
    bcrypt.compare(pass, this.password, (err, isMatch) => {
        callback(err, isMatch);
    });
}

const User = mongoose.model('User', userSchema);

exports.User = User;