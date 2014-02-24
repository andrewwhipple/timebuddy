var models = require('../models');


exports.newTarget = function(req, res) {    
	console.log("EditIndivGoals linked!");
	var activityToUpdate = req.query.activity;
	var newGoal = req.query.time;
	var conditions = {"activity": activityToUpdate};
	var update = {"goal": newGoal};
	var options = {multi: false};
	models.Activity.update(conditions, update, options, afterUpdating);
	/*models.Activity
		.find({"activity": req.query.activity})
		.update({"hours": hours + req.query.time})
		.exec(afterUpdating);*/
	//not sure what was going on with result before...?
	function afterUpdating(err){
		if (err) res.send(500);
		res.send();
	}	
	var result = {'activity': activityToUpdate, 'newTarget': newGoal};
	res.json(result);
	
 }