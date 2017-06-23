require('dotenv').config();

const express = require('express');
const app = express();
const sql = require('./util/sql');
const routes = require('./routes/routes');

const port = process.env.PORT || 8080;

app.set('view engine', 'pug');
app.use('/', routes);
app.use(express.static("assets"));


sql.sync().then(function() {
	app.listen(port, function(){
		console.log("Server up on port " + port);
	});
});

