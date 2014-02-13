var data = require('../data.json');

exports.writeactivitydata = function(req, res) {
	// get a random palette from the top ones

	var result = { "message": "" , "activity": "" , "hours": 0, "goal": 0} ;
	var activitytorecord = req.query.activity;
	var hourstorecord = req.query.hours;

	var activities = data['activities'];
	var found = false;

	for(var i = 0; i < activities.length; i++){
		var activity = activities[i];

		if(activity['activity'] == activitytorecord ){
			activity['hours'] = parseFloat(hourstorecord) + parseFloat(activity['hours']);
			result['message'] = "Successfully Recorded!";
			result['activity'] = activity['activity'];
			result['hours'] = activity['hours'];
			result['goal'] = activity['goal'];

			console.log("about to send result");
			console.log(result);
			found = true;
			break;
		}
	}

	if(!found){
		console.log("made it out of the for loop");
		result['message'] = "Add " + activitytorecord + " as a new activity? {{> addactivityform}} ";
		result['activity'] = activitytorecord;
		result['hours'] = hourstorecord;
		result['goal'] = 0;
	}

	res.json(result);
};