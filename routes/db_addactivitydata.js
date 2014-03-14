var models = require('../models');

exports.addActivity = function(req, res) {
	var username = req.session.username;
	if (!req.session.username) {
		res.redirect('/landing');	
	}
	var newActivity = new models.Activity({
		"activity": req.query.activity,
		"hours": 0,
		"goal": req.query.goal,
		"user": username,
	});
	newActivity.save(afterSaving);
	console.log(newActivity);
	console.log("made it wheee");
	function afterSaving(err){
		if (err){ 
			console.log(err);
			res.send(500);
		}
		//res.send(newActivity)
	}
	result = {"activity": req.query.activity, "goal": req.query.goal};

	res.json(result);

}