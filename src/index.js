const express = require('express');
const path = require('path');
const engine = require('ejs-mate');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const morgan = require('morgan');
const bodyParser = require('body-parser');

// Inicializaciones
const app = express();
require('./database');
require('./passport/local-auth');

// Configuracion
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'))
app.engine('ejs', engine);
app.set('view engine', 'ejs');

// Middlewares
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(session({
  secret: 'mysecretsession',
  resave: false,
  saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  app.locals.signinMessage = req.flash('signinMessage');
  app.locals.signupMessage = req.flash('signupMessage');
  app.locals.user = req.user;
  console.log(app.locals)
  next();
});

// Rutas
app.use('/', require('./routes/app'));
app.use(express.static(path.join(__dirname, 'views')));

// Inicio el servidor
app.listen(app.get('port'), () => {
  console.log('server on port', app.get('port'));
});