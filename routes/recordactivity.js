var data = require('../data.json');

exports.view = function(req, res) {    

	// Your code goes here
	res.render('recordactivity.handlebars', data);
	
	var activity = req.query.activity;
	var hours = req.query.hours;
	if(activity != null){
		console.log("activity = " + activity + " hours = " + hours)
		recordactivity(req, res);
		return;
	}
	res.render('recordactivity.handlebars', data);
	
 };

var recordactivity = function(req, res) {  
	console.log("Made it to this function!");

	var activity = req.query.activity;
	var hours = req.query.hours;

	writedata(activity, hours, res);
	
 };


var writedata = function(activity, hours, res){
	for(var object in data){
		console.log("comparing to activity = " + object.activity + " object :  " + object);
		if(object.activity == activity){
			var oldHours = object.hours;
			object.hours= oldHours + hours;
			res.render('index.handlebars', data);
			return;
		}
	}
	res.render('addnewactivitydialog.handlebars', data);
	

}
