
// Module configurations ##########################################

require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');
const connectSessionSequelize = require('connect-session-sequelize');

const sql = require('./util/sql');
const app = express();

// .env configuration variables #################################

const port = process.env.PORT || 8080;
const cookieSecret = process.env.COOKIE_SECRET || "don";

// App - wide configurations ####################################

const deserializeUser = require('./middleware/deserializeUser');
const SessionStore = connectSessionSequelize(session.Store);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser(cookieSecret));
app.use(session({
	secret: cookieSecret,
	store: new SessionStore({ db: sql }),
}));
app.use(deserializeUser);

// Routing files ################################################

const routes = require('./routes/routes');
const user = require('./routes/user');
// const posts = require('./routes/posts');

// File structure configurations #################################

app.set('view engine', 'pug');
app.use('/', routes);
app.use('/user', user);
// app.use('/posts', posts);
app.use(express.static("assets"));

// Sync db and launch server #####################################

sql.sync({ force: true }).then(function() {
	app.listen(port, function(){
		console.log("Server up on port " + port);
	});
});

