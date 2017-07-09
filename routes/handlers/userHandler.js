// module dependencies

const sql = require('../util/sql');
const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');


// import table dependencies
const User = require('../../models/user')
const Photos = require('../../models/photo');



// const User = {

// 	upload: {

// 	}, 

// 	hashUserPassword: {

// 	},




// }


module.exports = User;