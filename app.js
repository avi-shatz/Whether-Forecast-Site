const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');

const errorController = require('./controllers/error');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const weatherRoutes = require('./routes/weather');
const registerRoutes = require('./routes/register');
const loginRoutes = require('./routes/login');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// enable sessions
app.use(session({
  secret:"somesecretkey",

  resave: false, // Force save of session for each request
  saveUninitialized: false, // Save a session that is new, but has not been modified
  cookie: {maxAge: 10*60*1000 } // milliseconds!
}));

app.use('/', weatherRoutes);
app.use('/register', registerRoutes);
app.use('/login', loginRoutes);

app.use(errorController.get404);

module.exports = app;