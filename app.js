
// Module configurations ##########################################

require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');
const connectSessionSequelize = require('connect-session-sequelize');

const sql = require('./util/sql');
const deserializeUser = require('./middleware/deserializeUser');
const app = express();
const SessionStore = connectSessionSequelize(session.Store);

// .env configuration variables #################################

const port = process.env.PORT || 8080;
const server_host = process.env.HOST || '0.0.0.0';
const cookieSecret = process.env.COOKIE_SECRET || "don";

// App - wide configurations ####################################

app.set('view engine', 'pug');
app.use(express.static("assets"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser(cookieSecret));
app.use(session({
	store: new SessionStore({ db: sql }),
	secret: cookieSecret,
	resave: false
}));
app.use(deserializeUser);

// Routing files ################################################

const routes = require('./routes/routes');
const user = require('./routes/user');
const postsRoutes = require('./routes/posts');
// const renderTemplate = require("./util/renderTemplate");
// const posts = require('./routes/posts');

app.use('/', routes);
app.use('/user', user);
app.use("/form", postsRoutes);
// app.use('/posts', posts);

// File structure configurations #################################


// Sync db and launch server #####################################

sql.sync().then(function() {
	app.listen(port, server_host, function(){
		console.log("Server up on port " + port);
	});
});

        