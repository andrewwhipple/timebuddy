var models = require('../models');

exports.view = function(req, res){
	var username = req.session.username;
<<<<<<< HEAD
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
		
=======
	if (!req.session.username) {
		res.redirect('/landing');	
>>>>>>> 17fc5a40ef25744750187168281aa9597554d60c
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
