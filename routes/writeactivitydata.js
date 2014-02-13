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
			result['activity'] = activity['activity'];
			result['hours'] = activity['hours'];
			result['goal'] = activity['goal'];			
			var percentofgoal =  parseFloat(hourstorecord) / parseFloat(result['goal']) * 100;
			result['message'] = "<b> ACTIVITY </b> " + result['activity'] 
				+ " <br><b> THIS WEEK </b> " + result['hours'] + " hours"
				+" <br><b> GOAL </b>  " + result['goal'] + " hours/week </br>" 
				+" <br><em><t>You are at <b>" + percentofgoal + " % </b> of your weekly goal <br> </em> <br> ";

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