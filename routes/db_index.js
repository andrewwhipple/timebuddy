var models = require('../models');

exports.view = function(req, res){
	var username = req.session.username;
	if (!req.session.username) {
		res.redirect('/landing');	
	}
	models.Activity
		.find({"user": username})
		.sort('hours')
		.exec(renderActivities);

	function renderActivities(err, activities){
		console.log("herro rucy");
		res.render('index', {'activities': activities});
		console.log(activities);
	}
};