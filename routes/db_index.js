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
}

exports.getdata = function(req, res) {
	console.log("Javascript for data linked!");
	models.Activity
		.find()
		.exec(afterFinding);
	function afterFinding(err, activities){
		console.log("here's what I'm looking for");
		console.log(activities);
		res.send(activities);
	}	
 }
