var data = require('../data.json');

exports.addtime = function(req, res) {
	// get a random palette from the top ones

	var result = { "message": "" , "activity": "" , "hours": 0, "goal": 0} ;
	var activitytorecord = req.query.activity;
	var hours = req.query.time;
	var goal = req.query.goal;

	var activities = data['activities'];
	var found = false;

	for(var i = 0; i < activities.length; i++){
		var activity = activities[i];

		if(activity['activity'] == activitytorecord ){
			activity['hours'] = parseFloat(hours) + parseFloat(activity['hours']);
			result['activity'] = activity['activity'];
			result['hours'] = activity['hours'];
			result['goal'] = activity['goal'];	
			result['message'] = "Time added!";

			console.log("about to send result");
			console.log(result);
			found = true;
			break;
		}
	}

	if(!found){
		console.log("made it out of the for loop");
		result['message'] = "Activity not found (ERROR) ";
		result['activity'] = activitytorecord;
		result['hours'] = hours;
		result['goal'] = goal;
	}

	res.json(result);
};