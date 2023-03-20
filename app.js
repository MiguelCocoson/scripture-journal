// Require application dependencies
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connect = require('./config/connect');
const session = require('express-session');
const auth = require('./config/auth');
const app = express();
const passport = require('passport');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongodb-session')(session);
const port = process.env.PORT || 3000;

// Connect to database
connect();

// Use Passport configuration
auth();

// Use CORS, JSON, UrlEncoded, and route for application
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ 
        uri: process.env.MONGODB_URI, 
        databaseName: 'library', 
        collection: 'sessions'})}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/', require('./route'));

// Listens to port and logs event to the console
mongoose.connection.once('open', () => {
    app.listen(port, () => console.log(`App listening on port ${port}`));
});