var models = require('../models');

exports.delete = function(req, res) {
	// get a random palette from the top ones 
	console.log("Delete goals linked!");
	var activity = req.query.activity;
	var user = req.session.username;
	console.log(activity + " " + user);
	models.Activity
		.find({"activity": activity, "user":user})
		.remove()
		.exec(afterRemoving);
	function afterRemoving(err){
		res.send(req.query.activity)
	}	
 }

exports.printDatabase = function(req, res){
	console.log("HERE I AM");
	models.Activity
		.find()
		.exec(afterFind);
	function afterFind(err, activities){
		console.log("This is for deleting");
		console.log(activities);
		res.send();
	}
}