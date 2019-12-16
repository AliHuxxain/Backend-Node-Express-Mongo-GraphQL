
const Development = {

    clientIP: 'http://localhost:8000',
    serverIP: 'http://localhost:4000',
    mongoDBURI: 'mongodb-development-uri',
    showGraphQL: true

}

const Production = {

    clientIP: 'https://example.pk',
    serverIP: 'https://example.pk',
    mongoDBURI: 'mongodb-production-uri',
    showGraphQL: false

}

//------------------ Development or Production ----------------------------
const Environment = Development;

module.exports = {

    serverIP: Environment.serverIP,
    clientIP: Environment.clientIP,
    showGraphQL: Environment.showGraphQL,
    
    mongoDBURI: Environment.mongoDBURI,
    
    expressSessionSecret: 'SecretKeyForSessionExcryption',
    jsonWebTokenSecret: 'SecretKeyForJsonWebTokenExcryption',

    google: {
        clientId: 'demo',
        clientSecret: 'demo',
        maps: 'demo'
    },

    facebook: {
        clientId: 'demo',
        clientSecret: 'demo'
    },

    sendGrid: 'demo'
    
}