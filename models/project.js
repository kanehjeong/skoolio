var moment = require('moment');

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProjectSchema = new Schema({
	createdBy: { type: String, required: true },
	createdByID: { type: String, required: true },
	createdAt: { type: Date },
    title: { type: String, required: true },
    type: { type: String, required: true },
    roles: { type: [String], required: true },
    description: { type: String, required: true },
    url: { type: String }
});


// When creating a new project, get current date
ProjectSchema.pre('save', function(next){
	var now = new Date();

	this.createdAt = now;
	next();
});

module.exports = mongoose.model('Project', ProjectSchema);