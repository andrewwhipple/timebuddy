
/*
 * GET home page.
 */

exports.index = function(req, res){
  var username = req.session.username;

	if (req.session.username) {
		res.redirect('/');	
	}
  
  res.render('userlanding', {
    title: 'Session Demo',
    username: req.session.username
  });
};