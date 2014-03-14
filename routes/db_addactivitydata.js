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

	$("#targetsdiv").append("<div class='row activity well well-sm' id='"+name+"''>"
		+"<div class='well-text inline activityname'> "+name+"</div>"
		+"<div  class='inline' id='timespent'><em> 0 / "+target+"hrs </em></div><div class='progress'>"
		+"<div id='progress_bar' class='progress-bar' role='progressbar'>"+
		"</div></div><div class='inline addhours' ><form class ='inline' role='form'> "
		+"<div class='inline time form-group float-right'><span class='glyphicon glyphicon-time' ></span>"
		+"<a href='#'><span class='glyphicon glyphicon-minus submitBtn' id ='minusBtn'></span></a>"
		+"<input type='text' id='time' maxlength='4' size='4' placeholder='(hrs)'></input>"
		+"<a href='#'><span class='glyphicon glyphicon-plus submitBtn' id='plusBtn'></span></a>"
		+"<input type='hidden' id='hoursspent' value='0'/></div> </form></div></div>");
	res.json(result);
	console.log("going back");
}