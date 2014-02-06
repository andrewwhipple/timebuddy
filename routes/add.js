var data = require("../data.json");

exports.addFriend = function(req, res) {    
	console.log("Hellow I am hear");
	res.render("add.handlebars");
 }