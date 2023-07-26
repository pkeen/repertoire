const mongoose = require('mongoose');

const exerciseDataSchema = new mongoose.Schema({
    bodyPart: String,
    equipment: String,
    gifUrl: String,
    id: String,
    name: String,
    target: String,
}, {
    collection: "exercisedata",
});

exerciseDataSchema.statics.getTargetOptions = function() {
    return this.distinct('target');
}

exerciseDataSchema.statics.getEquipmentOptions = function() {
    return this.distinct('equipment');
}

module.exports = mongoose.model('ExerciseData', exerciseDataSchema);

