var mongoose = require('mongoose');

// define the schema for our user model
var goingSchema = mongoose.Schema({
        barId: String,
        userId : String,
        name: String
    });
goingSchema.index({ barId: 1, userId: 1}, { unique: true });

// create the model for users and expose it to our app
module.exports = mongoose.model('Going', goingSchema);
