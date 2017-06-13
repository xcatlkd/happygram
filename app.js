const app = require('express')();
const sql = require('./util/sql');
const routes = require('./routes/routes');


app.set('view engine', 'pug');
app.use('/', routes);

sql.sync()

