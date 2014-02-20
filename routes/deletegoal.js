var data = require('../data.json');

exports.delete = function(req, res) {
	var activities = data['activities'];
	var activityToDelete = req.query.activity;
	console.log(activityToDelete + "DELETING");
	for (var i = 0; i < activities.length; i++) {
		var activity = activities[i];
		console.log(activity);
		if (activity['activity'] == activityToDelete) {
			console.log(activities['activity']);
			activities.splice(i, 1);
			console.log("COol looky where I made it!");
			
		}
		
	}
	result = {'activity': activityToDelete};
	res.json(result);
	
}