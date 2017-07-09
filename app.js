require('dotenv').config();

const express = require('express');
const app = express();
const sql = require('./util/sql');
const postsRoutes = require('./routes/posts');
const routes = require('./routes/routes');
// const renderTemplate = require("./util/renderTemplate");
const bodyParser = require("body-parser");
const port = process.env.PORT || 8080;

app.set('view engine', 'pug');
app.use('/', routes);
app.use(express.static("assets"));

app.use("/form", postsRoutes);

sql.sync().then(function() {
	app.listen(port, function(){
		console.log("Server up on port " + port);
	});
});

        