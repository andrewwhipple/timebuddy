var models = require('../models');

exports.view = function(req, res){
	var username = req.session.username;

	if (!req.session.username) {
		res.redirect('/landing');	
	}
	if (username == "devTest") {
		models.Activity
			.find()
			.sort('hours')
			.exec(renderActivities);

	} else {
		res.redirect('/');	
	}
	
	function renderActivities(err, activities){
		console.log("herro rucy");
		res.render('printfulldb', {'activities': activities});
		console.log(activities);
	}
}

