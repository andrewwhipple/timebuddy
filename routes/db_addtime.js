var models = require('../models');

exports.addtime = function(req, res) {
	// get a random palette from the top ones 
	var result = { "message": "" , "activity": "" , "hours": 0, "goal": 0} ;
	
	console.log("Javascript linked!");
	var activityToUpdate = req.query.activity;
	var conditions = {"activity": activityToUpdate};
	var newTime = req.query.time;
	var update = {$inc:{"hours": newTime}};
	var options = {multi: false};
	models.Activity.update(conditions, update, options, afterUpdating);
	/*models.Activity
		.find({"activity": req.query.activity})
		.update({"hours": hours + req.query.time})
		.exec(afterUpdating);*/
	//not sure what was going on with result before...?
	function afterUpdating(err){
		if (err) res.send(500);
		
	}	
	result['message'] = "Time added!"
	result['activity'] = activityToUpdate;
	models.Activity.find({"activity": activityToUpdate}).exec(afterQuery);
	function afterQuery(err, activity) {
		if (err) res.send(500);
		var newHours = activity[0].hours;
		var goal = activity[0].goal;
		console.log(newHours + " " + goal);
		result['hours'] = newHours;
		result['goal'] = goal;
		res.json(result);	
	}
	 }
