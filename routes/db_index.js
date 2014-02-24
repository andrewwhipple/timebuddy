var models = require('../models');

exports.view = function(req, res){
	var username = req.session.username;
	models.User
		.find({name: username})
		.exec(findActivities);
	
	function findActivities(err, user) {
		if (err) {
		
			res.send(500);	
		}
		if (!user.length) {
			console.log("No user!")	
		} else {
			console.log(user);
		}
		//renderActivities(user[0].activities);
		
	}
	models.Activity
		.find()
		.sort('hours')
		.exec(renderActivities);


	
	function renderActivities(err, activities){
		console.log("herro rucy");
		res.render('index', {'activities': activities});
		console.log(activities);
	}
};