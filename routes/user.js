
/*
 * GET users listing.
 */

var models = require('../models');

exports.list = function(req, res){
  res.send("respond with a resource");
};

exports.login = function(req, res) {
  // remember the username
  var username = req.query.username;
  console.log('username is: '+username);
  req.session.username = username;

<<<<<<< HEAD
	models.User.find({"name": username}).exec(afterQuery);
=======
	/*models.User.find({"name": username}).exec(afterQuery);
>>>>>>> 17fc5a40ef25744750187168281aa9597554d60c
	
	function afterQuery(err, user) {
		if (err) res.send(500);
		if(!user.length) {
			var newUser = new models.User({
				"name": username,
				"activities": []
			});
			newUser.save(afterSaving);
			console.log(newUser);
			function afterSaving(err){
			if (err){ 
				console.log(err);
				res.send(500);
			}
			res.send()
			}

		} else {
			console.log("This thingy here...");	
		}
<<<<<<< HEAD
	}

  // send them back to the homepage
  res.redirect('/landing');
=======
	}*/

  // send them back to the homepage
  res.redirect('/');
>>>>>>> 17fc5a40ef25744750187168281aa9597554d60c
}

exports.logout = function(req, res) {
  req.session.username = null;

<<<<<<< HEAD
  res.redirect('/');
=======
  res.redirect('/landing');
>>>>>>> 17fc5a40ef25744750187168281aa9597554d60c
}