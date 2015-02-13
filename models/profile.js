var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProfileSchema = new Schema({

	createdBy: { type: String, required: true, index: { unique: true } },
    name: { type: String, required: true },
    roles: { type: [String] },
    availability: { type: String, required: true },
    summary: { type: String, required: true },
    interests: { type: [String] }
});

module.exports = mongoose.model('Profile', ProfileSchema);