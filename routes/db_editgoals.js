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
		res.render('editgoals.handlebars', {'activities': activities});
		console.log(activities);
	}
};