var models = require('../models');

exports.addActivity = function(req, res) {
	var newActivity = new models.Activity({
		"activity": req.query.activity,
		"hours": 0,
		"goal": req.query.goal,
	});
	newActivity.save(afterSaving);
	console.log(newActivity);
	function afterSaving(err){
		if (err){ 
			console.log(err);
			res.send(500);
		}
		res.send()
	}
}