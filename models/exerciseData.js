const mongoose = require('mongoose');

const exerciseDataSchema = new mongoose.Schema({
    bodyPart: String,
    equipment: String,
    gifUrl: String,
    id: String,
    name: String,
    target: String,
}, {
    collection: "exercisedata"
});

module.exports = mongoose.model('ExerciseData', exerciseDataSchema);

