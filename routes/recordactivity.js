var data = require('../data.json');

exports.view = function(req, res) {    
	// Your code goes here
	res.render('recordactivity.handlebars', data);
 };
