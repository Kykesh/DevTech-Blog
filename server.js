const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sequelize = require('./config/config.json'); // Import Sequelize configuration
const helpers = require('./utils/helpers'); // Optional: custom helpers for Handlebars

const app = express();
const PORT = process.env.PORT || 3000;

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers });

// Set up session with Sequelize store
app.use(session({
  secret: 'super secret',
  cookie: { maxAge: 3600000 }, // 1 hour
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Set Handlebars as the default template engine.
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Import routes
const routes = require('./controllers');
app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening on port ' + PORT));
});
