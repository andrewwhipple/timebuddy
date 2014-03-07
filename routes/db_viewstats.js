var models = require('../models');

exports.view = function(req, res){
	//ga("send", "event", "stats", "viewed");

	var username = req.session.username;
	if (!req.session.username) {
		res.redirect('/landing');	
	}
	models.Activity
		.find({"user": username})
		.sort('hours')
		.exec(renderActivities);

	function renderActivities(err, activities){
		var nAct = false;
		if (activities.length > 0) nAct = true;
		res.render('viewstats.handlebars', {'activities': activities, 'nAct': nAct});
		console.log(activities);
	}
};