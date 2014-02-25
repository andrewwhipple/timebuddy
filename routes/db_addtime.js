var models = require('../models');

exports.addtime = function(req, res) {
	// get a random palette from the top ones 
	console.log("Javascript linked!");
	models.Activity
		.find({"activity": req.query.activity})
		.update({"hours": hours + req.query.time})
		.exec(afterUpdating);
	//not sure what was going on with result before...?
	function afterUpdating(err){
		res.send()
	}	
 }
