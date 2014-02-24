var Mongoose = require('mongoose');

var ActivitySchema = new Mongoose.Schema({
	"activity": String,
	"hours": Number,
	"goal": Number
});

var UserSchema = new Mongoose.Schema({
	"name": String,
	"activities": Array
	
});

exports.Activity = Mongoose.model('Activity', ActivitySchema);
exports.User = Mongoose.model('User', UserSchema);