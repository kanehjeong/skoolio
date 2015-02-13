var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProjectSchema = new Schema({
    title: { type: String, required: true, index: { unique: true } },
    type: { type: String },
    roles: { type: String },
    createdBy: { type: String, required: true },
    description: { type: String, required: true },
    createdAt: { type: Date, expires: '7d' }
});


// When creating a new project, get current date
ProjectSchema.pre('save', function(next){
	now = new Date();
	this.createdAt = now;

	next();
});

module.exports = mongoose.model('Project', ProjectSchema);