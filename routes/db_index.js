var models = require('../models');

exports.view = function(req, res){
	models.Activity
		.find()
		.sort('hours')
		.exec(renderActivities);

	function renderActivities(err, activities){
		console.log("herro rucy");
		res.render('index', {'activities': activities});
		console.log(activities);
	}
};