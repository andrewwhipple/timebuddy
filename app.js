
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars');
var mongoose = require('mongoose');

var index = require('./routes/db_index');
var editgoals = require('./routes/db_editgoals');
var editindividualgoal = require('./routes/db_editindividualgoal');
var viewstats = require('./routes/db_viewstats');
var addtime = require('./routes/db_addtime');
var addactivitydata = require('./routes/db_addactivitydata');
var deletegoal = require('./routes/db_deletegoal');
var user = require('./routes/user');
var landing = require('./routes/landing');
var printfulldb = require('./routes/printfulldb');
// Example route


// Connect to the Mongo database, whether locally or on Heroku
// MAKE SURE TO CHANGE THE NAME FROM 'lab7' TO ... IN OTHER PROJECTS
var local_database_name = 'timebuddy';
var local_database_uri  = 'mongodb://localhost/' + local_database_name
var database_uri = process.env.MONGOLAB_URI || local_database_uri
mongoose.connect(database_uri);

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('Intro HCI secret key'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Add routes here
app.get('/', index.view);
app.get('/getdata', index.getdata)
app.get('/editgoals', editgoals.view);
app.get('/editindividual', editindividualgoal.newTarget);
app.get('/getindivdata', editindividualgoal.getTarget);
app.get('/stats', viewstats.view);
app.get('/addtime', addtime.addtime);
app.get('/gettime', addtime.gettime);
app.get('/addactivitydata', addactivitydata.addActivity);
app.get('/deletegoal', deletegoal.delete);
app.get('/user_login', user.login);
app.get('/user_logout', user.logout);
app.get('/landing', landing.index);
app.get('/printDatabase', deletegoal.printDatabase)
app.get('/indexB', index.viewB);
app.get('/printfulldb', printfulldb.view);
// Example route
// app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

