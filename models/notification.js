var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NotificationSchema = new Schema({

	fromID:	{ type: String },
	toID: { type: String },
	from: { type: String },
    to: { type: String },
    project: { type: String },
    roles: { type: [String] },
    message: { type: String }
});

module.exports = mongoose.model('Notification', NotificationSchema);