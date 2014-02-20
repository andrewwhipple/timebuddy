var data = require('../data.json');

exports.newTarget = function(req, res) {    
	console.log("Javascript linked!");
	// Your code goes here
	//res.render('editindividualgoal.handlebars');
	var activities = data['activities'];
	var activityToUpdate = req.query.activity;
	var newTarget = req.query.time;
	var result = {'activity': "", 'oldTarget': 0, 'newTarget': 0};
	for(var i = 0; i < activities.length; i++){
			var activity = activities[i];

			if(activity['activity'] == activityToUpdate ){
				result['oldTarget'] = activity['goal'];
				activity['goal'] = parseFloat(newTarget);
				result['activity'] = activityToUpdate;
				result['newTarget'] = activity['goal'];
				break;
			}
		}
		
		
		res.json(result);
		
 };