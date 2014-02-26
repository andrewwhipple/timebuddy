var models = require('../models');

exports.delete = function(req, res) {
	// get a random palette from the top ones 
	console.log("Delete goals linked!");
	models.Activity
		.find({"activity": req.query.activity})
		.remove()
		.exec(afterRemoving);
	function afterRemoving(err){
		res.send(req.query.activity)
	}	
 }