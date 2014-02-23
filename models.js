var Mongoose = require('mongoose');

var ActivitySchema = new Mongoose.Schema({
	"activity": String,
	"hours": Number,
	"goal": Number
});

exports.Activity = Mongoose.model('Activity', ActivitySchema);