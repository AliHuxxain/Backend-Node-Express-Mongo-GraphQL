const key = require('../config/keys');


module.exports.CapitalizeText = function (text) {

    let string = '';
    const items = text.split(' ');

    for (let i = 0; i < items.length; i++) {

        if(i!==0) string = string + ' ';
        string = string + (items[i].charAt(0).toUpperCase() + items[i].slice(1));

    }
    
    return string;
}

module.exports.VerifyEmailLink = function (sessionID) {
    
    return `${key.clientIP}/authorized/verifyEmail?session=${sessionID}`;

}

module.exports.ResetPasswordLink = function (sessionID) {
    
    return `${key.clientIP}/authorized/resetpassword?session=${sessionID}`

}