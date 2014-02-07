var data = require('../data.json');

exports.view = function(req, res) {    
	console.log("Javascript linked!");
	// Your code goes here
	res.render('recordactivity.handlebars', data);
	
		
 };