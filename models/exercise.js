const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
    bodyPart: String,
    equipment: String,
    gifUrl: String,
    id: String,
    name: String,
    target: String,
});

module.exports = mongoose.model('Exercise', exerciseSchema);

