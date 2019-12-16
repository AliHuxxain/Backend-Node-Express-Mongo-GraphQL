const { User } = require('../Models/user');

module.exports.findAll = async function(){
    return User.find({}).sort( { createdOn: -1 } );
}

module.exports.findOne = async function(id){
    return User.findById(id);
}

module.exports.currentlyLoggedIn = async function({ req }){
    return req.user;
}

module.exports.checkEmailAvailability = async function({ email }){

    const Result = await User.findOne({ email });

    if (!Result) return true;

    return false;

}

module.exports.checkPhoneAvailability = async function({ phone }){

    const Result = await User.findOne({ phone });

    if (!Result) return true;

    return false;

}