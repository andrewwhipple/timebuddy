
var data = require('../data.json');

exports.recordactivity = function(req, res) {  
	console.log("Made it to this function!");

	var activity = req.query.activity;
	var hours = req.query.hours;

	writedata(activity, hours, res);
	
 };


var writedata = function(activity, hours, res){
	for(var object in data){

		if(object.activity == activity){
			var oldHours = object.hours;
			object.hours= oldHours + hours;
			res.render('index.handlebars', data);
			return;
		}
	}
	res.render('newactivitydialog.handlebars', data);
	

}