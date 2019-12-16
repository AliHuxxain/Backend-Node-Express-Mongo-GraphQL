const express = require('express');
const keys = require('./config/keys');
const mongoose = require('mongoose');
const graphqlHTTP = require('express-graphql');
const schema = require('./GraphQLSchema/schema');
const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo')(session);
const bodyParser = require('body-parser');
const passportSetup = require('./config/passportSetup');
const socialAuth = require('./Services/socialAuth');
const cors = require('cors');

const app = express();

//-----------------Connection with MongoDB-----------------------------------
mongoose.connect(keys.mongoDBURI, { useNewUrlParser: true, useFindAndModify: false })
    .then(() => {console.log('Connected to MongoDB Atlas ...')})
    .catch((err) => {console.log('Can not connect to MongoDB ...',err)});
mongoose.set('useCreateIndex', true);
//---------------------------------------------------------------------------

//-------------- Initialize/Store Session for Exppress ----------------------
app.use(session({
    resave: false,
    saveUninitialized: false,
    cookie:{
        maxAge: 30*24*60*60*1000
    },    
    secret: keys.expressSessionSecret,
    store: new MongoStore({
        mongooseConnection: mongoose.connection,
        autoReconnect: true
    })
}));

//--------------------------  Utilities  ------------------------------------
app.use(cors({ credentials:true, origin:keys.clientIP }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    res.set('credentials', 'include');
    res.set('Access-Control-Allow-Credentials', true);
    next();
});


//--------------------------  GraphQL  --------------------------------------
app.use('/graphql', graphqlHTTP({ schema, graphiql:keys.showGraphQL }));

//-------------------------- Social Authentications  ------------------------
app.use('/auth', socialAuth);



const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Listening to Port ${port} ...`);
});