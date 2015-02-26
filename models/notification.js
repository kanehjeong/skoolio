var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NotificationSchema = new Schema({

	fromID:	{ type: String },
	toID: { type: String },
	from: { type: String },
    to: { type: String },
    createdAt: { type: Date },
    project: { type: String },
    roles: { type: [String] },
    message: { type: String }
});

// When creating a new project, get current date
NotificationSchema.pre('save', function(next){
	var now = new Date();

	this.createdAt = now;
	next();
});

module.exports = mongoose.model('Notification', NotificationSchema);