var models = require('../models');

exports.addtime = function(req, res) {
	// get a random palette from the top ones 
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
		res.send();
	}	
 }
