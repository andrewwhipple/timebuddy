var data = require('../data.json');

exports.addActivity = function(req, res) {
	var newActivity = 
	{
		"activity": req.query.activity,
		"hours": 0,
		"goal": req.query.goal,
	};
	data["activities"].push(newActivity);
	
	result = {"activity": newActivity};
	res.json(result);
	
}