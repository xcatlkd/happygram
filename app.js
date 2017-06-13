const express = require('express');
const app = express();
const sql = require('./util/sql');
const routes = require('./routes/routes');


app.set('view engine', 'pug');
app.use('/', routes);
app.use(express.static("assets"));


sql.sync().then(function() {
	app.listen(process.env.PORT || 8080, function(){
		console.log("Server up on port 8080");
	});
});

