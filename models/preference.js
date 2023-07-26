const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const preferenceSchema = new Schema({
    measurement: {
        type: String,
        enum: ['metric', 'imperial'],
        default: 'metric'
    }
});

module.exports = mongoose.model("Preference", preferenceSchema);