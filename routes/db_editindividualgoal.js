var models = require('../models');

exports.newTarget = function(req, res) {    
	console.log("EditIndivGoals linked!");
	models.Activity
		.update({"activity": req.query.activity}, {"goal": req.query.time})
		.exec(afterUpdating);
	function afterUpdating(err){
		res.send()
	}	
 }

exports.getTarget = function(req, res) {    
	console.log("EditIndivGoals linked!");
	models.Activity
		.find({"activity": req.query.activity})
		.exec(afterFinding);
	function afterFinding(err, activity){
		var result = { "activity": req.query.activity , "oldTarget": activity[0]['goal'], "newTarget": req.query.time} ;
		res.send(result)
	}	
 }