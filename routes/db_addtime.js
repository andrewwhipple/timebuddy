var models = require('../models');

exports.addtime = function(req, res) {
	// get a random palette from the top ones 
	console.log("Javascript for db_addtime.js linked!");
	models.Activity
		.find({"activity": req.query.activity})
		.update({"activity": req.query.activity}, {$inc: {"hours": req.query.time}})
		.exec(afterUpdating);
	function afterUpdating(err, activity){
		console.log("here's what I'm looking for");
		console.log(activity);
		//var result = { "message": "" , "activity": req.query.activity , "hours": parseFloat(activity[0]['hours']) + parseFloat(req.query.time), "goal": activity[0]['goal']} ;
		//res.send(result)
		res.send()
	}	
 }

exports.gettime = function(req, res) {
	// get a random palette from the top ones 
	console.log("Javascript for db_addtime.js linked!");
	models.Activity
		.find({"activity": req.query.activity})
		.exec(afterFinding);
	function afterFinding(err, activity){
		console.log("here's what I'm looking for");
		console.log(activity);
		var result = { "message": "Time Added!" , "activity": req.query.activity , "hours": activity[0]['hours'], "goal": activity[0]['goal']} ;
		res.send(result)
	}	
 }