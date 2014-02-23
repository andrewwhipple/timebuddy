var models = require('../models');

exports.newTarget = function(req, res) {    
	console.log("EditIndivGoals linked!");
	models.Activity
		.find({"activity": req.query.activity})
		.update({"time": req.query.time})
		.exec(afterUpdating);
	function afterUpdating(err){
		res.send()
	}	
 }